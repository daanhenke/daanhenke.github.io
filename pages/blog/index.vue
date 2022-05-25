<template>
  <div class="page">
    <div class="title fg-bright">
      Blog
    </div>

    <div class="flavour-text">
      This is my personal blog, more articles soon ™
    </div>

    <div class="posts">
      <div v-for="post in posts" :key="post.path" class="post">
        <nuxt-link :to="post.path">
          <div class="post-title fg-bright">
            {{ post.title }}
          </div>
          <div class="post-description">
            {{ post.description }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title { @apply font-bold text-4xl; }
.flavour-text { @apply pt-6; }
.posts { @apply pt-8; }

.post-title { @apply font-semibold text-2xl pb-4; }
.post-description { @apply pl-4; }
</style>

<script>
export default {
  data() {
    return {
      posts: []
    }
  },

  async fetch()
  {
    this.posts = await this.$content('blog').fetch()
  }
}
</script>
