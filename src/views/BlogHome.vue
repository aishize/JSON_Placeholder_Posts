<template>
    <v-container>
        <div v-if="loading" class="d-flex justify-center align-center">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </div>
        <div v-else>
            <v-row class="d-flex justify-center">
                <v-col lg="6" md="8" sm="10" cols="12">
                     <v-card class="ma-4" v-for="(post, index) in posts" :key="post.id">
                        <v-list-item>
                            <v-list-item-content>
                                <div class="overline mb-4">{{ post.id }}</div>
                                <v-list-item-title class="body-1 mb-1">{{ post.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-card-actions>
                            <v-row>
                                <v-col />
                                <v-col class="d-flex justify-end align-center">
                                    <v-btn class="ma-2" :to="`/posts/${post.id}`">detail</v-btn>
                                    <v-tooltip right>
                                        <template #activator="{ on }">
                                            <v-btn icon fab text class="ma-2 red--text" v-on="on" @click="removePost(index)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>delete post</span>
                                    </v-tooltip>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BlogHome',
  data: () => ({
    loading: false
  }),
  computed: {
    ...mapState('posts', {
      posts: state => state.posts
    })
  },
  created: function () {
    this.loading = true
    this.waitUntilLoaded()
      .then(() => (this.loading = false))
      .catch(err => console.warn(err))
  },
  methods: {
    ...mapActions('posts', { remove: 'removePost' }),
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
    },
    removePost: function (index) {
      this.remove(index)
    }
  }
}
</script>
<style>
</style>
