import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import store from './../../store/store'
import axios from 'axios'


@Module({
	name: 'settings',
	dynamic: true,
	store: store,
})
export default class settings extends VuexModule {

}
