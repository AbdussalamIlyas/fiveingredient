<template>
  <div class="text-center p-4 p-lg-5">
    <p class="font-weight-bold text-primary mb-2">Recipe Details</p>
    <h1 class="font-weight-bold mb-4">{{currentRecipe.name}}</h1>
    <p class="lead text-muted">{{ currentRecipe.description }}</p>

  </div>
  <div class="row align-items-start" style="margin-top: 20px;">
    <div class="col">
      <div>
        <img :src="imageURL" class="img-fluid" alt="...">
      </div>
    </div>
    <div class="col">
      <div v-if="currentRecipe">
        <label><strong>Ingredients :</strong></label>
        <ul class="list-group">
          <li class="list-group-item"
              v-for="(ingredients, index) in currentRecipe.ingredients" :key="index">
            {{ ingredients.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col">
      <strong>How to cook :</strong>
      <p>
        {{currentRecipe.direction}}
      </p>
    </div>
  </div>

</template>

<script>
import PublicContentService from '@/services/PublicContentService'

export default {
  name: 'Recipe',
  data() {
    return {
      currentRecipe: {
        name: "",
        description: "",
        direction: ""
      },
      imageURL: undefined
    };
  },

  methods: {
    getRecipe(id) {
      PublicContentService.getRecipeById(id)
        .then(response => {
          this.currentRecipe = response.data;
          return this.currentRecipe.image.data
        })
        .then(response => {
          this.imageURL = "data:image/jpg;base64," + response
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
  },
  mounted() {
    this.getRecipe(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
