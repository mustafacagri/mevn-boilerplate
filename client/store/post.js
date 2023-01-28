import { request } from '~~/utils/request'
import { orderBy } from 'lodash'

export const usePostStore = defineStore('post', {
  state: () => {
    return {
      posts: [],
      postCategories: [],
      defaultImage:
        'https://images.unsplash.com/photo-1671726805768-93b4c260766b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    }
  },
  getters: {
    getPosts() {
      return orderBy(this.posts, [item => item.createdTime], ['desc'])
    },
    showPostsWithCatNames() {
      return this.printCategoryNamesCommas(this.getPosts)
    },

    getLastXPosts: state => num => orderBy(state.posts, [item => item.createdTime], ['desc']).slice(0, num),
    getPostsByCategoryId: state => Id =>
      orderBy(
        state.posts.filter(post => post.postCategories.some(cat => cat._id === Id)),
        [item => item.createdTime],
        ['desc']
      ),
    getPostById: state => Id => state.posts.find(post => post._id === Id),
    getPostByURL: state => url => state.posts.find(post => post.url === url),
    getPostCategories() {
      return this.postCategories
    }
  },
  actions: {
    async init() {
      this.fetchPosts()
      this.fetchPostCategories()
    },

    async fetchPosts() {
      await request('get', 'posts').then(res => {
        this.setData('posts', res)
      })
    },

    async fetchPostCategories() {
      await request('get', 'postcategories').then(res => {
        this.setData('postCategories', res)
      })
    },

    async setData(field, payload) {
      this[field] = await payload
    },

    printCategoryNamesCommasByCatId(data) {
      const categories = data.map(item => item.name)
      return categories.join(', ')
    },

    printCategoryNamesCommas(data) {
      return data.map(item => {
        if (item?.postCategories.length > 0) {
          item.categories = item.postCategories.map(cat => cat.name).join(', ')
        }

        return item
      })
    },

    getPostsWithCatNamesByCatId(catId) {
      const posts = this.getPosts.filter(post => post.postCategories.some(c => c._id === catId))

      return this.printCategoryNamesCommas(posts)
    },

    getPostByIdCategoryId(Id) {
      const found = this.posts.find(p => p._id === Id)
      const post = { ...found }

      if (Object.keys(post).length === 0) {
        return {
          hit: 0
        } // if we can not find any post with this Id, return an empty object
      } else {
        if (post.postCategories && Array.isArray(post.postCategories)) {
          post.postCategories = post.postCategories.map(category => category._id)
        }

        return post
      }
    },
    getPostCategoryById(catId) {
      return this.postCategories.find(cat => cat._id === catId)
    }
  }
})
