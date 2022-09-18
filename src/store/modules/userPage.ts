import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import store from './../../store/store'
import axios from 'axios'


@Module({
	name: 'userPage',
	dynamic: true,
	store: store,
})
export default class userPage extends VuexModule {
	activeTab: String = ""
	firstName: String = ""
	lastName: String = ""
	email: String = ""
	username: String = ""
	apsnToken: String = ""
	profileUrl: String = ""
	fullProfileInfo = {}
	@Mutation
	changeTab(activeTab: String) {
		this.activeTab = activeTab
	}

	@Action
	getProfileInfo() {
		return axios.get('/api/v1/auth/user/')

	}
}
