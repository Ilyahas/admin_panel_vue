import Sidebar from './SideBar.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [
    /* {
      name: 'Dashboard',
      icon: 'ti-panel',
      path: '/overview'
    },
    {
      name: 'User Profile',
      icon: 'ti-user',
      path: '/stats'
    }, */
    {
      name: 'Головна',
      icon: 'ti-blackboard',
      path: '/main-page'
    },
    {
      name: 'Фотографії',
      icon: 'ti-instagram',
      path: '/photos'
    },
    {
      name: 'Новини',
      icon: 'ti-comment-alt',
      path: '/news'
    },
    {
      name: 'Статті',
      icon: 'ti-pencil',
      path: '/articles'
    },
    {
      name: 'Історія',
      icon: 'ti-pencil-alt',
      path: '/article-page'
    },
    {
      name: 'Контакти',
      icon: 'ti-email',
      path: '/contacts'
    }
    /* {
      name: 'Table List',
      icon: 'ti-view-list-alt',
      path: '/table-list'
    },
    {
      name: 'Typography',
      icon: 'ti-text',
      path: '/typography'
    },
    {
      name: 'Icons',
      icon: 'ti-pencil-alt2',
      path: '/icons'
    },
    {
      name: 'Maps',
      icon: 'ti-map',
      path: '/maps'
    },
    {
      name: 'Notifications',
      icon: 'ti-bell',
      path: '/notifications'
    } */
  ],
  displaySidebar (value) {
    this.showSidebar = value
  }
}

const SidebarPlugin = {

  install (Vue) {
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    })
    Vue.component('side-bar', Sidebar)
  }
}

export default SidebarPlugin
