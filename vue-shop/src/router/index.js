import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'
import welcome from '@/components/wellcome'
import users from '@/components/users'
import Rights from '@/components/Rights'
import Roles from '@/components/Roles'
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path: '/home',
      name: 'home',
      component:home,
      redirect:'/welcome',
      children:[{
        path:'/welcome',
        name:'welcome',
        component:welcome
      },
      {
        path:'/users',
        name:'users',
        component:users
      },
      {
        path:'/Rights',
        name:'Rights',
        component:Rights
      },
      {
        path:'/Roles',
        name:'Roles',
        component:Roles
      },
        
      ]
    },
  ]
})

//路由守卫
router.beforeEach((to,from,next)=>{
  //to将要访问，from来自哪里,next执行下一个函数，放行
  if(to.path==='/login') return next()

  const token=window.sessionStorage.getItem('token')
    if(!token) return next('/login') 
    next()
  

})

export default router