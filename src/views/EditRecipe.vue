<template>
  <div class="container mt-5 mb p-4 border">
    <div class="row justify-content-center">
      <div class="col-3 mb-4">
        <h1 class="fw-light">Edit Recipe</h1>
      </div>
    </div>
    <div class="row">
      <!-- Left Column : Image Upload -->
      <div class="col-5 border p-3">
        <label class="form-label">Upload Image</label>

        <div>
          <img v-if="!changeImage" class="img-fluid rounded" :src="oldImage" alt=""
               style="object-fit:cover; width: 400px; height: 350px;"/>
        </div>

        <div>
          <button v-if="!changeImage" @click="changeImage = true" class="btn btn-primary btn-sm" type="button">Change Image</button>
        </div>

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
          <input :disabled="!changeImage" type="file" accept="image/*" ref="file" @change="selectImage"/>
        </label>

      </div>


      <!-- Right Column : Form -->
      <div class="col-7">
        <form class="border p-3">
          <div class="mb-3">
            <label for="recipe-name" class="form-label">Recipe Name</label>
            <input type="text" class="form-control" id="recipe-name"
                   v-model="currentRecipe.name" :disabled="!editForm">
          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <input class="form-control" id="description" rows="3"
                      v-model="currentRecipe.description" :disabled="!editForm">
          </div>
          <div class="mb-3">
            <label class="form-label">Direction</label>
            <input class="form-control" id="direction" rows="8"
                      v-model="currentRecipe.direction" :disabled="!editForm">
          </div>
        </form>
        <button v-if="!editForm" @click="editForm=true" class="btn btn-primary" type="submit">edit</button>
      </div>
    </div>
  </div>
    <!-- Row : Search Bar Ingredient -->
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

    <!-- Row : List of Ingredients -->
    <div class="row border p-3 gx-2">
      <div class="col" v-for="ingredient in currentRecipe.ingredients" v-bind:key="ingredient.id">
        <div class="card text-center p-2 mb-3">
          <span class="badge bg-warning rounded-pill w-40">{{ ingredient.calories }} cal</span>
          <div class="card-body">
            <h4 class="card-title">{{ ingredient.name }}</h4>
          </div>
          <button @click="removeFromSavedIngredient(ingredient)" type="button" class="btn btn-secondary"
                  style="--bs-btn-padding-y: .10rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            remove</button>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <button @click="updateRecipe" class="btn btn-primary" type="button">save change</button>
    </div>

</template>

<script>
import PublicContentService from '@/services/PublicContentService'
import UploadFileService from '@/services/UploadFileService'
import EditRecipeService from '@/services/EditRecipeService'

export default {
  name: 'EditRecipe',
  data() {
    return {
      //Old data
      currentRecipe: {
        name: "",
        description: "",
        direction: "",
        ingredients:[]
      },

      editForm: false,

      ingredientsFromDatabase: [],
      ingredientNameSearchString: "",

      // Upload Image
      changeImage: false,
      oldImage: undefined,
      previewImage: undefined,
      currentImage: undefined,
      uploadedImageId: "",
      progress: 0,
    };
  },
  methods: {
    getRecipe (id) {
      PublicContentService.getRecipeById(id)
        .then(response => {
          this.currentRecipe = response.data;
          console.log(response.data);
          this.oldImage = "data:image/jpg;base64," + this.currentRecipe.image.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    // Edit Ingredients
    getAllIngredients() {
      PublicContentService.getAllIngredient()
        .then(response => {
          this.ingredientsFromDatabase = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    putSavedIngredient(ing) {
      if(!this.currentRecipe.ingredients.includes(ing)) {
        this.currentRecipe.ingredients.push(ing)
        this.ingredientNameSearchString = ""
      }
      else {
        console.log("Ingredient already selected!")
      }
    },
    removeFromSavedIngredient(ing) {
      const index = this.currentRecipe.ingredients.indexOf(ing)

      //remove if exist
      if (index > -1) {
        this.currentRecipe.ingredients.splice(index, 1);
      }
    },
    // Upload Image
    selectImage() {
      this.currentImage = this.$refs.file.files.item(0);
      this.previewImage = URL.createObjectURL(this.currentImage);
      this.progress = 0;

      UploadFileService.upload(this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          return response.data.message
        })
        // response.data.message is returning imageId as String in Backend
        .then((newImageId) => {
          EditRecipeService.updateImage(
            this.currentRecipe.id,
            newImageId
          )
          console.log(newImageId)
        })
        .catch(error => {
          console.log(error);
        });
    },

    // Form and Ingredients update
    updateRecipe() {
      let putData = {
        name: this.currentRecipe.name,
        description: this.currentRecipe.description,
        direction: this.currentRecipe.direction
      }
      EditRecipeService.updateRecipe(this.currentRecipe.id, putData)
        .then((response) => {
          console.log(response.data)

          // remove ingredients from recipe
          return EditRecipeService.removeIngredients(this.currentRecipe.id)
        })
        .then((response) => {
          console.log(response)
          for(const ing of this.currentRecipe.ingredients) {
            EditRecipeService.addIngredientToRecipe(this.currentRecipe.id,ing.id)
            console.log(ing.name)
          }
          return "Ingredients updated successfully!"
        })
        .then(message => {
          console.log(message)
          location.reload()
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    filteredIngredients: function () {

      let ingredients = this.ingredientsFromDatabase;
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
    },
  },
  mounted() {
    this.getRecipe(this.$route.params.id)
    this.getAllIngredients()
  },
}
</script>

<style scoped>

</style>
