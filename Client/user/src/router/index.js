import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from '../components/General/Layout/MainLayout.vue'
import Main from '../components/General/View/Main.vue'
import News from '../components/General/View/News.vue'
import ReadNews from '../components/General/View/ReadNews.vue'
import PhotoSections from '../components/General/View/PhotoSections.vue'
import Photos from '../components/General/View/Photos.vue'
import History from '../components/General/View/History.vue'
import Articles from '../components/General/View/Articles.vue'
import ReadArticle from '../components/General/View/ReadArticle.vue'
import Publish from '../components/General/View/Publish.vue'
import Contacts from '../components/General/View/Contacts.vue'
import Calendar from '../components/General/View/Calendar.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/home',
      component: MainLayout,
      children: [
        {
          path: 'home',
          name: 'Main',
          component: Main
        },
        {
          path: 'news',
          name: 'News',
          component: News
        },
        {
          path: 'read-news',
          name: 'Read News',
          component: ReadNews
        },
        {
          path: 'photo-sections',
          name: 'Photo Sections',
          component: PhotoSections
        },
        {
          path: 'photos',
          name: 'Photos',
          component: Photos
        },
        {
          path: 'articles',
          name: 'Articles',
          component: Articles
        },
        {
          path: 'read-article',
          name: 'Read Articles',
          component: ReadArticle
        },
        {
          path: 'history',
          name: 'History',
          component: History
        },
        {
          path: 'publish',
          name: 'Publish',
          component: Publish
        },
        {
          path: 'contacts',
          name: 'Contacts',
          component: Contacts
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: Calendar
        }
      ]
    }
  ],
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
