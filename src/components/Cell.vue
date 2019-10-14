<template>
  <div class="game-view-cell-internal" v-on:click="clicked()">
    {{ val }}
  </div>
</template>

<script>

export default {
  props: ['id', 'value'],

  data () {
    return {
    }
  },

  computed: {
    val () {
      if (this.value === '-') {
        return ''
      }
      return this.value
    }
  },

  watch: {
  },

  methods: {
    clicked () {
      console.log(`clicked() method called`)
      this.$emit('clicked', this.id)
    }
  },

  created () {
    console.log('Cell.vue created')
  }
}
</script>

<style>
.game-view-cell-internal {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: cursive;
  font-size: 75px;
  text-transform: uppercase;

  cursor: pointer;
}

.game-view-cell-internal.highlighted { color: green }

.game-view-cell-internal.pending { color: #555 }

.game-view-cell-internal:hover { background-color: #eee }

</style>
