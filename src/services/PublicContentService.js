import axios from 'axios';
const API_URL = 'http://localhost:8080/api/public';
class PublicContentService {

  getAll() {
    return axios.get(API_URL + "/recipes");
  }

  searchRecipeByIngredient(name) {
    return axios.get(API_URL + `/recipes?name=${name}`);
  }

  getAllIngredientsOfRecipe(id) {
    return axios.get(API_URL + `/recipes/${id}/ingredients`);
  }

  getRecipeById(id) {
    return axios.get(API_URL + `/recipes/${id}`);
  }
}
export default new PublicContentService();
