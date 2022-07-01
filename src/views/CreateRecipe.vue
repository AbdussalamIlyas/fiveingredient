<template>

  <div style="height: 600px;background-image: url('https://images.unsplash.com/photo-1527034010651-8dcf514bd147?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
                background-position: center; background-size: cover; margin-top: 10px">
    <div class="container h-100">
      <div class="row h-100">
        <div class="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-center">
          <div class="card p-sm-5" style="max-width: 350px;">
            <h1 class="font-weight-bold">Create Your Own Recipe</h1>
            <p class="my-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda fugit mollitia obcaecati omnis quasi quo, voluptatum</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container mt-5 mb p-4 border">
    <div class="row justify-content-center">
      <div class="col-3 mb-4">
        <h1 class="fw-light">Creat Recipe</h1>
      </div>
    </div>
    <div class="row">
      <!-- Left Column : Form -->
      <div class="col-7">
        <div class="submit-form">
          <div>
            <form class="border p-3">
              <div class="mb-3">
                <label for="name" class="form-label">Recipe Name</label>
                <input type="text" class="form-control" id="name" required v-model="recipe.name" name="name">
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea class="form-control" id="description" v-model="recipe.description"
                          name="description" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">Direction</label>
                <textarea class="form-control" id="direction" v-model="recipe.direction"
                          name="direction" rows="10"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Right Column : Upload Image -->
      <div class="col border p-3">
        <label class="form-label">Upload Image</label>


        <div v-if="previewImage">
          <div>
            <img class="img-fluid rounded" :src="previewImage" alt=""
                 style="object-fit:cover; width: 600px; height: 350px;"/>
          </div>
        </div>
        <div v-if="currentImage" class="progress">
          <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="progress" aria-valuemin="0"
               aria-valuemax="100" :style="{ width: progress + '%' }"
          >
            {{ progress }}%
          </div>
        </div>

        <label class="btn btn-secondary mt-2">
          <input type="file" accept="image/*" ref="file" @change="selectImage"/>
        </label>

      </div>
    </div>
    <!-- Row : Ingredient -->
    <div class="row p-3">
      <h4 class="mt-3">Ingredient</h4>
      <div class="input-group mb-3">
        <input type="text" class="form-control rounded" placeholder="Search" aria-label="Search"
               aria-describedby="search-addon" v-model="ingredientNameSearchString" />
        <button type="button" class="btn btn-outline-primary">search</button>
      </div>
      <div v-if="ingredientNameSearchString" class="list-group">
        <button @click="putSavedIngredient(ingredient)" type="button" class="list-group-item list-group-item-action"
                v-for="ingredient in filteredIngredients" v-bind:key="ingredient.id">
          {{ ingredient.name }}
        </button>
      </div>
    </div>

    <!-- Row : List of to be save Ingredients -->
    <div class="row border p-3 gx-2">
      <div class="col" v-for="selectedIngredient in savedIngredients" v-bind:key="selectedIngredient.id">
        <div class="card text-center p-2 mb-3">
          <span class="badge bg-warning rounded-pill w-40">{{ selectedIngredient.calories }} cal</span>
          <div class="card-body">
            <h4 class="card-title">{{ selectedIngredient.name }}</h4>
          </div>
          <button @click="removeFromSavedIngredient(selectedIngredient)" type="button" class="btn btn-secondary"
                  style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            remove</button>
        </div>
      </div>


    </div>

    <div class="row justify-content-center mt-3" v-if="!submitted">
      <button @click="uploadAndSaveRecipe" class="btn btn-primary" type="submit">Submit</button>
    </div>
    <div class="row justify-content-center mt-3" v-if="submitted">
      <button @click="refreshPage" class="btn btn-primary" type="submit">New Recipe</button>
    </div>

  </div>



</template>

<script>

import UploadFileService from '@/services/UploadFileService'
import CreateRecipeService from '@/services/CreateRecipeService'

export default {
  name: "CreateRecipe",
  data() {
    return {
      //upload image
      currentImage: undefined,
      previewImage: undefined,
      progress: 0,
      imageInfos: [],
      uploadedImageId: undefined,

      //input form (name, description, direction)
      recipe: {
        name:"",
        description:"",
        direction:""
      },

      //Ingredients
      ingredients: [],
      ingredientNameSearchString: "",
      savedIngredients: [],
      ingredient: undefined,

      submitted: false
    };
  },
  methods: {
    refreshPage() {
      location.reload()
    },
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;
    },
    getAllIngredients() {
      CreateRecipeService.getAllIngredient()
        .then(response => {
          this.ingredients = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    putSavedIngredient(ing) {
      if(!this.savedIngredients.includes(ing)) {
        this.savedIngredients.push(ing)
        this.ingredientNameSearchString = ""
      }
      else {
        console.log("Ingredient already selected!")
      }
    },
    removeFromSavedIngredient(ing) {
      const index = this.savedIngredients.indexOf(ing)

      //remove if exist
      if (index > -1) {
        this.savedIngredients.splice(index, 1);
      }
    },
    uploadAndSaveRecipe() {
      //Upload Image to Database
      this.progress = 0;
      UploadFileService.upload(this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          return response.data.message
        })
        .then((imageId) => {
          this.uploadedImageId = imageId
          let data = {
            name: this.recipe.name,
            description: this.recipe.description,
            direction: this.recipe.direction
          };
          CreateRecipeService.createRecipeForUser(this.currentUser.id,data)
            .then(response => {
              this.recipe.id = response.data.id;
              console.log(response.data);
              return this.recipe.id
            })
            .then(recipeId => {
              //Put Image to Recipe
              CreateRecipeService.setImageForRecipe(recipeId, this.uploadedImageId)

              //Put Ingredients to Recipe
              for(const ing of this.savedIngredients) {
                CreateRecipeService.addIngredientToRecipe(recipeId, ing.id)
              }

              //submitted
              this.submitted = true
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch((error) => {
          this.progress = 0;
          console.log("Could not upload the image! " + error);
          this.currentImage = undefined;
        });

    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    filteredIngredients: function () {

      let ingredients = this.ingredients;
      let ingredientNameSearchString = this.ingredientNameSearchString.trim().toLowerCase();

      if(!ingredientNameSearchString){
        return ingredients;
      }

      ingredients = ingredients.filter(function(item){
        if(item.name.toLowerCase().indexOf(ingredientNameSearchString) !== -1){
          return item;
        }
      })

      return ingredients;
    }
  },
  mounted() {
    UploadFileService.getFiles().then(response => {
      this.imageInfos= response.data;
    });

    this.getAllIngredients()

  }
};
</script>

