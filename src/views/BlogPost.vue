<template>
    <v-container>
        <div v-if="loading" class="d-flex justify-center align-center">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </div>
        <div v-if="post">
            <v-row class="d-flex justify-center">
                <v-col class="arrow d-flex align-center justify-end">
                  <v-btn :to="`/posts/${prevId}`" icon fab text>
                    <v-icon class="arrow-icon">mdi-arrow-left-bold-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-col lg="6" md="8" sm="10" cols="12">
                    <v-card>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title class="body-1">
                                    {{ post.title }} #{{post.id}}
                                </v-list-item-title>
                                <v-card-text>
                                    {{ post.body }}
                                </v-card-text>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-actions class="d-flex justify-end">
                            <v-tooltip right>
                                <template #activator="{ on }">
                                    <v-btn icon fab text class="ma-2 red--text" v-on="on" @click="removePost">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <span>delete post</span>
                            </v-tooltip>
                        </v-card-actions>
                        <v-expansion-panels flat v-model="panel" multiple>
                            <v-expansion-panel>
                                <v-expansion-panel-header>Comments</v-expansion-panel-header>
                                <v-expansion-panel-content v-if="!commentsLoading">
                                    <v-card v-for="(comment, index) in comments" :key="comment.id" class="my-2" flat>
                                        <v-list-item>
                                          <v-list-item-content>
                                              <v-list-item-title class="body-1">
                                                  {{ comment.name }} #{{comment.id}}
                                              </v-list-item-title>
                                              <v-list-item-subtitle>
                                                  {{ comment.email }}
                                              </v-list-item-subtitle>
                                              <v-card-text>
                                                  {{ comment.body }}
                                              </v-card-text>
                                          </v-list-item-content>
                                      </v-list-item>
                                      <v-card-actions class="d-flex justify-end">
                                        <v-icon text :color="showLikes(index)" @click="checkLikes(index)">mdi-heart</v-icon>
                                        <v-icon color="blue">mdi-share</v-icon>
                                      </v-card-actions>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card>
                </v-col>
                <v-col class="arrow d-flex align-space-between justify-start flex-column">
                  <v-col>
                    <v-btn text to="/posts">
                    <span class="caption">back to all posts</span>
                    <v-icon small right>mdi-arrow-left</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn :to="`/posts/${nextId}`" icon fab text>
                    <v-icon class="arrow-icon">mdi-arrow-right-bold-outline</v-icon>
                  </v-btn>
                  </v-col>
                  <v-col />
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { ServiceFactory } from '@/services/ServiceFactory'

export default {
  name: 'BlogPost',
  data: () => ({
    id: 0,
    post: null,
    panel: [0],
    comments: null,
    commentsLoading: true,
    loading: true,
    likes: [],
    fetchComments: ServiceFactory.get('comments')
  }),
  computed: {
    ...mapState('posts', { posts: state => state.posts }),
    prevId: function () {
      if (this.id === 1) return 100
      return this.id - 1
    },
    nextId: function () {
      if (this.id === 100) return 1
      return this.id + 1
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function (to, from) {
        this.getPost()
      }
    }
  },
  methods: {
    ...mapActions('posts', { remove: 'removePostFromId' }),
    removePost: function () {
      this.remove(this.post.id)
      this.$router.go(-1)
    },
    showLikes: function (index) {
      if (this.likes[index].liked) return 'red'
      return 'grey'
    },
    checkLikes: function (index) {
      this.likes[index].liked = !this.likes[index].liked
    },
    getPost: function () {
      this.id = Number(this.$route.params.id)
      this.waitUntilLoaded()
        .then(() => {
          this.post = this.posts.find(post => post.id === this.id)
        })
        .then(() => {
          this.fetchComments(this.id)
            .then(res => (this.comments = res.data))
            .then(() => {
              const length = Object.keys(this.comments).length
              this.likes = new Array(length).fill().map(item => {
                item = {
                  liked: false
                }
                return item
              })
            })
            .then(() => (this.commentsLoading = false))
        })
        .catch(error => console.warn(error))
        .finally(() => {
          this.loading = false
        })
    },
    waitUntilLoaded: function () {
      return new Promise((resolve, reject) => {
        const wait = () => {
          setTimeout(() => {
            if (!this.posts) {
              wait()
            } else {
              resolve()
            }
          })
        }
        wait()
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.arrow
  height: 287px
.arrow-icon:hover
  color: lightBlue
  transform: scale(1.5)
</style>
