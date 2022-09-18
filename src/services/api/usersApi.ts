import { IUser } from './../../interfaces/user.interface';
import { favesJobs } from './../../interfaces/favesInfo.interface'
import axios from './interceptor'
import { IUserExpanded } from '../../interfaces/user.interface'
import {IUserSettings } from '../../interfaces/user.interface'

export default {

  
  getUser() {
    return axios.get(`/api/v1/auth/user/`).then((resp: { data: IUser }) => {
      return resp.data
    })
  },
  getJobsSaved(): Promise<{ results: favesJobs[] }> {
    return axios.get(`/api/v1/user-jobs/?status=3&expand=company&limit=4`).then((resp: { data }) => {
      return resp.data
    })
  },
  getJobsSourced(): Promise<{ results: favesJobs[] }> {
    return axios.get(`/api/v1/promoted-jobs/?status=3&expand=company&limit=4`).then((resp: { data }) => {
      return resp.data
    })
  },
  getJobsEmailed(): Promise<{ results: favesJobs[] }> {
    return axios.get(`/api/v1/user-jobs/?status=4&expand=company&limit=4 `).then((resp: { data }) => {
      return resp.data
    })
  },


  getUserProgress(): Promise<{ results: IUserExpanded[] }> {
    return axios.get(`/api/v1/auth/user/?expand=progress `).then((resp: { data }) => {
      return resp.data
    })
  },

  
  getUserSettings(): Promise<{ results: IUserSettings[] }> {
    return axios.get(`/api/v1/questions/?fields=id,answer,short_text`).then((resp: { data }) => {
      return resp.data
    })
  },



  searchJobs(input :string):  Promise<{ results: favesJobs[] }> {

    return axios.get('/api/v1/jobs/?status&expand=company&limit=4&pq=' + input ).then((resp: { data }) => {
      return resp.data
    })

  },


  searchJobsWithFilters(input :string, seniorityChoices:string[], jobtypesChoices :string[], problemsChoices: string[], locationChoices: string[],  ):  Promise<{ results: favesJobs[] }> {
 
    return axios.get('/api/v1/jobs/?fields=id,status,title,company&expand=company&limit=4&experiences='+ seniorityChoices +'&job_types='+ jobtypesChoices +'&problems=' + problemsChoices + '&locations=' + locationChoices+ '&pq=' + input ).then((resp: { data }) => {
      return resp.data
    })

  },
  changeSearchStatus(email: string) {
    return axios.post(' /api/v1/referred-emails/', {email})
    .then((resp) => resp.data)
    
  },
  changeEmail(newEmail:string){
    return axios.patch(`/api/v1/auth/user/`,  {email: newEmail})
    .then((resp: { data: IUser }) => {
      return resp.data
    })
  },
  changeAnswers(answerID:number, chosenAnswers: Array<number> ){
    return axios.patch(`/api/v1/answers/`+ answerID+`/`,  { valueIds: chosenAnswers})
    .then((resp: { data: IUser }) => {
      return resp.data
    })

  }
}
