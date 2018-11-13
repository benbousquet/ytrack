<template>
  <v-app >
    <div class="app">
      <v-content>
        <router-view/>
      </v-content>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>

<style>
.app {
  background-image: linear-gradient(to right top, #0066ff, #00a1ff, #00c6dc, #71e0b4, #e1f2bc);
  height: 100%;
}
</style>
