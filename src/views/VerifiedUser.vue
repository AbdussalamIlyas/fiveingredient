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
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td><button class="btn btn-primary btn-sm" type="submit">Verified</button></td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>10</td>
          <td>admin@webtech.com</td>
          <td>admin</td>
          <td>admin</td>
          <td><button class="btn btn-primary btn-sm" type="submit">Verified</button></td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>@twitter</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td><button class="btn btn-primary btn-sm" type="submit">Verified</button></td>
        </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
export default {
  name: 'VerifiedUser'
}
</script>

<style scoped>

</style>
