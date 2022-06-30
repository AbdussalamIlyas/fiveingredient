<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">My Recipe</h1>
        <p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A commodi distinctio dolores et excepturi expedita, facilis illo ipsum iure magni mollitia nesciunt omnis quas quos rerum soluta suscipit tenetur vitae.</p>
        <img :src="dataUrl">

        <p>
          <router-link to="/mod" class="btn btn-primary my-2">Create Recipe</router-link>
        </p>
      </div>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col-lg-4 d-flex align-items-stretch" v-for="recipe in recipes" :key="recipe.id">

          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div class="card-body">
              <h4>{{ recipe.name }}</h4>
              <p class="card-text">{{ recipe.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
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
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
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

