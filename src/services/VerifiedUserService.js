import axios from 'axios'

class VerifiedUserService {

  getAllUsers() {
    return axios.get(`/users`)
  }

  verifiedUser(id) {
    return axios.put(`user/${id}/verified`)
  }

  unverifiedUser(id) {
    return axios.delete(`user/${id}/unverified`)
  }

} export default new VerifiedUserService()
