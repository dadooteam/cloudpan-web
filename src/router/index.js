import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from 'components/Hello'
import User from 'components/User'
import Disk from 'components/Disk'
import Preview from 'components/Preview'
import SignIn from 'components/SignIn'
import Task from 'components/Task'

let router = new Router({
  routes: [
    {
      name: 'Hello',
      component: Hello,
      path: '/hello'
    },
    {
      name: 'Disk',
      component: Disk,
      path: '/disk',
      beforeEnter: (to, from, next) => {
        if (to.params['path'] === undefined) {
          to.params['path'] = ''
        }
        next()
      }
    },
    {
      name: 'Preview',
      component: Preview,
      path: '/preview'
    },
    {
      name: 'User',
      component: User,
      path: '/user'
    },
    {
      name: 'SignIn',
      component: SignIn,
      path: '/signin',
      beforeEnter: (to, from, next) => {
        if (localStorage['token']) {
          next('/user')
        } else {
          next()
        }
      }
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name !== 'SignIn') {
    if (!localStorage['token']) {
      next('/signin')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
