import axios from 'axios';

class PublicContentService {

  getAll() {
    return axios.get("/public/recipes");
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
}
export default new PublicContentService();
