<template>
<div class="page">
  <div class="welcome-section">
    <div class="welcome-text">
      <h1 class="fg-bright">Daan Henke</h1>
      <div class="fg-bright">Programmer, reverse engineer, x86_64 assembler, linux enjoyer</div>
    </div>
    <div class="welcome-image"></div>
  </div>

  <layout-section name="Details">
    <div v-for="detail, key in details" :key="key" class="detail">
      {{ capitalize(key) }}: {{ detail }}
    </div>
  </layout-section>

  <layout-section name="Bio">
    <div class="bio-container">
      <nuxt-content :document="bio" />
    </div>
  </layout-section>

  <layout-section name="Recent Projects">
    <layout-flexpoint v-for="item in projects" :key="item.title" :title="item.title" :description="item.description" />
  </layout-section>

  <layout-section name="Experience">
    <layout-flexpoint v-for="item in experience" :key="item.title" :title="item.title" :description="item.description" />
  </layout-section>

  <layout-section name="Skills">
    <layout-flexpoint v-for="item in skills" :key="item.title" :title="item.title" :description="item.description" />
  </layout-section>

  <layout-section name="Contributions">
    <layout-flexpoint v-for="item in contributions" :key="item.title" :title="item.title" :description="item.description" />
  </layout-section>
</div>
</template>

<style>
.page { @apply flex flex-col; }
.welcome-section { @apply flex justify-between; }
.welcome-text { @apply flex flex-col w-3/4; }
.welcome-text h1 { @apply text-4xl font-bold;}
.welcome-text div { @apply pt-2 sm:pt-6;}

.bio-container { @apply pt-2; }

.welcome-image {
  @apply w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full bg-cover;
  background-image: url(https://picsum.photos/200);
}
</style>

<script>
import { titleHead } from '~/lib/nuxt-utils'

export default {
  head: titleHead('Home'),

  data() {
    return {
      experience: [],
      skills: [],
      projects: [],
      contributions: [],
      details: [],
      bio: '',
    }
  },

  methods: {
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.substr(1)
    }
  },

  async fetch()
  {
    const response = await this.$content('site/resume').fetch()
    this.experience = response.experience
    this.skills = response.skills
    this.projects = response.projects
    this.contributions = response.contributions
    this.details = response.details

    const bioResponse = await this.$content('site/bio').fetch()
    this.bio = bioResponse
  }
}
</script>
