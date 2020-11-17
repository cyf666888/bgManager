import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 导入vuex状态层仓库store
import Store from '../store'

// 封装一个函数用于判断是否有相应地url地址
function hasUrl(url){
  return Store.state.userInfo.menus_url.some(item=>item==url);
}

export let indexRouter = [
  {
    path: '/menu',
    component: ()=>import('../views/menu/menu'),
    name: '菜单管理',
    beforeEnter(to,from,next){
      hasUrl('/menu') ? next():next('/home');
    }
  },
  {
    path: '/role',
    component: ()=>import('../views/role/role'),
    name: '角色管理',
    beforeEnter(to,from,next){
      hasUrl('/role') ? next():next('/home');
    }
  },
  {
    path: '/manager',
    component: ()=>import('../views/manager/manager'),
    name: '管理员管理',
    beforeEnter(to,from,next){
      hasUrl('/manager') ? next():next('/home');
    }
  },
  {
    path: '/cate',
    component: ()=>import('../views/cate/cate'),
    name: '商品分类',
    beforeEnter(to,from,next){
      hasUrl('/cate') ? next():next('/home');
    }
  },
  {
    path: '/specs',
    component: ()=>import('../views/specs/specs'),
    name: '商品规格',
    beforeEnter(to,from,next){
      hasUrl('/specs') ? next():next('/home');
    }
  },
  {
    path: '/goods',
    component: ()=>import('../views/goods/goods'),
    name: '商品管理',
    beforeEnter(to,from,next){
      hasUrl('/goods') ? next():next('/home');
    }
  },
  {
    path: '/member',
    component: ()=>import('../views/member/member'),
    name: '会员管理',
    beforeEnter(to,from,next){
      hasUrl('/member') ? next():next('/home');
    }
  },
  {
    path: '/banner',
    component: ()=>import('../views/banner/banner'),
    name: '轮播图管理',
    beforeEnter(to,from,next){
      hasUrl('/banner') ? next():next('/home');
    }
  },
  {
    path: '/seck',
    component: ()=>import('../views/seck/seck'),
    name: '秒杀活动',
    beforeEnter(to,from,next){
      hasUrl('/seck') ? next():next('/home');
    }
  },
]

const router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login')
    },
    {
      path: '/index',
      component: () => import('../pages/index'),
      children:[
        {
          path: '/home',
          component: ()=>import('../views/home')
        },
        ...indexRouter,
        {
          path: '',
          redirect: '/menu'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});

// 全局导航守卫---登陆拦截

router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next();
    return;
  }
  if(sessionStorage.getItem('userInfo')){
    next();
    return
  }
  next('/login')
})




//  导出
export default router;
