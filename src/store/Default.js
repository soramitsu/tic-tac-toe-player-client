import _ from 'lodash'
import irohaApi from '../api/iroha'

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 7],
  [2, 4, 6]
]

const types = _([
  'INIT',
  'MAKE_MOVE',
  'CLAIM_REWARD',
  'FETCH_GAME',
  'GET_WINNER'
]).chain()
  .flatMap(x => [x + '_REQUEST', x + '_SUCCESS', x + '_FAILURE'])
  .concat(['RESET'])
  .map(x => [x, x])
  .fromPairs()
  .value()

function initialState () {
  return {
    accountId: '',
    gameId: '',
    isInited: false,
    game: [],
    gameState: 0, // 0 - not started, 1 - in progress, 2 - you win, 3 - opponent wins, 4 - draw, 5 -error querying status
    isRewardClaimApproved: false,
    pending: false,
    error: '',
    statusMsg: '',
    symbol: 'X'
  }
}

const state = initialState()

const getters = {
  getGameId: (state) => state.gameId,
  getAccountId: (state) => state.accountId,
  getGame: (state) => state.game,
  getGameState: (state) => state.gameState,
  getIsRewardClaimApproved: (state) => state.isRewardClaimApproved,
  getIsInited: (state) => state.isInited,
  getPending: (state) => state.pending,
  getSymbol: (state) => state.symbol,
  getError: (state) => state.error,
  getStatusMessage: (state) => state.statusMsg
}

function handleError (state, err) {
  console.error(err)
  state.error = err
}

function updateGameState (state, gameState) {
  state.game = gameState.split(',')
  let asNumbers = state.game.map(x => {
    if (x === state.symbol) {
      return 1
    }
    if (x === '-') {
      return 0
    } else {
      return -1
    }
  })
  let sums = winningCombinations.map(x => asNumbers[x[0]] + asNumbers[x[1]] + asNumbers[x[2]])

  let maxCombination = Math.max(...sums)
  let minCombination = Math.min(...sums)
  if (maxCombination === 3) {
    // you won
    state.gameStatus = 2
    state.statusMsg = 'You won!!!'
  } else if (minCombination === -3) {
    // opponent won
    state.gameStatus = 3
    state.statusMsg = 'Your opponent won'
  } else if (asNumbers.reduce((s, v) => s + Math.abs(v), 0) === 9) {
    // no more moves possible, hence draw
    state.gameStatus = 4
    state.statusMsg = 'Draw'
  } else {
    // continue
    state.gameStatus = 1
    state.statusMsg = 'Game in progress'
  }
}

const mutations = {
  [types.RESET] (state, payload) {
    const s = initialState()

    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  },

  [types.INIT_REQUEST] (state, payload) {
    state.error = ''
  },

  [types.INIT_SUCCESS] (state, payload) {
    state.isInited = true
    state.gameState = 1
    state.game = ['-', '-', '-', '-', '-', '-', '-', '-', '-']
    state.symbol = payload[state.accountId]['symbol']
    state.statusMsg = 'Game in progress'
  },

  [types.INIT_FAILURE] (state, payload) {
    handleError(state, payload)
  },

  [types.MAKE_MOVE_REQUEST] (state, payload) {
    state.error = ''
    state.pending = true
  },

  [types.MAKE_MOVE_SUCCESS] (state, payload) {
  },

  [types.MAKE_MOVE_FAILURE] (state, payload) {
    state.pending = false
    handleError(state, payload)
  },

  [types.FETCH_GAME_REQUEST] (state, payload) {
    state.error = ''
  },

  [types.FETCH_GAME_SUCCESS] (state, payload) {
    updateGameState(state, payload[state.gameId]['state'])
    if (state.gameState === 1) {
      state.pending = false
    }
  },

  [types.FETCH_GAME_FAILURE] (state, payload) {
    handleError(state, payload)
    state.gameState = 5
    state.pending = false
  },

  [types.CLAIM_REWARD_REQUEST] (state, payload) {
    state.error = ''
    state.pending = true
  },

  [types.CLAIM_REWARD_SUCCESS] (state, payload) {
    state.isRewardClaimApproved = true
    state.gameState = 2
  },

  [types.CLAIM_REWARD_FAILURE] (state, payload) {
    handleError(state, payload)
    state.pending = false
  }
}

const actions = {
  init ({ commit }, { accountId, privateKey, gameId }) {
    commit(types.INIT_REQUEST, gameId)

    state.accountId = accountId
    state.privateKey = privateKey
    state.gameId = gameId
    console.log('Starting game')
    console.log(`accountId: ${accountId}`)
    console.log(`gameId: ${gameId}`)
    console.log(`privateKey: ${privateKey}`)
    console.log('Fetching symbol...')
    return irohaApi.getAccountDetail(privateKey, accountId, {
      accountId: accountId,
      key: 'symbol'
    })
      .then(response => {
        console.log(`response: ${response}`)
        commit(types.INIT_SUCCESS, response)
      })
      .catch(err => {
        commit(types.INIT_FAILURE, err)
      })
  },

  makeMove ({ dispatch, commit, state }, position) {
    if (state.gameState !== 1 || state.game[position] !== '-') {
      return
    }

    commit(types.MAKE_MOVE_REQUEST, position)
    let newState = state.game
    newState[position] = state.symbol
    let params = {
      accountId: state.gameId,
      key: 'state',
      value: newState.join(',')
    }
    console.log(`new state propagated: ${newState}`)

    return irohaApi.setAccountDetail([state.privateKey], state.gameId, 2, params)
      .then(() => {
        return dispatch('fetchGame')
      })
      .then(() => {
        commit(types.MAKE_MOVE_SUCCESS)
      })
      .catch(err => {
        commit(types.MAKE_MOVE_FAILURE, err)
      })
  },

  fetchGame ({ commit }) {
    commit(types.FETCH_GAME_REQUEST, '')

    return irohaApi.getAccountDetail(state.privateKey, state.gameId, {
      accountId: state.gameId,
      key: 'state'
    })
      .then(response => {
        console.log(`fetchGame response: ${response}`)
        commit(types.FETCH_GAME_SUCCESS, response)
      })
      .catch(err => {
        commit(types.FETCH_GAME_FAILURE, err)
      })
  },

  claimReward ({ commit, state }) {
    if (state.isRewardClaimApproved) {
      return
    }

    commit(types.CLAIM_REWARD_REQUEST, {})

    return irohaApi.claimReward()
      .then(() => {
        commit(types.CLAIM_REWARD_SUCCESS, {})
      })
      .catch(err => {
        commit(types.CLAIM_REWARD_FAILURE, err)
      })
  }
}

export default {
  types,
  state,
  getters,
  mutations,
  actions
}
