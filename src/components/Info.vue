<template>
  <div id="game-view-info">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ['initial'],
  data () {
    return {
      text: this.initial
    }
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
