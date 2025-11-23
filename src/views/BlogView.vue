<template>
  <div class="container mx-auto p-3 md:p-8">
    <div class="flex flex-col-reverse md:flex-row relative">
      <div class="w-full md:w-2/3">
        <!-- Add button and modal for creating new blog posts -->
        <div class="flex gap-2 mb-6 md:px-20">
          <button 
            @click="showAddModal = true"
            class="px-4 py-2 bg-amber-200 text-black rounded-lg font-semibold hover:bg-amber-300 transition"
          >
            + Thêm bài viết
          </button>
        </div>

        <!-- Add Data Modal -->
        <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div class="bg-[#1e1e1f] rounded-xl p-6 max-w-md w-full border border-[#383838]">
            <h2 class="text-xl font-bold text-amber-200 mb-4">Thêm bài viết mới</h2>
            
            <div class="flex flex-col gap-4">
              <input 
                v-model="newArticle.title"
                type="text"
                placeholder="Tiêu đề"
                class="bg-[#282828] text-white p-2 rounded-lg border border-[#383838] focus:outline-none focus:border-amber-200"
              />
              
              <textarea 
                v-model="newArticle.desc"
                placeholder="Mô tả"
                class="bg-[#282828] text-white p-2 rounded-lg border border-[#383838] focus:outline-none focus:border-amber-200 h-24"
              />
              
              <input 
                v-model="newArticle.date"
                type="text"
                placeholder="Ngày (VD: 20 Dec 2024)"
                class="bg-[#282828] text-white p-2 rounded-lg border border-[#383838] focus:outline-none focus:border-amber-200"
              />
              
              <input 
                v-model="newArticle.image"
                type="text"
                placeholder="URL ảnh"
                class="bg-[#282828] text-white p-2 rounded-lg border border-[#383838] focus:outline-none focus:border-amber-200"
              />
              
              <input 
                v-model="newArticle.slug"
                type="text"
                placeholder="Slug (VD: flutter-basics)"
                class="bg-[#282828] text-white p-2 rounded-lg border border-[#383838] focus:outline-none focus:border-amber-200"
              />

              <textarea 
                v-model="newArticle.content"
                placeholder="Nội dung bài viết"
                class="bg-[#282828] text-white p-2 rounded-lg border border-[#383838] focus:outline-none focus:border-amber-200 h-32"
              />
            </div>

            <div class="flex gap-2 mt-6">
              <button 
                @click="addArticle"
                class="flex-1 px-4 py-2 bg-amber-200 text-black rounded-lg font-semibold hover:bg-amber-300 transition"
              >
                Thêm
              </button>
              <button 
                @click="showAddModal = false"
                class="flex-1 px-4 py-2 bg-[#282828] text-white rounded-lg border border-[#383838] hover:bg-[#383838] transition"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:px-20 fade-zoom-up">
          <article v-for="article in articles" :key="article.id">
            <router-link :to="`/read/${article.slug}/${article.id}`" class="flex w-full bg-[#1e1e1f] border-[#383838] rounded-xl text-left text-white p-5 md:py-7 md:px-8 cursor-pointer hover:bg-[#282828] items-center">
              <div class="w-full pr-4">
                <div class="text-xs mb-1 text-slate-400 flex items-center italic">
                  <div class="h-[1px] w-20 bg-amber-200 md:w-5 aos-init aos-animate mr-2"></div> {{ article.date }}
                </div>
                <h1 class="text-sm md:text-md text-amber-200 font-bold mb-2 paraf">{{ article.title }}</h1>
                <div class="text-sm hidden md:block paraf">{{ article.desc }}</div>
              </div>
              <div>
                <div class="w-20 h-20 md:w-28 flex items-center md:h-28">
                  <img :src="article.image" class="rounded-lg md:rounded-xl" alt="">
                </div>
              </div>
            </router-link>
          </article>
        </div>
      </div>
      <div class="w-full md:w-1/3 h-fit p-8 md:sticky md:top-24">
        <!-- Sidebar -->
        <div class="flex flex-col text-left">
          <div class="bg-clip-text bg-gradient-to-r from-slate-100 to-amber-300 text-transparent">Let's share experiences,
            stories, and knowledge together.
          </div>
          <div class="h-[1px] mt-7 mb-7 w-20 bg-amber-200 aos-init aos-animate mr-2"></div>
          <div class="hidden md:block">
            <div class="text-white text-md font-semibold">Topics</div>
            <div class="mt-3 flex flex-wrap gap-1">
              <span
                class="py-2 px-3 rounded-2xl bg-[#1e1e1f] hover:bg-white/20 text-white text-xs cursor-pointer">Flutter</span>
              <span
                class="py-2 px-3 rounded-2xl bg-[#1e1e1f] hover:bg-white/20 text-white text-xs cursor-pointer">Technology</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ArticleList />
</template>
  
<script>
import ArticleList from '@/components/ArticleList.vue';
import axios from "axios";
export default {
  data() {
    return {
      articles: [],
      showAddModal: false,
      newArticle: {
        title: '',
        desc: '',
        date: '',
        image: '',
        slug: '',
        content: ''
      }
    }
  },
  components: {
    ArticleList
  },
  mounted() {
    this.getArticles();
  },
  methods: {
    async getArticles() {
      axios.get('https://67c581a1351c081993fa42aa.mockapi.io/blog')
        .then(response => {
          this.articles = response.data;
        })
    },
    async addArticle() {
      if (!this.newArticle.title || !this.newArticle.desc) {
        alert('Vui lòng điền tiêu đề và mô tả');
        return;
      }

      try {
        const response = await axios.post('https://67c581a1351c081993fa42aa.mockapi.io/blog', {
          title: this.newArticle.title,
          desc: this.newArticle.desc,
          date: this.newArticle.date,
          image: this.newArticle.image,
          slug: this.newArticle.slug,
          content: this.newArticle.content
        });

        console.log('[v0] Article added:', response.data);
        
        // Reset form and close modal
        this.newArticle = {
          title: '',
          desc: '',
          date: '',
          image: '',
          slug: '',
          content: ''
        };
        this.showAddModal = false;

        // Reload articles
        this.getArticles();
        alert('Thêm bài viết thành công!');
      } catch (error) {
        console.error('[v0] Error adding article:', error);
        alert('Lỗi khi thêm bài viết: ' + error.message);
      }
    }
  }
}

</script>

<style scoped>
.paraf {
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media (min-width: 768px) { 
  .paraf {
    display: -webkit-box;
  }
}
@keyframes fadeZoomUp {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.fade-zoom-up {
  animation: fadeZoomUp 1s ease-in-out;
  /* animation-delay: 1000ms; */
}
</style>
