<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">My Recipe</h1>
        <p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi distinctio dolores et excepturi expedita, facilis illo ipsum iure magni mollitia nesciunt omnis quas quos rerum soluta suscipit tenetur vitae.</p>

        <p>
          <router-link v-if="showModeratorBoard" to="/mod" class="btn btn-primary my-2">Create Recipe</router-link>
        </p>
      </div>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col-lg-4 d-flex align-items-stretch" v-for="recipe in recipes" :key="recipe.id">

          <div class="card shadow-sm">

            <img class="img-fluid rounded" :src="displayImage(recipe.image.data)" alt="" style="object-fit:cover; width: 300px; height: 225px;"/>

            <div class="card-body">
              <h4>{{ recipe.name }}</h4>
              <p class="card-text">{{ recipe.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <router-link :to="'/recipes/' + recipe.id" type="button" class="btn btn-sm btn-outline-secondary">View</router-link>
                  <router-link :to="'/recipes/' + recipe.id + '/edit'" type="button" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import MyRecipeService from '@/services/MyRecipeService'
export default {
  name: "MyRecipe",
  data() {
    return {
      recipes: [],
      image: undefined
    };
  },
  methods: {
    displayImage(base64String) {
      return "data:image/jpg;base64," + base64String
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
  mounted() {
    MyRecipeService.getAllRecipeOfAUser(this.currentUser.id).then(
      (response) => {
        this.recipes = response.data;
      },
      (error) => {
        this.recipes =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

