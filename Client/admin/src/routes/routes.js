import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
import Notifications from 'src/components/Dashboard/Views/Notifications.vue'
import Icons from 'src/components/Dashboard/Views/Icons.vue'
import Maps from 'src/components/Dashboard/Views/Maps.vue'
import Typography from 'src/components/Dashboard/Views/Typography.vue'
import TableList from 'src/components/Dashboard/Views/TableList.vue'

import Photos from 'src/components/Dashboard/Views/Photos/Photos.vue'
import AddSection from 'src/components/Dashboard/Views/Photos/AddSection.vue'
import EditSection from 'src/components/Dashboard/Views/Photos/EditSection.vue'

import News from 'src/components/Dashboard/Views/News/News.vue'
import AddNews from 'src/components/Dashboard/Views/News/AddNews.vue'
import EditNews from 'src/components/Dashboard/Views/News/EditNews.vue'

import ArticlePage from 'src/components/Dashboard/Views/ArticlePage.vue'
import Articles from 'src/components/Dashboard/Views/Articles/Articles.vue'
import AddArticle from 'src/components/Dashboard/Views/Articles/AddArticle.vue'
import EditArticle from 'src/components/Dashboard/Views/Articles/EditArticle.vue'

import MainPage from 'src/components/Dashboard/Views/MainPage/MainPage.vue'
import AddMainPage from 'src/components/Dashboard/Views/MainPage/AddMainPageSection.vue'
import EditMainPage from 'src/components/Dashboard/Views/MainPage/EditMainPageSection.vue'
import Contacts from 'src/components/Dashboard/Views/Contacts.vue'

import Calendar from 'src/components/Dashboard/Views/Calendar.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/main-page',
    children: [
      /* {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      }, */
      {
        path: 'main-page',
        name: 'Секції Головної сторінки',
        component: MainPage
      },
      {
        path: 'main-page/add-section',
        name: 'Додати секцію до Головної сторінки',
        component: AddMainPage
      },
      {
        path: 'main-page/edit-section',
        name: 'Редагувати секцію Головної сторінки',
        component: EditMainPage
      },
      {
        path: 'photos',
        name: 'Розділи Фотограцій',
        component: Photos
      },
      {
        path: 'photos/add-section',
        name: 'Додати розділ',
        component: AddSection
      },
      {
        path: 'photos/edit-section',
        name: 'Редагувати розділ',
        component: EditSection
      },
      {
        path: 'news',
        name: 'Новини',
        component: News
      },
      {
        path: 'news/add-news',
        name: 'Додати новину',
        component: AddNews
      },
      {
        path: 'news/edit-news',
        name: 'Редагувати новину',
        component: EditNews
      },
      {
        path: 'articles',
        name: 'Статті',
        component: Articles
      },
      {
        path: 'articles/add-article',
        name: 'Додати статтю',
        component: AddArticle
      },
      {
        path: 'articles/edit-article',
        name: 'рудагувати статтю',
        component: EditArticle
      },
      {
        path: 'article-page',
        name: 'Історія',
        component: ArticlePage
      },
      {
        path: 'contacts',
        name: 'Контакти',
        component: Contacts
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: Calendar
      }
      /* {
        path: 'notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: 'icons',
        name: 'icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'maps',
        component: Maps
      },
      {
        path: 'typography',
        name: 'typography',
        component: Typography
      },
      {
        path: 'table-list',
        name: 'table-list',
        component: TableList
      } */
    ]
  },
  {path: '*', component: NotFound}
]
/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
