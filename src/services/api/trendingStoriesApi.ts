import axios from 'axios'
import { TrendingStories } from '@/interfaces/trending.interface'

export default {
	getTrendingStories() {
		return axios
			.get(`/api/v1/trending-stories/?&expand=job,job.location,job.company`)
			.then((resp: { data: TrendingStories }) => {
				return resp.data
			})
	},

	getTrendingStoriesArray() {
		return axios
			.get(`/api/v1/trending-stories/?&&expand=job,job.location,job.company`)
			.then((resp) => {
				return resp.data.results
			})
	},
	// getGroupedTrendingStories() {
	// 	return axios
	// 		.get(`/api/v1/trending-stories/?offset=0&limit=99&expand=job,job.location,job.company`)
	// 		.then((resp: { data: TrendingStories }) => {
	// 			resp.data.results.forEach(e => {
	// 				for (let key in e) {
	// 					if (key === 'createdAt') {
	// 						e[key] = e[key].substr(0, 10)
	// 						alert(e[key])
	// 					}
	// 				}
	// 			})
	// 			alert(resp.data)
	// 		})

	// },
}

