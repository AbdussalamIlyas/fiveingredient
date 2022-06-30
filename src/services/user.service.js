import axios from 'axios';
import authHeader from './auth-header';

class UserService {
  getPublicContent() {
    return axios.get('/test/all');
  }
  getUserBoard() {
    return axios.get('/test/user', { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get('/test/mod', { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get('/test/admin', { headers: authHeader() });
  }
}
export default new UserService();
