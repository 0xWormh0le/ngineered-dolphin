import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import usersApi from './../../services/api/usersApi'
import axios from 'axios'
import authApi from './../../services/api/authApi'
import store from './../../store/store'
import { IUser } from '../../interfaces/user.interface'

@Module({
	name: 'Auth',
	dynamic: true,
	store: store,
})
export default class Auth extends VuexModule {
	emptyUser = {
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		isJobSearchUnlocked: false,
		profileUrl: ''
	}
	token = localStorage.getItem('token') || ''
	userData: IUser = { ...this.emptyUser }




	get user() {
		return this.userData
	}

	get name() {
		return this.userData.firstName
	}

	get JobSearchUnlocked(){
		return this.JobSearchUnlocked}

	get fullName() {
		return this.userData.firstName + ' ' + this.userData.lastName
	}

	get accessToken() {
		return this.token
	}

	set accessToken(val: string) {
		this.token = val
	}

	get hasToken() {
		return !!this.token.length
	}

	@Mutation
	public setToken(payload: string) {
		this.token = payload
	}

	@Mutation
	public unsetToken() {
		this.token = ''
	}

	@Mutation
	public setUser(payload: IUser) {
		for (let key in payload) {
			if (Object.prototype.hasOwnProperty.call(payload, key)) {
				// @ts-ignore
				this.userData[key] = (payload as any)[key]
			}
		}
	}

	@Mutation
	public unsetUser() {
		this.userData = { ...this.emptyUser }
	}


	@Mutation
	public changeJobSearchStatus() {
		this.userData.isJobSearchUnlocked = true;
	}

	@Action
	public async logout() {
		this.unsetToken()
		this.unsetUser()
		localStorage.removeItem('token')
		axios.defaults.headers.common = {}
	}

	@Action({ commit: 'setToken' })
	public async authenticate({ email, password }: { email: string; password: string }) {
		return authApi
			.authenticate(email, password)
			.then((data: { key: string }) => {
				localStorage.setItem('token', data.key)
				axios.defaults.headers.common['Authorization'] = 'Token ' + data.key
				return data.key
			})
			.catch((err: any) => Promise.reject(err))
	}

	@Action({ commit: 'setToken' })
	public async signUp({ firstName, lastName, email, password, session }) {
		return authApi
			.registration(firstName, lastName, email, password, session)
			.then((data: { key: string }) => {
				localStorage.setItem('token', data.key)
				axios.defaults.headers.common['Authorization'] = 'Token ' + data.key
				return data.key
			})
			.catch((err: any) => Promise.reject(err))
	}

	@Action({ commit: 'setToken' })
	public async tokenAuthenticate(data: { token: string }) {
		localStorage.setItem('token', data.token)
		axios.defaults.headers.common['Authorization'] = 'Token ' + data.token
		return data.token
	}

	@Action({ commit: 'setUser' })
	public async getUser() {
		return usersApi.getUser().then((data: IUser) => {
			return data
		})
	}

		@Action({ commit: 'changeJobSearchStatus' })
		public async unlockJobSearch(email: string) {
			return usersApi.changeSearchStatus(email).then((data: IUser) => {
				return data
			})
	}
}
