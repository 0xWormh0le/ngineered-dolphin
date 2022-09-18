import axios from 'axios'

class AuthApi {
  static async authenticate(email: string, password: string) {
    return axios.post('/api/v1/auth/login/', { email, password }).then((resp) => resp.data)
  }
  static async reset(email: string) {
    return axios
      .post('/api/v1/auth/password/reset/', { email })
      .then((resp) => resp.data)
      .catch(function(error) {
        return error
      })
  }

  static async registration(firstName: string, lastName: string, email: string, password: string, session: string) {
    return axios
      .post('/api/v1/auth/registration/', { firstName, lastName, email, password1: password, password2: password, session })
      .then(resp => resp.data);
  }

  static async changePassword(newPassword:string, confirmationPassword:string){

    return axios
    .post('/api/v1/auth/password/change/', { newPassword1:newPassword, newPassword2:confirmationPassword })
    .then(resp => resp.data)
    .catch(function(error){
      return error
    });
  }
}
export default AuthApi
