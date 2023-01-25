import { request } from '@/utils'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { orderBy } from 'lodash'
import { useMessageStore } from '@/store'

export const usePostStore = defineStore('post', {
  state: () =>
    reactive({
      posts: [],
      postCategories: [],
    }),
  getters: {
    getPosts() {
      return orderBy(this.posts, [item => item.createdTime], ['desc'])
    },
    showPostsWithCatNames() {
      return this.printCategoryNamesCommas(this.getPosts)
    },

    getLastXPosts: state => num => orderBy(state.posts, [item => item.createdTime], ['desc']).slice(0, num),
    getPostById: state => Id => state.posts.find(post => post._id === Id),
    getPostCategories() {
      return this.postCategories
    },
  },
  actions: {
    async init() {
      this.setPosts()
      this.setPostCategories()
    },
    async setPosts() {
      await request('get', 'admin/posts').then(res => {
        if (res?.data) {
          this.posts = [...res.data]
        }
      })
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

    async setPostCategories() {
      await request('get', 'admin/postcategories').then(res => {
        if (res?.data) {
          this.postCategories = [...res.data]
        }
      })
    },

    async updatePostCategory(payload) {
      const id = payload?._id

      if (id) {
        await request('put', `admin/postcategories/${id}`, {
          ...payload,
        })
          .then(res => {
            if (res?.isSuccess && res?.data) {
              this.setPostCategory(id, res.data)
            }
          })
          .catch(err => {
            useMessageStore().setError({ error: err.message })
          })
      } else {
        // we are creating a new post
        this.addPostCategory(payload)
      }
    },

    async addPostCategory(payload) {
      await request('post', `admin/postcategories`, {
        ...payload,
      })
        .then(res => {
          this.postCategories.push(res.data)
        })
        .catch(err => {
          useMessageStore().setError({ error: err.message })
        })
    },

    async updatePost(payload) {
      const id = payload?._id

      if (id) {
        // we are updating a post
        await request('put', `admin/posts/${id}`, {
          ...payload,
        })
          .then(res => {
            if (res?.isSuccess && res?.data) {
              const data = res.data

              data.postCategories = data.postCategories.map(item => {
                return this.getPostCategoryById(item)
              })

              this.setPost(id, data)
            }
          })

          .catch(err => {
            useMessageStore().setError({ error: err.message })
          })
      } else {
        // we are creating a new post
        this.addPost(payload)
      }
    },

    async addPost(payload) {
      await postFormData(`admin/posts`, payload).then(res => {
        if (res?.data) {
          const { data } = res

          data.postCategories = data.postCategories.map(item => {
            return this.getPostCategoryById(item)
          })

          this.posts.push(res.data)
        }
      })
    },

    setPost(id, data) {
      const index = this.posts.findIndex(p => p._id === id)

      this.posts[index] = Object.assign(this.posts[index], data)
    },
    getPostByIdCategoryId(Id) {
      const found = this.posts.find(p => p._id === Id)
      const post = { ...found }

      if (Object.keys(post).length === 0) {
        return {
          hit: 0,
          image: false,
          title: 'test title',
          url: 'test url',
          postCategories: ['638a63e9e128b806a49e8caa', '638a63e8e128b806a49e8ca6'],
          description: 'test description',
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
    },

    setPostCategory(id, data) {
      const index = this.postCategories.findIndex(p => p._id === id)

      this.posts[index] = Object.assign(this.postCategories[index], data)
    },
  },
})
