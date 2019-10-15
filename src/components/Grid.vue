<template>
  <div class='game-view-grid'>
    <div class='game-view-cell' v-bind:class="{ pending: pending }"
      v-for="(cell, i) in game" v-bind:key="i">
      <cell
        v-bind:id="i"
        v-bind:value="game[i]"
        v-on:clicked="makeMove($event)">
      </cell>
    </div>
 </div>
</template>

<script>
import { mapState } from 'vuex'
import Cell from './Cell.vue'

export default {
  components: {
    'cell': Cell
  },

  props: ['playerId', 'symbol'],

  data () {
    return {
      polling: null
    }
  },

  computed: {
    ...mapState({
      game: state => state.Default.game,
      pending: state => state.Default.pending
    })
  },

  watch: {
  // gameStatus () {
  // }
  },

  methods: {
    makeMove (event) {
      if (!this.pending) {
        console.log(`Propagating request makeMove(${event})`)
        this.$store.dispatch('makeMove', event)
      } else {
        console.log('Processing previous request; making new moves not possible')
      }
    },

    pollGameState () {
      this.polling = setInterval(() => {
        if (!this.pending) {
          this.$store.dispatch('fetchGame')
        }
      }, 1000)
    }
  },

  mounted () {
    console.log('Grid.vue mounted; starting polling Iroha')
    this.pollGameState()
  },

  beforeDestroy () {
    clearInterval(this.polling)
  }
}
</script>

<style>
.game-view-grid {
  height: 480px;
  display: flex;
  flex-wrap: wrap;
  padding: 25px;
  box-sizing: border-box;
}

.game-view-cell {
  width: 33.33%;
  height: 33.33%;

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  font-family: cursive;
  font-size: 64px;
  text-transform: uppercase;

  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
}

.game-view-cell.highlighted { color: green }

.game-view-cell.pending { color: #aaa }

.game-view-cell:hover { background-color: #eee }

.game-view-cell:nth-child(-n + 6) { border-bottom: 10px solid brown }

.game-view-cell:nth-child(3n + 1),
.game-view-cell:nth-child(3n + 2) { border-right: 10px solid brown }
</style>
