<template>
  <div id="game-view-info">
    {{ statusMsg }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['initial'],

  computed: {
    ...mapState({
      statusMsg: state => state.Default.statusMsg
    })
  },

  methods: {
    setText (text) {
      this.text = text
      console.log('setText method called')
    }
  },

  created () {
    console.log('Info.vue created')
  }
}
</script>

<style>
#game-view-info {
  padding: 15px;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background-color: #eee;
}
</style>
