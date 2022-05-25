<template>
<div class="header bg-default">
  <div class="header-left">
    <label class="nav-opener" for="nav-toggle">
      <svg-icon name="menu" />
    </label>
    <input ref="navToggle" type="checkbox" id="nav-toggle" />
    <div class="nav-container">
      <div class="nav-list">
        <label class="nav-closer" for="nav-toggle">
          <svg-icon name="close" />
        </label>
        <div v-for="item in navItems" :key="item.name" :class="{'nav-item': true, 'primary': item.primary}">
          <a v-if="isExternal(item.path, item.type)" @click="disableMenu()" :href="item.path">
            {{ item.name }}
          </a>
          <nuxt-link @click.native="disableMenu()" v-else :to="item.path">
            {{ item.name }}
          </nuxt-link>
        </div>
        <label class="nav-desktop" for="nav-toggle">
          More
        </label>
      </div>
    </div>
  </div>
  <div class="header-right">
    <nuxt-link to="/">
      Daan Henke
    </nuxt-link>
  </div>
</div>
</template>

<style scoped>
.header { @apply flex justify-between md:w-2/3 md:self-center sticky top-0 px-8 py-8 items-center; }
.header-left { @apply flex; }
.header-right { @apply font-bold text-xl;
  background-image: var(--gradient-primary);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header > * { @apply items-center;
  font-family: 'Roboto';
}

.nav-container { @apply hidden md:flex; }
.nav-list { @apply flex; }
.nav-item {
  @apply md:pr-8;
}

.nav-item:not(.primary) { @apply hidden; }

#nav-toggle { @apply hidden; }
#nav-toggle:checked ~ .nav-container {
  @apply fixed top-0 left-0 right-0 bottom-0 flex z-20;
  background-color: var(--col-bg-default);
  height: 200vh;
}

#nav-toggle:checked ~ .nav-container > .nav-list { @apply flex flex-col px-8 py-8 w-full; }
#nav-toggle:checked ~ .nav-container > .nav-list > .nav-item {
  @apply mb-6 py-3 border-b-1 border-white font-extralight text-xl w-2/3 md:w-1/2;
  animation: fadeInDown .2s ease-in;
}

#nav-toggle:checked ~ .nav-container > .nav-list .icon { @apply flex; }
#nav-toggle:checked ~ .nav-container > .nav-list > .nav-item:not(.primary) { @apply flex; }
#nav-toggle:checked ~ .nav-container > .nav-list .nav-closer { @apply flex; }
#nav-toggle:checked ~ .nav-container > .nav-list .nav-desktop { @apply hidden; }

label { @apply cursor-pointer; }
.icon {
  @apply cursor-pointer;
  transform: scale(-1,1);
}

.nav-closer { @apply hidden mb-4; }
.nav-opener { @apply md:hidden; }
.nav-desktop { @apply hidden md:flex; }

.nuxt-link-exact-active {
  @apply font-semibold;
  color: var(--col-text-bright);
}
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
    },
    disableMenu() {
      this.$refs.navToggle.checked = false
      console.log(this.$refs)
    }
  },

  // Fetch header navigation data from content/site/nav.yml
  async fetch() {
    const response = await this.$content('site/nav').fetch()

    const navItems = []
    const navIterator = isPrimary => item =>
    {
      item.primary = isPrimary
      navItems.push(item)
    }
    response.header.primary.forEach(navIterator(true))
    response.header.secondary.forEach(navIterator(false))

    this.navItems = navItems
  }
}
</script>
