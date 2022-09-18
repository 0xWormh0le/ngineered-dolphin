import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from './pages/MainLayout.vue'
import AuthLayout from './pages/AuthLayout.vue'
import store from './store/store'
import { getModule } from 'vuex-module-decorators'
import Auth from './store/modules/auth'
import Signup from './pages/signup/Signup.vue'
import LoginForm from './pages/login/LoginWrapper.vue'
import Logout from './pages/logout/Logout.vue'
import Welcome from '@/pages/welcome/Welcome.vue'
import ProvideEmail from '@/pages/forgotpassword/ProvideEmail.vue'
import CheckInbox from '@/pages/forgotpassword/CheckInbox.vue'
import PasswordRecovery from '@/pages/forgotpassword/PasswordRecovery.vue'
import PasswordChanged from '@/pages/forgotpassword/PasswordChanged.vue'
import ExpandedJob from '@/pages/home/expandedJob/ExpandedJob.vue'
import MainTrending from '@/pages/trending/MainTrending.vue'
import Faves from '@/pages/faves/Faves.vue'
import Home from '@/pages/home/Home.vue'
import Search from "@/pages/search/Search.vue"
import Trending from '@/pages/home/trending/Trending.vue'
import Questions from '@/pages/questions/Questions.vue'
import Profile from '@/pages/Profile/ProfileWrapper.vue'
import MainSearch from "@/pages/search/MainSearch.vue"
import ReferFriends from "@/pages/search/ReferFriends.vue"
import { BFormSelectOptionGroup } from 'bootstrap-vue'
import LoginWrapper from '@/pages/login/LoginWrapper.vue'
import ProfileContainer from '@/pages/Profile/ProfileContainer.vue'
import JobPreview from "@/components/search-components/JobPreview.vue"

const userState = getModule(Auth)
Vue.use(Router)
const routes = [
	{
		path: '/',
		component: MainLayout,
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/',
				redirect: '/home',
			},
			{
				path: '/home',
				name: 'Home',
				component: Home,
			},
			{
				path: '/trending',
				name: 'trending',
				component: Trending,
			},
			{
				path: '/expandedJob',
				name: 'expendedJob',
				component: ExpandedJob,
			},
			{
				path: '/faves',
				name: 'Faves ',
				component: Faves,
			},

			{
				path: '/search',
				name: 'search ',
				component: Search,
			},
			{
				path: '/mainSearch',
				name: 'mainSearch ',
				component: MainSearch,
			},
			{
				path: '/profile',
				name: 'profile',
				component: Profile,
			},
			{
				path: '/referFriends',
				name: 'referFriends ',
				component: ReferFriends,
			},
			{
				path: '/logout',
				name: 'supplier.logout',
				component: Logout,
				meta: {
					breadCrumb: 'Logout',
				},
			},
		],
	},
	{
		path: '/',
		name: 'AuthLayout',
		component: AuthLayout,
		children: [
			{
				path: '/welcome',
				name: 'Welcome',
				component: Welcome,
			},
			{
				path: '/login',
				name: 'Login',
				component: Welcome,
			},
			{
				path: '/signup',
				name: 'signup',
				component: Signup,
			},
			{
				path: '/questions',
				name: 'questions',
				component: Questions,
			},
			{
				path: '/loginForm',
				name: 'loginform',
				component: LoginForm,
			},
			{
				path: '/provideEmail',
				name: 'provideEmail',
				component: ProvideEmail,
			},
			{
				path: '/checkInbox',
				name: 'checkInbox',
				component: CheckInbox,
			},
			{
				path: '/passwordRecovery',
				name: 'passwordRecovery',
				component: PasswordRecovery,
			},
			{
				path: '/passwordChanged',
				name: 'passwordChanged',
				component: PasswordChanged,
			},
		],
	},
]
const router = new Router({
	mode: 'history',
	base: '/',
	routes,
	scrollBehavior() {
		return { x: 0, y: 0 }
	},
})
//@ts-ignore
router.beforeEach((to, from, next) => {
	//@ts-ignore
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
	if (requiresAuth) {
		if (store.getters.hasToken) {
			// store.commit('setHeaderTitle', to.name)
			if (!store.getters.hasUser) {
				userState.getUser()
				userState
					.getUser()
					.then(() => {
						next()
					})
					.catch(() => {
						userState.logout().then(() => {
							next(`/login/?redirect=${to.fullPath}`)
						})
					})
				return
			}

			next()
			return
		}
		next(`/login/?redirect=${to.fullPath}`)
	} else {
		if (store.getters.hasToken) {
			next('/')
			return
		}
		next()
	}
})
export default router
