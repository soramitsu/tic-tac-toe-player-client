<template>
<div id="signin-wrapper">
  <div class="sign-in-text">Sign In to join the game</div>
  <el-form class="game-signin-form" ref="signinForm" :model="form" :rules="rules" label-position="top">
    <el-form-item label="Account ID:" prop="accountId">
      <el-input name="accountId" class="signin-input-field" v-model="form.accountId"></el-input>
    </el-form-item>

    <el-form-item label="Private key:" prop="privateKey">
      <el-input v-model="form.privateKey" :disabled="isLoading"></el-input>
    </el-form-item>

    <el-form-item label="Game ID:" prop="gameId">
      <el-input name="gameId" v-model="form.gameId" :disabled="isLoading"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        class="signin-form-submit-button"
        type="primary"
        plain
        @click="onSubmit"
        :disabled="isLoading"
      >
        SIGN IN
      </el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      isMounted: false,
      isLoading: false,
      form: {
        accountId: '',
        privateKey: '',
        gameId: ''
      },
      rules: {
        accountId: [
          { required: true, message: 'Enter your account ID', trigger: 'change' },
          { pattern: /^[a-z_0-9]{1,32}@[a-z_0-9]{1,9}$/, message: 'Account ID should match [a-Z0-9]{1,32}@[a-Z0-9]{1,12}', trigger: 'change' }
        ],
        privateKey: [
          { required: true, message: 'Enter private key', trigger: 'change' },
          { pattern: /^[A-Za-z0-9]{64}$/, message: 'Private key should match [A-Za-z0-9]{64}', trigger: 'change' }
        ],
        gameId: [
          { required: true, message: 'Enter game ID', trigger: 'change' },
          { pattern: /^[a-z_0-9]{1,32}@[a-z_0-9]{1,9}$/, message: 'Game ID is an Iroha account and should match [a-Z0-9]{1,32}@[a-Z0-9]{1,12}', trigger: 'change' }
        ]
      }
    }
  },

  methods: {
    ...mapActions([
      'init'
    ]),

    onSubmit () {
      this.$refs['signinForm'].validate((valid) => {
        console.log(`Form valid = ${valid}`)
        if (valid) {
          this.isLoading = true
          this.init({
            accountId: this.form.accountId,
            privateKey: this.form.privateKey,
            gameId: this.form.gameId
          })
            .then(res => {
              this.isLoading = false
            })
            .catch(err => {
              console.error(err)
              this.isLoading = false
            })
        }
      })
    }
  },

  mounted () {
    console.log('Signin.vue mounted')
    this.isMounted = true
  }
}
</script>

<style scoped>
.game-signing-form {
  display: table;
  box-sizing: border-box;
  margin: 30px auto;
  justify-content: center;
}

.game-signin-form-item {
  display: flex;
  justify-content: space-evenly;
  font-family: sans-serif;
  font-size: 18px;
}

.signin-form-submit-button {
  margin: auto;
  width: 100%;
}

.signin-input-field {
  min-width: 530px;
}

.sign-in-text {
  padding: 100px;
  font-family: sans-serif;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}
</style>
