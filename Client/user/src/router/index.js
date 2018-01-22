import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from '../components/General/Layout/MainLayout.vue'
import Main from '../components/General/View/Main.vue'
import News from '../components/General/View/News.vue'
import ReadNews from '../components/General/View/ReadNews.vue'
import PhotoSections from '../components/General/View/PhotoSections.vue'
import Photos from '../components/General/View/Photos.vue'
import ArticlePage from '../components/General/View/ArticlePage.vue'
import Articles from '../components/General/View/Articles.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
          path: 'article',
          name: 'Article Page',
          component: ArticlePage
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
