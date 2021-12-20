<template>
  <div class="login-container">
    <form class="login-frame" v-if="type === 1">
      <header>用户登录</header>
      <div class="form-item">
        <label class="username-icon">用户名</label>
        <input v-model="loginForm.username" type="text" name="username" />
      </div>
      <div class="form-item">
        <label class="password-icon">密码</label>
        <input v-model="loginForm.password" type="password" name="password" @keyup="checkCapslock" />
      </div>
      <button class="login-btn" type="button" :disabled="loginLoading" @click="handleLogin">登录</button>
      <p>没有账号？<a @click="goRegister">去注册</a></p>
    </form>
    <!-- 注册 -->
    <form class="login-frame" v-else-if="type === 2">
      <header>用户注册</header>
      <div class="form-item">
        <label class="username-icon">用户名</label>
        <input v-model="registerForm.username" id="account" type="text" name="account" />
      </div>
      <div class="form-item">
        <label class="password-icon">密码</label>
        <input v-model="registerForm.password" type="password" name="password" />
      </div>
      <div class="form-item">
        <label class="password-icon">确认密码</label>
        <input v-model="registerForm.confirmPassword" type="password" name="password" @keyup="checkCapslock" />
      </div>
      <button class="login-btn" type="button" :disabled="loginLoading" @click="handleLogin">注册</button>
      <p>已有账号？<a @click="goLogin">去登录</a></p>
    </form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import $utils from '@/utils'
import store from '@/store'
import LoadingMixin from '@/mixins/LoadingMixin'
export default {
  name: 'Login',
  mixins: [LoadingMixin],
  data() {
    return {
      type: 1,
      loginLoading: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    // 清除登录信息
    if ($utils.getLocalStorage('loginToken')) {
      $utils.removeLocalStorage('loginToken')
    }
    next()
  },

  methods: {
    ...mapActions(['login']),
    // 登录验证
    loginValidate() {
      return new Promise((resolve, reject) => {
        if (this.loginForm.username === '' || this.loginForm.password === '') {
          reject('账号和密码不能为空')
        } else {
          resolve()
        }
      })
    },
    // 登录验证
    registerValidate() {
      return new Promise((resolve, reject) => {
        if (this.registerForm.username === '' || this.registerForm.password === '') {
          reject('账号和密码不能为空')
        } else if (this.registerForm.password !== this.registerForm.confirmPassword) {
          reject('两次密码不一致')
        } else {
          resolve()
        }
      })
    },

    // 点击登录按钮
    handleLogin() {
      if (this.loginLoading) return
      this.loginLoading = true
      this.loginValidate()
        .then(() => {
          this.openLoading()
          this.login({
            username: this.loginForm.username,
            password: this.loginForm.password
          })
            .then(() => {
              // store.dispatch('getInfo')
              this.loginLoading = false
              setTimeout(() => this.closeLoading(), 200)
              this.$router.push('/') // 注册完直接登录
            })
            .catch(() => {
              this.loginLoading = false
              setTimeout(() => this.closeLoading(), 200)
            })
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    // 点击注册按钮
    handleRegister() {
      if (this.loginLoading) return
      this.loginLoading = true
      this.registerValidate()
        .then(() => {
          this.openLoading()
          this.register({
            username: this.registerForm.username,
            password: this.registerForms.password
          })
            .then(() => {
              this.loginLoading = false
              setTimeout(() => this.closeLoading(), 200)
              this.$router.push('/')
            })
            .catch(() => {
              this.loginLoading = false
              setTimeout(() => this.closeLoading(), 200)
            })
        })
        .catch(err => {
          this.$message.error(err)
        })
    },

    //回车执行查询
    checkCapslock({shiftKey, key} = {}) {
      if (event.keyCode == '13') {
        this.type === 1 ? this.handleLogin() : this.handleRegister()
      }
    },

    // 去注册
    goRegister() {
      this.registerForm.username = ''
      this.registerForm.password = ''
      this.registerForm.comfirmPassword = ''
      this.type = 2
    },
    // 去登录
    goLogin() {
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.type = 1
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';

.login-container {
  background-image: url('./../../assets/images/login_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;

  .login-frame {
    width: 487px;
    height: 466px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    position: absolute;
    box-sizing: border-box;
    border-radius: 5px;
    > header {
      @include size-color(23px, #5796eb);
      letter-spacing: 2px;
      text-align: center;
      margin: 33px 0;
      display: block;
    }

    .form-item {
      width: 360px;
      margin: 0 auto 23px;
      display: flex;
      align-items: center;
      width: 352px;
      height: 51px;
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      .username-icon {
        &::before {
          @include base-image('./../../assets/images/icon_username.png', 18px, 19px);
        }
      }
      .password-icon {
        &::before {
          @include base-image('./../../assets/images/icon_password.png', 16px, 19px);
        }
      }
      > label {
        @include size-color(15px, #909399);
        position: relative;
        font-weight: normal;
        letter-spacing: 2px;
        margin-left: 40px;
        margin-right: 6px;
        width: 76px;
        &::before {
          content: '';
          position: absolute;
          left: -25px;
          top: -2px;
        }
      }
      > input {
        color: #656565;
        width: 258px;
        border: none;
        outline: none;
        background-color: #ffffff !important;
        &:focus {
          outline: none;
        }
        // &:-internal-autofill-selected {
        //   background-color: #FFFFFF !important;
        // }
        &:-internal-autofill-previewed,
        &:-internal-autofill-selected {
          -webkit-text-fill-color: #807c7c;
          transition: background-color 5000s ease-out 0.5s;
        }
      }
    }
  }

  .login-btn {
    border: none;
    cursor: pointer;
    width: 352px;
    height: 44px;
    background-image: linear-gradient(-90deg, #409eff 0%, #409eff 100%);
    border-radius: 5px;
    color: white;
    font-size: 17px;
    margin: 40px auto 0px;
    display: block;
    &:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    }
  }
  p {
    text-align: center;
    margin-top: 26px;
    a {
      color: #0089cd;
      &:hover {
        color: #41a6f2;
      }
    }
  }
}
</style>
