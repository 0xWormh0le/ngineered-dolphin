import axios from 'axios'

axios.interceptors.response.use(
	function (response) {
		return response
	},
	function (error) {
		if (error.response && [401, 403].includes(error.response.status)) {
			localStorage.clear()
			axios.defaults.headers.common = {}
			const query: { [key: string]: string | boolean | number } = {}
			window.location.search
				.slice(1)
				.split('&')
				.forEach((param) => {
					const [key, value] = param.split('=')
					query[key] = value
				})

			let redirect = window.location.href
			if (Object.keys(query).length && query.redirect) {
				redirect = query.redirect as string
			}

			const message = error.response.status === 401 ? 'login-failure' : 'unauthorized'
			window.location.href = `/login?redirect=${window.encodeURIComponent(redirect)}&error=${message}`
		}
		return Promise.reject(error)
	}
)

export default axios
