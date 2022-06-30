import axios from 'axios'
import authHeader from '@/services/auth-header'
const API_URL = 'http://localhost:8080/api';

class MyRecipeService {

  getAllRecipeOfAUser(id) {
    return axios.get(API_URL + `/user/${id}/recipes`,{ headers: authHeader() })
  }

  getImageOfRecipe(id) {
    return axios.get(API_URL + `/recipes/${id}/image`,{ headers: authHeader() })
  }

  getImageById(id) {
    return axios.get(API_URL + `/files/${id}`,{ headers: authHeader() })
  }

} export default new MyRecipeService();
