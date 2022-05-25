<template>
  <div class="page">
    <div class="title fg-bright">
      {{ post.title }}
    </div>
    <nuxt-content :document="post" />
  </div>
</template>

<style scoped>
.title { @apply font-bold text-3xl pb-8; }
</style>

<script>
export default {
  data() {
    return {
      post: {
        title: ''
      }
    }
  },

  async fetch() {
    const slug = this.$route.params.slug
    const response = await this.$content(`blog/${slug}`).fetch()
    this.post = response
  }
}
</script>
