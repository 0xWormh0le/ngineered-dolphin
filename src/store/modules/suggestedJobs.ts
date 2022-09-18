import { Module, VuexModule, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import { getModule } from 'vuex-module-decorators'
import store from '../store'
import axios from 'axios'
import { suggestedCardInfo } from '@/interfaces/suggestedCardInfo.interface'
import suggestedJobsApi from '../../services/api/suggestedJobsApi'
import usersApi from "@/services/api/usersApi"


@Module({
	name: 'suggestedJobs',
	dynamic: true,
	store: store,
})
export default class SuggestedJobs extends VuexModule {

	jobResults = {}
	jobArray = []
	// fullJobs = {}
	jobCards = {}
	suggestedJobCount = {}
	jobDate = ''
	jobDateUnix = 0
	jobInfoById = {}
	jobListingById = {}
	jobList = {}
	waiting = true;

	get suggestedJobs() {
		return this.jobResults
	}

	get jobArrayLength() {
		return this.jobArray.length
	}

	get JobDateUnix() {
		return this.jobDateUnix
	}

	@Mutation
	setJobs(payload) {
		this.jobResults = payload
		this.jobArray = payload.results.reverse()
		this.suggestedJobCount = payload.count
		this.waiting = false;
	}
	@Mutation
	setJobDates(payload) {
		this.jobDate = payload.jobSuggestionDt
		this.jobDateUnix = Date.parse(payload.jobSuggestionDt)
	}

	@Mutation
	setJobInfoById(payload) {
		this.jobInfoById = payload
	}
	@Mutation
	setJobListingById(payload) {
		this.jobListingById = payload
	}

	@Action({ commit: 'setJobInfoById' })
	recieveJobInfoById(id) {
		const jobData = suggestedJobsApi.getJobById(id)
		return jobData
	}
	@Action({ commit: 'setJobListingById' })
	recieveJobListingById(id) {
		const jobData = suggestedJobsApi.getJobListingById(id)
		return jobData
	}

	@Mutation
	setJobCardArray() {
		this.jobCards = this.jobResults
	}
	// @Mutation
	// setFullJobs(payload) {
	// 	this.fullJobs = payload
	// }


	@Mutation
	setNewJobs(input: string) {

		this.jobList = input
	}


	@Action({ commit: 'setJobs' })
	recieveJobData() {

		const jobData = suggestedJobsApi.getSuggestedJobs()
		return jobData
	}

	@Action({ commit: 'setJobDates' })
	recievejobDates() {
		const jobData = suggestedJobsApi.getSuggestedJobs()
		return jobData
	}

	@Action({ commit: 'setNewJobs' })
	public async receiveNewJobs(input: string) {
		return usersApi.searchJobs(input).then(data => {
			return data
		})
	}
}