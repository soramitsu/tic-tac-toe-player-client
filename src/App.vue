<template>
<div id="app">
  <div id="board-wrapper" v-if="isInited">
    <info v-bind:initial="statusMsg"></info>
    <grid v-bind:player-id="1" v-bind:symbol="symbol"></grid>
  </div>
  <signin v-else></signin>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Info from './components/Info.vue'
import Grid from './components/Grid.vue'
import Signin from './components/Signin.vue'

export default {
  name: 'app',

  components: {
    'info': Info,
    'grid': Grid,
    'signin': Signin
  },

  // computed: mapState({
  //   signedIn: state => state.Default.getIsInited
  // }),

  computed: {
    ...mapState({
      isInited: state => state.Default.isInited,
      symbol: state => state.Default.symbol,
      statusMsg: state => state.Default.statusMsg
    })
  },

  watch: {
    isInited (value) {
      console.log(`Game started: ${value}`)
    }
  },

  methods: {
  }
}
</script>

<style>
#app {
  width: 720px;
  margin: 0 auto;
}

#board-wrapper {
  width: 480px;
  margin: 30px auto;
  border: 1px solid #000;
}
</style>
