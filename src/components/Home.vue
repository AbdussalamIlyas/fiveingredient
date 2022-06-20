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
  <div class="col-md-6" style="width: 500px; float:left;">
    <h4 class="fw-light"> Recipes List</h4>
    <ul class="list-group">
      <li class="list-group-item" :class="{ active: index === currentIndex }"
          v-for="(recipe, index) in recipes" :key="index"
          @click="setActiveRecipe(recipe, index)"
      >
        {{ recipe.name }}
      </li>
    </ul>
  </div>
  <div class="col-md-6" style="overflow: hidden;">
    <div v-if="currentRecipe.name !== ''">
      <h4><label><strong>{{ currentRecipe.name }}</strong></label></h4>
      <div>
        <label><strong>Ingredients :</strong></label>
      </div>
      <div class="col-md-7">
        <div v-if="currentRecipe">
          <ul class="list-group">
            <li class="list-group-item" :class="{ active: index === currentIndex }"
                v-for="(ingredients, index) in currentRecipe.ingredients" :key="index">
              {{ ingredients.name }}
            </li>
          </ul>
        </div>
      </div>
      <router-link :to="'/recipes/' + currentRecipe.id" class="badge badge-warning" style="width: 250px;">View Recipe</router-link>
    </div>
    <div v-else>
      <br />
      <p style="padding: 70px 0;">Click on a Recipe</p>
    </div>
  </div>
</template>

<script>
import PublicContentService from '@/services/PublicContentService'
export default {
  name: "Home",
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
