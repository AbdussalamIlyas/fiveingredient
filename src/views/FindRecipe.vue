<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-10 col-md-9 mx-auto">
        <h1 class="fw-light">What should I cook today?</h1>
        <p class="lead text-muted">Search recipe that require less than five ingredients.</p>

        <div
          class="w-100 p-4 d-flex align-items-center justify-content-center"
          style="height: 10px;"
        >
          <div class="list row">
            <div class="col-md-8">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <input style="width: 500px" type="text"
                         class="form-control" aria-label="Large"
                         aria-describedby="inputGroup-sizing-sm"
                         placeholder="type ingredient here" v-model="id"/>
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchRecipeByIngredients">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <h4 class="fw-light"> Recipes List</h4>
  <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <div class="col-lg-4 d-flex align-items-stretch" v-for="recipe in recipes" :key="recipe.id">
          <div class="card" style="width: 18rem;">
            <img :src="displayImage(recipe.image.data)" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ recipe.name }}</h5>
              <p class="card-text">{{ recipe.description }}</p>
            </div>
            <ul class="list-group">
              <li class="list-group-item" v-for="ingredient in recipe.ingredients" :key="ingredient.id">
                {{ ingredient.name }}
              </li>
            </ul>

            <div class="btn-group">
              <router-link :to="'/recipes/' + recipe.id" type="button" class="btn btn-sm btn-outline-secondary">View</router-link>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import PublicContentService from '@/services/PublicContentService'
export default {
  name: "FindRecipe",
  data() {
    return {
      parentMsg: 'Ingredients',
      recipes: [],
      currentRecipe: {
        id: null,
        name: "",
        ingredients: []
      },
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveRecipes() {
      PublicContentService.getAll()
        .then(response => {
          this.recipes = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchRecipeByIngredients() {
      PublicContentService.searchRecipeByIngredient(name)
        .then(response => {
          this.recipes = response.data;
          this.setActiveRecipe(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    retrieveIngredientsFromRecipe() {
      PublicContentService.getAllIngredientsOfRecipe(this.currentRecipe.id)
        .then(response => {
          this.currentRecipe.ingredients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    setActiveRecipe(recipe, index) {
      this.currentRecipe = recipe;
      this.currentIndex = recipe ? index : -1;
    },

    displayImage(base64String) {
      return "data:image/jpg;base64," + base64String
    }

  },
  mounted() {
    this.retrieveRecipes();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
::placeholder {
  font-style: italic;
}
</style>

