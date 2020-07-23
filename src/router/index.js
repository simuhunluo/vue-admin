import Vue from 'vue'
import Router from 'vue-router'
import Template from '@/components/pages/Template'
import ElementTable from '@/components/pages/ElementTable'
import DetailInfo from '@/components/pages/DetailInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Template
    },
    {
      path: '/dashboard',
      name: '仪表盘',
      component: ElementTable,
    },
    {
      path: '/logdir',
      name: '日志目录',
      component: Template,
    },
    {
      path: '/logprocess',
      name: '日志处理',
      component: DetailInfo,
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
