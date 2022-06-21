<template>
  <div class="text-center p-4 p-lg-5">
    <p class="font-weight-bold text-primary mb-2">Recipe Details</p>
    <h1 class="font-weight-bold mb-4">{{currentRecipe.name}}</h1>
  </div>
  <div class="row align-items-start" style="margin-top: 20px;">
    <div class="col">
      <div>
        <img class="rounded img-fluid"
          src="https://www.forkinthekitchen.com/wp-content/uploads/2018/01/210729.salmon.lemon_.garlic.pasta-1456-7.jpg"
          alt="example"/>
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
        1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab doloribus, error fugiat minima officia temporibus.<br>
        2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores maxime praesentium qui quo soluta unde!<br>
        3. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque dicta doloremque facere harum optio sequi sunt! Commodi, consectetur, eos!<br>
        4. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, ipsa.<br>
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
      currentRecipe: [name],
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
