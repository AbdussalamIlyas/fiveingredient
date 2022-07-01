<template>
  <div style="height: 600px;background-image: url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
                background-position: center; background-size: cover; margin-top: 10px">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
          <div class="card p-sm-5" style="max-width: 350px;">
            <h1 class="font-weight-bold">Verified User</h1>
            <p class="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda fugit mollitia obcaecati omnis quasi quo, voluptatum</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5 mb p-4 border">
    <div class="row justify-content-center">
      <div class="col-4 mb-4">
        <h1 class="fw-light">List Of User</h1>
      </div>
    </div>
    <div class="row">
      <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Id</th>
          <th scope="col">Email</th>
          <th scope="col">Username</th>
          <th scope="col">Role</th>
          <th scope="col">Change Role</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user,index) in users" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.username }}</td>
          <td>
            <button v-for="role in user.roles" :key="role.id" type="button" class="btn btn-success mr-3">
              {{ role.name.toLowerCase() }}
            </button>
          </td>
          <td>
            <button @click="verifiedUser(user)" v-if="!checkVerified(user)" class="btn btn-primary" type="submit">Verified</button>
            <button @click="unverifiedUser(user)" v-if="checkVerified(user)" class="btn btn-primary" :disabled="checkAdmin(user)" type="submit">Unverified</button>
          </td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import VerifiedUserService from '@/services/VerifiedUserService'

export default {
  name: 'VerifiedUser',
  data() {
    return {
      users: [
        {
          roles: []
        }
      ]
    }
  },
  methods: {
    checkVerified(user) {
      //Check if user verified or not
      for(const role of user.roles) {
        if(role.id === 2 || role.id === 3) {
          return true
        }
      }
      return false
    },
    checkAdmin(user) {
      for(const role of user.roles) {
        if(role.id === 3) {
          return true
        }
      }
      return false
    },
    verifiedUser(user) {
      VerifiedUserService.verifiedUser(user.id)
      location.reload()
    },
    unverifiedUser(user) {
      VerifiedUserService.unverifiedUser(user.id)
      location.reload()
    }


  },
  mounted() {
    VerifiedUserService.getAllUsers().then(response => {
      this.users= response.data;
    });
  }
}
</script>

<style scoped>

</style>
