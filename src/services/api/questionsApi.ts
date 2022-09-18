import axios from 'axios';

// TODO(a.matrosovas): Make this a global variable for all API services
const API_URL = '/api/v1/';

class QuestionsApi {
  static async getQuestions(sessionId: string | null = '') {
    let queryString = '';
    if (sessionId !== null) {
      queryString = '?session=' + sessionId;
    }
    return axios
      .get(API_URL + 'questions/' + queryString)
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getJobTypes() {
    return axios
      .get(API_URL + 'job-types/')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getExperiences() {
    return axios
      .get(API_URL + 'experiences/')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getJobRoles() {
    return axios
      .get(API_URL + 'job-roles/')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getJobLocations() {
    return axios
      .get(API_URL + 'locations/?fields=id,display_name,image')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getHumanityProblems() {
    return axios
      .get(API_URL + 'humanity-problems/')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async answerQuestion(payload = {}, sessionId: string | null) {
    if (sessionId !== null) {
      payload['session'] = sessionId;
    }
    return axios
      .post(API_URL + 'answers/', payload)
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async updateQuestionAnswer(answerId: string, payload = {}, sessionId: string | null) {
    if (sessionId !== null) {
      payload['session'] = sessionId;
    }
    return axios
      .patch(API_URL + 'answers/' + answerId + '/', payload)
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getSuggestedSchools(search = '') {
    return axios
      .get(API_URL + 'colleges/?search=' + search + '&fields=id,name')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getSuggestedMajors(search = '') {
    return axios
      .get(API_URL + 'college-majors/?search=' + search + '&fields=id,name')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }

  static async getSuggestedDegrees(search = '') {
    return axios
      .get(API_URL + 'degrees/?search=' + search + '&fields=id,name,abbreviation')
      .then(resp => resp.data)
      .catch(function(error) {
        return error;
      });
  }
}
export default QuestionsApi;
