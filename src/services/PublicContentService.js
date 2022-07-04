import axios from 'axios';

class PublicContentService {

  getAll() {
    return axios.get("/public/recipes");
  }

  getAllIngredient() {
    return axios.get(`/ingredients`)
  }

  searchRecipeByIngredient(name) {
    return axios.get(`/public/recipes?name=${name}`);
  }

  getAllIngredientsOfRecipe(id) {
    return axios.get(`/public/recipes/${id}/ingredients`);
  }

  getRecipeById(id) {
    return axios.get(`/public/recipes/${id}`);
  }

  getImageById(id) {
    return axios.get(`/files/${id}`);
  }
}
export default new PublicContentService();
