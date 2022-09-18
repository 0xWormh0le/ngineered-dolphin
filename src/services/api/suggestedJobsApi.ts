import axios from 'axios'
import { suggestedCardInfo } from '@/interfaces/suggestedCardInfo.interface'
import { jobs } from '@/interfaces/jobs.interface'

export default {
	getSuggestedJobs() {
		return axios
			.get(`/api/v1/user-jobs/?status=1&limit=8&expand=company,job_type,location
                `)
			.then((resp: { data: suggestedCardInfo }) => {
				return resp.data
			})
	},

	//get job date for counter. Data reformatted so that date parser can properly parse the date and convert to epoch unix.
	getSuggestedJobsDate() {
		return axios
			.get(`/api/v1/user-jobs/?status=1&limit=8&expand=company,job_type,location
                `)
			.then((resp: { data: suggestedCardInfo }) => {
				return resp.data.jobSuggestionDt.replace(/T/g, ' ').replace(/Z/g, '')
			})
	},

	getJobById(id: number) {
		return axios
			.get(`/api/v1/user-jobs/${id}?status=1&limit=8&expand=company,job_type,location`)
			.then((resp) => {
				return resp.data
			})
	},
	getJobListingById(id: number) {
		return axios
			.get(`/api/v1/jobs/${id}?status=1&limit=8&expand=company,job_type,location`)
			.then((resp) => {
				return resp.data
			})
	},
	submitFeedback(job: number, reason: number) {
		return axios
			.post(`/api/v1/user-job-feedbacks/`, { job: job, passReason: reason })
			.then(function (resp) {
				console.log(resp)
			})
			.catch(function (error) {
				return error
			})
	},


	passJob(jobID: number) {
		return axios
			.patch(`/api/v1/user-jobs/${jobID}`, { status: 2 })
			.then(function (resp) {
				console.log(resp)
			})
			.catch(function (error) {
				return error
			})
	},

	saveJob(jobID: number) {
		return axios
			.patch(`/api/v1/user-jobs/${jobID}`, { status: 3 })
			.then(function (resp) {
				console.log(resp)
			})
			.catch(function (error) {
				console.log(error)
			})
	},
	applyJob(jobID: number) {
		return axios
			.patch(`/api/v1/user-jobs/${jobID}`, { status: 4 })
			.then(function (resp) {
				console.log(resp)
			})
			.catch(function (error) {
				return error
			})
	}
}


