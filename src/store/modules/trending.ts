import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import TrendingStoriesApi from '@/services/api/trendingStoriesApi'
import store from './../../store/store'
import axios from 'axios'
import { TrendingStories } from '@/interfaces/trending.interface'
import { Result } from '@/interfaces/trending.interface'



@Module({
	name: 'Trending',
	dynamic: true,
	store: store,
})
export default class Trending extends VuexModule {

	TrendingStories = {}
	StoryResults = {}

	get Stories() {
		return this.TrendingStories
	}
	get StoryArray() {
		return this.StoryResults
	}


	@Mutation
	setTrendingStories() {
		TrendingStoriesApi.getTrendingStories().then(result => {
			this.TrendingStories = result
		})
	}

	@Mutation
	setStoryArray(payload: Result[]) {
		this.StoryResults = payload
	}

	@Action({ commit: 'setStoryArray' })
	recieveStoryArray() {
		return TrendingStoriesApi.getTrendingStories()
	}
}
