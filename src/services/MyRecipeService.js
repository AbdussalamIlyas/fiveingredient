import axios from 'axios'
import authHeader from '@/services/auth-header'

class MyRecipeService {

  getAllRecipeOfAUser(id) {
    return axios.get(`/user/${id}/recipes`,{ headers: authHeader() })
  }

  getImageOfRecipe(id) {
    return axios.get(`/recipes/${id}/image`,{ headers: authHeader() })
  }

  getImageById(id) {
    return axios.get(`/files/${id}`,{ headers: authHeader() })
  }

} export default new MyRecipeService();
