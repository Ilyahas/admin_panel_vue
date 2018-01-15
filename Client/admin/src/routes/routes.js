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

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/stats',
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: Overview
      },
      {
        path: 'stats',
        name: 'stats',
        component: UserProfile
      },
      {
        path: 'photos',
        name: 'Photo Sections',
        component: Photos
      },
      {
        path: 'photos/add-section',
        name: 'Add Section',
        component: AddSection
      },
      {
        path: 'photos/edit-section',
        name: 'Edit Section',
        component: EditSection
      },
      {
        path: 'news',
        name: 'News',
        component: News
      },
      {
        path: 'news/add-news',
        name: 'Add News',
        component: AddNews
      },
      {
        path: 'news/edit-news',
        name: 'Edit News',
        component: EditNews
      },
      {
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
      }
    ]
  },
  { path: '*', component: NotFound }
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
