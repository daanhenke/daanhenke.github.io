<template>
  <div class="section">
    <div class="name">
      {{ name }}
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  }
}
</script>

<style scoped>
.section { @apply flex flex-col md:flex-row my-10 w-full relative md:min-h-24; }
.section .name { @apply min-w-1/2 md:min-w-0 md:text-center md:absolute md:top-0 md:bottom-0 md:transform md:rotate-180 md:write-vertical-right border-b-1 md:border-b-0 md:border-l-1 text-lg font-semibold self-start;
  right: 100%;
  border-color: var(--col-fg-default);
}
.section .content { @apply px-8 flex flex-col }
</style>
