import Vue from 'vue'
import Router from 'vue-router'
import Template from '@/components/pages/Template'
import Index from '@/components/pages/index'
import Dashboard from '@/components/pages/dashboard'
import LogDir from '@/components/pages/logdir'
import ElementTable from '@/components/pages/ElementTable'
import DetailInfo from '@/components/pages/DetailInfo'
import LogLevel from '@/components/pages/loglevel'
import Test from '@/components/pages/test'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/dashboard',
      name: '仪表盘',
      component: Dashboard,
    },
    {
      path: '/logdir',
      name: '日志目录',
      component: LogDir,
    },
    {
      path: '/loglevel',
      name: '日志级别',
      component: LogLevel,
    },
    {
      path: '/test',
      name: '测试',
      component: Test,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
