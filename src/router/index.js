import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About' }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
    meta: { title: 'Portfolio' }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView.vue'),
    meta: { title: 'Blog', requiresAuth: true }
  },
  {
    path: '/read/:slug/:id',
    name: 'articleDetail',
    component: () => import('../views/ArticleView.vue'),
    meta: { title: 'Blog' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      next();
    } else {
      const password = prompt('Vui lòng nhập mật khẩu để truy cập trang này:');
      if (password === 'matkhaucuaban') {
        localStorage.setItem('isAuthenticated', true);
        next();
      } else {
        alert('Mật khẩu không đúng!');
        next({ name: "home" })
      }
    }
  } else {
    document.title = to.meta.title + ' - DinhHuyHihihi;'; // Mengambil judul dari meta atau mengatur judul default jika tidak ada
    next();
  }
});

export default router
