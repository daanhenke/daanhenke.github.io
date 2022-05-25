<template>
<div class="footer">
  <div v-for="item in navItems" :key="item.name" class="nav-item">
     <a v-if="isExternal(item.path, item.type)" :href="item.path">
        {{ item.name }}
      </a>
      <nuxt-link v-else :to="item.path">
        {{ item.name }}
      </nuxt-link>
  </div>
</div>
</template>

<style scoped>
.footer {
  @apply border-t-1 mt-16 pt-6 px-6 flex flex-col md:flex-row flex-wrap w-9/10 md:w-2/3 self-center items-center;
  border-color: var(--col-text-default);
}

.nav-item { @apply pb-4 w-1/3 text-center; }
</style>

<script>
export default {
  data() {
    return {
      navItems: []
    }
  },

  methods: {
    isExternal(link, type) {
      return link.startsWith('https://') || type === 'external'
    }
  },

  // Fetch footer navigation data from content/site/nav.yml
  async fetch() {
    const response = await this.$content('site/nav').fetch()
    this.navItems = response.footer
  }
}
</script>
