<template>
    <div>
      <div class="block-container"></div>
      <transition name="war">
        <div v-if="isWrong" class="warn">{{isWrong}}</div>
      </transition>
      <div class="l-auth-container">
        <div class="l-auth">
          <div v-if="code || reg" class="check-material green fg">
            <input id="foreign" type="checkbox" v-model="foreign">
            <label for="foreign"></label>
                Чужой компьютер
          </div>
          <div class="inp">
            <input v-if="!code && !registration" type="text"  v-model="username" placeholder="email">
            <input v-if="!code && reg" type="text"  v-model="phone" placeholder="79995550033">
            <input v-if="!code && reg" type="text"  v-model="name" placeholder="name">
            <input v-if="code || registration" type="text" v-model="verifying_code" placeholder="code">
            <input v-if="code" type="password" v-model="password" placeholder="password">
            <div v-if="code" class="infoConfirm">Для входа введите код отправленный на {{username}} <br>и пароль</div>
          </div>
          <div v-if="code" class="log-in-bottom" @click="login">Продолжить</div>
          <div v-if="!code && !reg && !registration && !isWrong" class="log-in-bottom" @click="confirmRequest">Войти</div>
          <div v-if="!code && !registration" class="log-in-bottom" @click="register">Зарегистрироваться</div>
          <div v-if="!code && registration" class="log-in-bottom" @click="finishRegister">Завершить регистрацию</div>
          <div class="log-in-cancel" @click="$emit('logInCancel')">Отменить</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { HTTP } from './http'
import { componentId } from '../ConfigStore'

export default {
  props: {
    params: {}
  },
  data () {
    return {
      username: '',
      password: '',
      reg: false,
      registration: false,
      code: false,
      foreign: '',
      verifying_code: '',
      phone: '',
      name: '',
      isWrong: false
    }
  },
  computed: {
    ...mapGetters({
    }),
    route () {
      if (Object.keys(this.params).length) {
        return this.params
      } else {
        return { name: 'adminPanel' }
      }
    }
  },
  methods: {
    ...mapActions({
    }),
    confirmRequest () {
      if (this.username) {
        HTTP.post('/api/check_confirm', {
          clientId: this.GetSiteData.clientId,
          componentId: componentId,
          email: this.username
        }).then((resp) => {
          this.password = ''
          if (resp.data[0] === 'user false') {
            this.isWrong = 'Пользователя ' + this.username + ' не существует'
            setTimeout(() => {
              this.isWrong = ''
            }, 5000)
          } else {
            this.code = true
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    login () {
      if (this.verifying_code && this.password) {
        HTTP.post('/api/login', {
          componentId: componentId,
          clientId: this.GetSiteData.clientId,
          username: this.username,
          password: this.password,
          verifying_code: this.verifying_code
        })
          .then((response) => {
            if (response.data[0] === 'code false') {
              this.isWrong = 'Не верный код'
              setTimeout(() => {
                this.isWrong = ''
              }, 5000)
            } else if (response.data[0] === '304') {
              this.isWrong = 'Не верный пароль'
              setTimeout(() => {
                this.isWrong = ''
              }, 5000)
            } else {
              this.uploadUserBalance()
              this.userData({ data: response.data, foreign: this.foreign })
              this.$emit('logInCancel')
              // if (this.route) {
              //   this.$router.push(this.route)
              // }
            }
          }).catch(function (error) {
            console.log(error)
          })
      }
    },
    register () {
      if (!this.reg) {
        this.reg = true
      } else if (this.reg) {
        HTTP.post('/api/confirm', {
          clientId: this.GetSiteData.clientId,
          componentId: componentId,
          email: this.username
        }).then(() => {
          this.reg = false
          this.registration = true
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    finishRegister ($event) {
      HTTP.post('/api/register', {
        verifying_code: $event,
        clientId: this.GetSiteData.clientId,
        idParent: 1,
        name: this.name,
        email: this.username,
        phone: this.phone,
        status: 1
      }).then((res) => {
        // this.$router.addRoutes(asyncRoutes)
        this.userData({ data: res.data, foreign: this.foreign })
        this.$emit('logInCancel')
        if (this.route) {
          this.$router.push(this.route)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
  .inp {
    padding-top: 10px;
    padding-bottom: 10px;
    width: 320px;
    margin: 0 auto;
  }

  .inp input{
    margin-top: 2px;
    margin-bottom: 2px;
  }
  .l-auth /deep/ .label{
    color: white;
    font-weight: 200;
  }
  .l-auth-container{
    position:fixed;
    display:flex;
    align-items:center;
    justify-content:center;
    top:0px;
    left:0px;
    width:100vw;
    height:100vh;
    z-index: 110;
  }
  .log-in-bottom{
    color: white;
    margin-right: 10px;
    display: inline-block;
    cursor: pointer;
    font-size: 0.8rem;
  }
  .log-in-cancel{
    color: white;
    display: inline-block;
    cursor: pointer;
    font-size: 0.8rem;
  }
  .log-in-bottom:hover{
    color: lawngreen;
  }
  .log-in-cancel:hover{
    color: #ff0000;
  }
  .logInCheck{
    color: white;
    width: 100%;
    margin-bottom: 25px;
  }
  .fg{
    width: 300px;
    margin: 0 auto;
    color: white;
    font-size: 0.8rem;
  }
  .block-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .warn{
    width: 320px;
    padding: 20px;
    background-color: red;
    position: absolute;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    color: white;
  }
  .infoConfirm{
    color: white;
    border: 1px solid;
    border-radius: 5px;
    width: 300px;
    margin: 0 auto;
    font-size: 0.8rem;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-top: 5px;
  }
  @media only screen and (max-width: 415px){
    .l-auth {
      background: linear-gradient(to right, rgb(15, 0, 58), rgb(45, 0, 6));
      padding-top: 15px;
      padding-bottom: 15px;
      width: 90%;
    }
  }
  @media only screen and (min-width: 415px) and (max-width: 846px){
    .l-auth {
      background: linear-gradient(to right, rgb(15, 0, 58), rgb(45, 0, 6));
      height: 200px;
      width: 400px;
      padding-top: 10px;
    }
  }
    @media screen and (min-width: 847px) {
      .l-auth {
        background: linear-gradient(to right, rgb(15, 0, 58), rgb(45, 0, 6));
        padding: 15px;
        min-width: 350px;
        max-width: 450px;
        animation: bounceIn 1s forwards ease;
        z-index: 101;
        opacity: 1;
        position: fixed;
      }
      .l-signup {
        background-color: white;
        padding: 15px;
        margin: 45px auto;
        min-width: 350px;
        max-width: 450px;
        animation: slideInFromLeft 1s forwards ease;
      }
    }
    @keyframes bounceIn {
        to {
            animation-timing-function: cubic-bezier(.215, .61, .355, 1)
        }
        0% {
            opacity: 0;
            transform: scale3d(.3, .3, .3)
        }
        20% {
            transform: scale3d(1.1, 1.1, 1.1)
        }
        40% {
            transform: scale3d(.9, .9, .9)
        }
        60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03)
        }
        80% {
            transform: scale3d(.97, .97, .97)
        }
        to {
            opacity: 1;
            transform: scaleX(1)
        }
    }
  .war-enter-active, .war-leave-active {
    transition: top .5s;
  }
  .war-enter, .war-leave-to {
    top: -70px;
  }
</style>
