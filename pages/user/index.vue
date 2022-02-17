<template>
  <v-container>User Dashboard</v-container>
</template>

<script>
export default {
  layout: 'default',
  middleware: ['admin', 'user'],
}
</script>

<style></style>
