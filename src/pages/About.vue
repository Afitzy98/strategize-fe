<template>
  <div
    class="bg-blue text-white text-center q-pa-md flex flex-center container"
  >
    <div>
      <div style="font-size: 30vh">
        About
      </div>

      <div class="text-h2" style="opacity:.4">
        This page is still in development.
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageAbout'
}
</script>
<style lang="scss">
.container {
  min-height: 100vh;
}
</style>
