import axios from 'axios'

class EditRecipeService {

  // Only update name, description, direction
  updateRecipe(id,putData) {
    return axios.put(`/recipes/${id}`,putData)
  }

  // Update Image (remove current image and put new one)
  updateImage(recipeId,newImageId) {
    return axios.put(`/recipes/${recipeId}/images/${newImageId}`)
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
