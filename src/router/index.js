import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommended/recommend'
import Singer from 'components/singer/singer'
import Ranking from 'components/ranking/ranking'
import Search from 'components/search/search'

Vue.use(Router)

// const Recommend = (resolve) => {
// 	import('components/recommended/recommend').then((modules) => {
// 		resolve(modules)
// 	})
// }

// const Singer = (resolve) => {
// 	import('components/singer/singer').then((modules) => {
// 		resolve(modules)
// 	})
// }
// const Ranking = (resolve) => {
// 	import('components/ranking/ranking').then((modules) => {
// 		resolve(modules)
// 	})
// }

// const Search = (resolve) => {
// 	import('components/search/search').then((modules) => {
// 		resolve(modules)
// 	})
// }

export default new Router({
	//出除默认#号
	mode: 'history',
	routes: [{
		path: '/',
		redirect: '/recommend'
	}, {
		path: '/recommend',
		component: Recommend
	}, {
		path: '/singer',
		component: Singer
	}, {
		path: '/ranking',
		component: Ranking
	}, {
		path: '/search',
		component: Search
	}]
})