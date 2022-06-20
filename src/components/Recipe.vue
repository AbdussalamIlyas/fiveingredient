<template>
  <div class="row align-items-center" style="margin-top: 100px">
    <div class="col">
      <div>
        <img src="https://www.forkinthekitchen.com/wp-content/uploads/2018/01/210729.salmon.lemon_.garlic.pasta-1456-7.jpg"
             alt="example"
             style="max-width:350px; max-height:500px;"/>
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
      How to cook
    </div>
  </div>

</template>

<script>
import PublicContentService from '@/services/PublicContentService'

export default {
  name: 'Recipe',
  data() {
    return {
      currentRecipe: null,
      message: ''
    };
  },

  methods: {
    getRecipe(id) {
      PublicContentService.getRecipeById(id)
        .then(response => {
          this.currentRecipe = response.data;
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
  },
  mounted() {
    this.message = '';
    this.getRecipe(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
