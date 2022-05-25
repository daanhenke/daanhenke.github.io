<template>
<div class="layout">
  <div class="header-container">
    <layout-header />
  </div>
  <div class="content">
    <Nuxt />
  </div>
  <layout-footer />
</div>
</template>

<style scoped>
.header-container { @apply z-10 flex flex-col; }
.content { @apply w-full md:w-2/3 self-center px-8 z-0; }
</style>
