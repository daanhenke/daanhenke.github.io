<template>
  <div class="flexpoint">
    <div class="title fg-bright">
      {{ title }}
    </div>
    <div class="description">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.flexpoint { @apply pt-2; }
.title { @apply font-semibold text-lg; }
</style>

<script>
export default {
  props: {
    title: String,
    description: String
  }
}
</script>
