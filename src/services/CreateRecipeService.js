import axios from 'axios'

class CreateRecipeService {

  getAllIngredient() {
    return axios.get(`/ingredients`)
  }

  createRecipeForUser(userId, data) {
    return axios.post(`/user/${userId}/recipes`, data)
  }

  addIngredientToRecipe(recipeId,ingredientId) {
    return axios.put(`/recipes/${recipeId}/ingredients/${ingredientId}`)
  }

  setImageForRecipe(recipeId,imageId) {
    console.log("Second: "+imageId)
    return axios.put(`/recipes/${recipeId}/images/${imageId}`)
  }

  removeImageForRecipe(recipeId,imageId) {
    return axios.delete(`/recipes/${recipeId}/images/${imageId}`)
  }

} export default new CreateRecipeService()
