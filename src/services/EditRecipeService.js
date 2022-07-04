import axios from 'axios'

class EditRecipeService {

  // Only update name, description, direction
  updateRecipe(id,putData) {
    return axios.put(`/recipes/${id}`,putData)
  }

  // Update Image (remove current image and put new one)
  updateImage(recipeId,oldImageId,newImageId) {
    //delete current image
    axios.delete(`/recipes/${recipeId}/images/${oldImageId}`)
      .then((response) => {
        console.log(response.data)
        // update new image
        return axios.put(`/recipes/${recipeId}/images/${newImageId}`)
      })
      .then((response) => {
        return response.data
      });
  }

  // Update Ingredients (remove current ingredients and put new ingredients)
  removeIngredients(recipeId) {
    //delete current ingredients
    return axios.delete(`/recipes/${recipeId}/ingredients`)
  }

  addIngredientToRecipe(recipeId,ingredientId) {
    return axios.put(`/recipes/${recipeId}/ingredients/${ingredientId}`)
  }

  // Get Image
  getImageFile(fileId) {
    return axios.get(`/files/${fileId}`)
  }

} export default new EditRecipeService()
