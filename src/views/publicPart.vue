<template>
  <div :class="['publicComp',{'black':home}]">
    <div v-if="waiting" class="waiting"></div>
    <div class="wrap">
      <div id="nav" :class="[{'insideMenu':!home}, fixed ? 'fixed' : '']">
        <router-link :to="{name:'home'}" class="logo">
          <span class="prepost">sho</span>
          <span class="mid">PS</span>
          <span class="prepost">haring</span>
        </router-link>
        <div v-if="GetScreenSize > 847">
          <div class="mainMenu">
            <menuTree :menuData="menu"/>
            <div class="login aut">
              <div class="login-re" v-if="!GetUserAt" @click="logIn">
                <i class="icon-user-o"></i>
              </div>
              <div
                @mouseenter="profileActive = true"
                @mouseleave="profileActive = false"
                class="login-re" v-else>
                <i class="icon-user-o loggedIn"></i>
                <span>{{GetSiteData.userData.name}}</span>
                <div v-if="profileActive" class="profMenu">
                  <router-link :to="{name:'home'}" class="profileMenuItem">Личный кабинет</router-link>
                  <div class="profileMenuItem"  @click="logOut(1)">Выйти</div>
                  <div class="profileMenuItem"  @click="logOut(2)">Выйти на всех устройствах</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="GetScreenSize < 847">
        <button  :class="['toggle-hamburger', 'toggle-hamburger-mob', {'is-active':GetMenuState}]" @click="menuOpen">
          <span></span>
        </button>
        <div :class="{'blocked':GetMenuState}"></div>
        <transition appear name="menu" mode="out-in" v-if="GetMenuState">
          <menuTree :menuData="menu"/>
        </transition>
        <div class="login aut">
          <div class="login-re" v-if="!GetUserAt" @click="logIn">
            <i class="icon-user-o"></i>
          </div>
          <div
            @click="profileActive = !profileActive"
            class="login-re" v-else>
            <i class="icon-user-o"></i>
            <span>{{GetSiteData.userData.name}}</span>
          </div>
        </div>
        <div v-if="profileActive" class="profMenu">
          <router-link :to="{name:'home'}" class="profileMenuItem">Личный кабинет</router-link>
          <div class="profileMenuItem"  @click="logOut">Выйти</div>
          <div class="profileMenuItem"  @click="logOut">Выйти на всех устройствах</div>
        </div>
      </div>
      <section :class="[key!=='/home' ? 'app-main' : '']">
        <router-view :key="key" />
      </section>
    </div>
    <!--<button class="button btSuccess" @click="test">test</button>-->
    <div class="footerFirst">
      <div class="foot">
        <div class="menuBottom">
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-youtube ic"></i>Youtube канал</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-chat ic"></i>Финансовая информация</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-balance-scale ic"></i>Юридическая информация</router-link>
        </div>
        <div class="menuBottom">
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-stackoverflow ic"></i>Часто задаваемые вопросы</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-edit ic"></i>Договор</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-doc ic"></i>Документы</router-link>
        </div>
        <div class="menuBottom">
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-stopwatch ic"></i>Магазин за 1 минуту</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-list-bullet ic"></i>SSL сертификат</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-server ic"></i>Условия Использования</router-link>
        </div>
        <div class="menuBottom">
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-handshake-o ic"></i>Служба поддержки</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-pencil ic"></i>Блог</router-link>
          <router-link  class="linkBottom" :to="{name:'home'}"><i class="icon-book ic"></i>Политика Конфиденциальности</router-link>
        </div>
      </div>
      <div class="payment">
        <p>Мы принимаем к оплате</p>
        <ul class="pay-list">
          <li class="visa"></li>
          <li class="mastercard"></li>
          <li class="mir"></li>
        </ul>
      </div>
    </div>
    <logIn v-if="log" v-on:logInCancel="logInCancel" v-bind:params="{ name: 'home' }"></logIn>
  </div>
</template>

<script>
// import { menuRoutes } from '../../router/router'
import logIn from '../components/login.vue'
import menuTree from '../components/menuTree'
import { mapGetters, mapActions } from 'vuex'
import { HTTP } from '../components/http'
export default {
  name: 'publicPart',
  components: {
    logIn,
    menuTree
  },
  data () {
    return {
      router: [],
      menuActive: false,
      menuKey: '',
      menuIndexSelected: '',
      menu: [
        {
          term: 'Как это работает',
          rout: '',
          icon: 'icon-cog-alt',
          level: 'level-1',
          children: [
            { term: 'Что такое "shop sharing"?', rout: 'document', doc: '20', icon: 'icon-right-open' },
            { term: 'Как получить магазин?', rout: 'document', doc: '21', icon: 'icon-right-open' }
          ]
        },
        {
          term: 'Каталоги товаров',
          rout: 'catalogsDescribe',
          icon: 'icon-cubes',
          level: 'level-1',
          children: [
            { term: 'Корректирующее белье', rout: 'catalog', doc: '18', icon: 'icon-right-open' }
          ]
        },
        { term: 'Подобрать домен', rout: 'pickUpDomain', icon: 'icon-globe-2', level: 'level-1' },
        {
          term: 'Обучение',
          rout: 'answer',
          icon: 'icon-commenting-o',
          level: 'level-1',
          children: [
            { term: 'Домен - что это такое', rout: 'document', doc: '22', icon: 'icon-right-open' },
            { term: 'Как зарегистрировать домен', rout: 'document', doc: '23', icon: 'icon-right-open' },
            { term: 'Добавить имеющийся домен', rout: 'document', doc: '24', icon: 'icon-right-open' },
            { term: 'Привлечение клиентов в магазин', rout: 'document', doc: '25', icon: 'icon-right-open' },
            { term: 'Настройки магазина', rout: 'document', doc: '12', icon: 'icon-right-open' },
            { term: 'Установка розничных цен', rout: 'document', doc: '13', icon: 'icon-right-open' },
            { term: 'Настройка каталога', rout: 'document', doc: '11', icon: 'icon-right-open' },
            { term: 'Темы оформления', rout: 'document', doc: '10', icon: 'icon-right-open' },
            { term: 'Виджет "кирпичи"', rout: 'document', doc: '14', icon: 'icon-right-open' },
            { term: 'Виджет "слайдер"', rout: 'document', doc: '15', icon: 'icon-right-open' },
            { term: 'Настройка меню', rout: 'document', doc: '16', icon: 'icon-right-open' },
            { term: 'Настройка цветов', rout: 'document', doc: '17', icon: 'icon-right-open' }
          ]
        },
        {
          term: 'Демо',
          rout: 'demo',
          icon: 'icon-desktop',
          children: [
            { term: 'Виджет слайдер', rout: 'external', doc: 'https://demo-slider.site', icon: 'icon-right-open' },
            { term: 'Виджет кирпичи', rout: 'external', doc: 'https://demo-bricks.site', icon: 'icon-right-open' }
          ]
        }
      ],
      log: false,
      profileActive: false
    }
  },
  computed: {
    ...mapGetters({
      waiting: 'waiting',
      GetUserAt: 'GetUserAt',
      GetSiteData: 'GetSiteData',
      GetScreenSize: 'GetScreenSize',
      GetMenuState: 'GetMenuState',
      GetScroll: 'GetScroll'
    }),
    key () {
      console.log(this.$route.path)
      return this.$route.path
    },
    fixed () {
      return this.GetScroll > 70
    },
    home () {
      return this.$route.name === 'home'
    }
  },
  mounted () {
    window.onscroll = () => {
      this.scroll(window.pageYOffset)
    }
  },
  methods: {
    ...mapActions({
      userData: 'userData',
      menuStateSave: 'menuStateSave',
      scroll: 'scroll'
    }),
    logIn () {
      this.log = true
    },
    logInCancel () {
      this.log = false
    },
    logOut (type) {
      HTTP.get('/api/logout', {
        params: {
          type: type
        }
      }).then(() => {
        this.userData({ data: { logout: true }, foreign: false })
        if (this.$route.name !== 'home') {
          this.$router.push({ name: 'home' })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    clickMenu (type) {
      if (type === 'mobil') {
        this.menuActive = 1 - this.menuActive
        this.$emit('scrollStop')
      } else {
        this.isActive = false
      }
    },
    menuOpen () {
      // this.menuActive = 1 - this.menuActive
      this.menuStateSave(!this.GetMenuState)
      this.$emit('scrollStop')
    },
    toggleMenu (menuIndex) {
      // this.$emit('scrollStop')
      // this.menuActive = true
      this.menuStateSave(true)
      this.menuKey = menuIndex
      this.menuIndexSelected = menuIndex
      console.log(menuIndex)
    },
    test () {
      location.href = 'http://github.com'
    }
  }
}
</script>

<style scoped>
  .waiting{
    width: 100%;
    height: 100vh;
    position: fixed;
    background: url(../assets/indicator.svg) no-repeat  center center rgba(255, 255, 255, 0.57);
    z-index: 1000;
  }
  .publicComp{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .black{
    background-color: #000000;
  }
  .wrap{
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
    width: 100%;
  }
  .insideMenu{
    background-color: black;
    z-index: 1000;
  }
  .mainMenu{
    display: flex;
    align-items: center;
    /*width: 100%;*/
    /*justify-content: center;*/
  }
  .menuAdmin a{
    color: white;
  }
  .mainMenuLink{
    color: white;
    text-decoration: none;
    font-weight: bold;
    outline: none;
    transition: color .5s;
    margin-right: 15px;
  }
  .searchBlock{
    width: 70%;
    display: inline-block;
  }
  .footerFirst{
    background-color: #f0f0f0;
    padding-top: 50px;
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
  }
  .menuBottom{
    height: 100px;
    display: inline-block;
    text-align: left;
    line-height: 2.1;
    font-family: tahoma,arial,sans-serif;
    font-size: 12px;
  }
  .linkBottom{
    display: block;
    outline: none;
    color: #000000;
  }
  .linkBottom:hover{
    color: #00ff17;
  }
  .payment p{
    display: inline-block
  }
  .pay-list{
    display: inline-block;
    vertical-align: middle;
    padding-left: 0;
    margin: 0;
  }
  .pay-list li{
    display: inline-block;
    vertical-align: middle;
  }
  .visa{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAOCAYAAAC2POVFAAADm0lEQVRIiYWVXWxURRTHf3NpC4ZE6XZ3XRvr0tJ2K1RrtS3BxA/S6Jsxog8mokiVr0LBD0xtKmmwktJU0iitpDHB7YMmPogPJmgMCOGhoTQRSCD10m13YSFtt1usPhChmvFh57pnb2/xJDfnnP+cOfOfc2fOqJVlm45qqEWjNAoNoEFDTKNabiS+mkTIAyu3bQdru1YWYAHWm1pZhWD1oiw0FiirKRXr+hUgUNFRg7JawFoPqkQrBVjToEY0qn3Wbh11cvuqegu0UofBqtdKWaDQymr+43LzEEBeYmKwKVy2qQR4BXgHeMjMrQFuAHuyRLcq4H2g3EBjwEWgw8SbrRIDCFbs26uh2+xKyoPm+9iFbwO2urCngSGcJFcnBpNX44O9wOPAnAhc65r4jCAK8MVU/DMNNAjMTsW6/gyWtzcCPS6i08CMsW8Bl5wBX9UhBexkodQ5Rs6Or8Wjs8DPAnq0OLx5ifC3CPsWEDW2JHvOaFmheWDdzJWPQmm7PQgUAxtn7da/RUwjEPEg+19u9+8BOCHse4BKgOLw2z7gZTH2zVT88FyodM8qoEjgw0aHBaaB246Tttsm0/aH37vWlVU9KeyS+9YcCS1G9pTLrzX6DWCpwPuNbsgNZ8ToMYEVAMOByk8O+SMHCt0L+qo+LQFeENBe4C/h13mSTcajMeCaB9m3BDY0Fe+/4EH2DuDgnUBajOUD7wGj/khXo2vZLYBz3C7+Prr7AnBejDd4kjUiq/tYcbjpSaBaYH3ClpfwfGq8ex4gFTtwBVgHnHHlvh/40R85WAtQFOkpIPd8f230OYHdlaw8t7XkVjUFfAcQKm3JI1t5yB6BTOBYZwx4FniVTBt0JB/YZewNZgOOHC98+PMVwGWBPQGQtwjZ08IuAl4X/peTiSN3jF0DLBNjZ92JZsb2a+DbQGXnWSAhhhyCza4pl1go/nurB8o8K5tMRK8DtoDyjf4HGBB4vWvqCECwvO2DYHn7S8GKfcsBApX7LeB5V6xdFOl+BHjKi4OH1C9WWYBfWNj3fphMDCSFLy/XHNkOsAvzEgYqOlLAcvM5Mg8cJXsUIHP7h8mVarJtse7/yO5wYf0uX16ukenxHh1c1Roi+2QDBF1zbgObgSSwUeDHbv727msycMXqvh4ybQxg7d3Inibz7jsyhWjWodKdBWZhJ+a4INMJrAeqAB+ZljYB/AT0pe22uD9y8EVgXOSPenA4BTxnbOtfoAT2MWPFfN0AAAAASUVORK5CYII=) no-repeat;
    width: 43px;
    height: 14px;
  }
  .mastercard{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAYCAYAAAACqyaBAAADKElEQVRIiaXWy2tcZRgG8N+cM5lk2twsjpamOpFRgi2iRDQoWVQUrTVF66pLnaoIunShu6A7Bf+A2o6CeFupG0GtFxQsXsAi1KpN2oQ6FZoqUZv7zBwXZ6aN08PkiM/uPO/lec/3vd/3vRkJmDNUwuO4FzuRwzJO4xNUCqrft/yXKkM34zHchRJ6sIrj+BiH8uXqyXadTJtoL17CEwiSCluHd3MPm8xNmMS+DXwjHMQz+XL1wmXic4a24wPctEEiEGyq6983rz4+KOoO04TAj7gvX67+elG8+cdfpRXO5BoGH5gT9tdE+azV0YIou9FCXcQJjOXL1b9bES+mFYbesT+F/bW4kKWa7Mn5tKFwI16GTLO5fkaqtctuWTO499xl/OpoQaMvl7aACDsCHEgrDD0jC4l8+Nti2hTE210OxMcpNbq2LSfywR/JfAfcE2BHWu9MGNXD3nqybaVOI0o2JmNngHxq92y01rG4WqOjvQ25ACup3WuZrk7mKAw62tuwFogPfipE9UzYWEjuzSgXEmZSNy5+CsR3dWqsnu1O5BtbkvkOOBKgIj53qbD8y+ZEvr41me+Aw0FB9QReSxtRO5+zMvvvHq1f2aMxkPqCgdfz5erx1t0+gG9xQ5rITHfD4MQ5YW9d1B1avfUqUVfqu31Ko3Gn5aWR9a/adfgI16fJEPbV9D04r37HoCifTSt8SvyqTbHuzS6onsbteCNNlvpC+OXK0sDuqCf8LKXw27itJUzbMNHCnKFbXJpk1q/EGXyOQwXVL1rkUmVoXPxG3I1r1vmfwoc4mC9Xj7XrJIq3FdIjHosWC6qrG/kvVYa6sBnL+XL1P1/4HVEqDj/0P+O3lorDj0C2SezFHvF578b7uALjmMEUduEIXigVh8eaPo+Kt6GAIo7ifrwlnuu68Sb242vxFm7HNJcaroTDuBpPNguZEA+SI+hHH37HN9OzM8/h6eb3HoziWeyfnp05IN7OY3gH16IXnzb1Jlur0BL/C4s4PT07s4az+AGvoNZMtiJupu9KxeFX8R62NZOeb8YdLRWHK9iE3XgKF5r5zjT9n8d8qTi86x/6dOWr2+9m3gAAAABJRU5ErkJggg==) no-repeat;
    width: 31px;
    height: 24px;
  }
  .mir{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAOCAYAAAC/10U/AAACS0lEQVRIiZ2VTUgVURiGH/WSZkH2s2gT1v72MxTkQihPYtIuolaJRE1IBAVBhISk2CYvIdHuBFdqEdQi0qTAGBJcRTBqO4PKIGgR5CVJyLl3WtwzeZrOPTPjC5fvO+/5fl7OPd+ZOkeKUeAAa1gFXgMF3/XKGo8jxWngHNCs877rHXWkaAeG47yW2wIMAXuBOkUv+03FM8ALKmE9lRDKIX9tOYSgomwYUK58IAiLDOTfAuSU8CP8i06gCRjUmncBT6iNHYY6Op6qujpK9LT+4tHiRqDNkhvhGNDHwPx1hvaN1FsCzyesU8ORoo3/hesYtuyZcIf+2Q6b+F2OFHnVvCGheRKuWXd7WieBexlr9tnEA3QpewjYlrE4AI4Ue4CTKUKvAjepzlwa5HMG8gewVfkngLtAt7ZfArakbBCJalD+EtBijOrdHQK3efCxCJwFDgPbLXUXTOKLwGVgA9DuSNEMHNf2x4AraVSrFyaalVWggOF+O1J0AzcACC9U36Kc+jXWLD9nEv8TeEP1yjQCp6ieAlT/lZm04oGLwCblPwa+1ojbif2limMJ6K1158c1fxSI4l4CQYYm/ZpfyJBnwwLQ6bveounkASaA+8rXB3XcEGtDNBtTvuu9d6Q4mDJvBbhk4D8BM9HH0yjed70vjhRzwH6NDoBXQEdKATpGMsb/9l1vLCnI9lTGT3nad71SRhEA877rTa0jLxE28RMJ67S4tc68ROSA2Rj3Wdl3wCSwWa2fK/sdmDbUivMrwEPf9Z5p3LdYzHICb8UfNBCgxOcLZlUAAAAASUVORK5CYII=) no-repeat;
    width: 47px;
    height: 14px;
  }
  .ic{
    margin-right: 3px;
  }
  .loggedIn:before{
  }
  @media only screen and (max-width: 846px){
    #nav{
      height: 70px;
      background-color: #000000;
    }
    .mainMenu{
      display: none;
    }
    .toggle-hamburger {
      position: absolute;
      left: 12px;
      top: 25px;
      color: #ffffff;
      width: 30px;
      height: 28px;
      border: none;
      cursor: pointer;
      background: none;
    }
    .toggle-hamburger:focus {
      outline: none;
    }

    .toggle-hamburger span {
      display: block;
      position: absolute;
      top: 11px;
      left: 0px;
      right: 0px;
      height: 3px;
      background-color: #ffffff;
    }
    .toggle-hamburger span::before, .toggle-hamburger span::after {
      position: absolute;
      display: block;
      background-color: #ffffff;
      left: 0;
      width: 100%;
      height: 3px;
      content: "";
    }
    .toggle-hamburger span::before {
      top: -9px;
    }
    .toggle-hamburger span::after {
      bottom: -9px;
    }
    .toggle-hamburger.toggle-hamburger-mob span::before, .toggle-hamburger.toggle-hamburger-mob span::after {
      transition-duration: .3s, .3s;
      transition-delay: .3s, 0s;
    }
    .toggle-hamburger.toggle-hamburger-mob span::before {
      transition-property: top, transform;
    }
    .toggle-hamburger.toggle-hamburger-mob span::after {
      transition-property: bottom, transform;
    }
    .toggle-hamburger.toggle-hamburger-mob.is-active span {
      background: none;
    }
    .toggle-hamburger.toggle-hamburger-mob.is-active span::before, .toggle-hamburger.toggle-hamburger-mob.is-active span::after {
      transition-delay: 0s, .3s;
    }
    .toggle-hamburger.toggle-hamburger-mob.is-active span::before {
      top: 0;
      transform: rotate(45deg);
    }
    .toggle-hamburger.toggle-hamburger-mob.is-active span::after {
      bottom: 0;
      transform: rotate(-45deg);
    }
    .topLevel {
      position: absolute;
      background-color: #000000;
      z-index: 30;
      height: 100%;
      width: 80%;
      left: 0;
      overflow-y: scroll;
      color: white;
      padding-right: 10px;
    }
    .navbar-link{
      box-sizing: border-box;
      color: #ffffff;
      display: block;
      line-height: 45px;
      position: relative;
      text-decoration: none;
      letter-spacing: .35px;
      padding-left: 40px;
      outline: none;
    }
    .navbar-link span{
      border-bottom: 1px solid #e8e8e8;
      display: block;
      text-align: left;
      cursor: pointer;
    }
    .top:after{
      border-top: 2px solid #737882;
      border-right: 2px solid #737882;
      content: '';
      height: 8px;
      right: 15px;
      position: absolute;
      top: 17px;
      transform: rotate(45deg);
      width: 8px;
    }
    .navbar-link-back{
      box-sizing: border-box;
      color: #646464;
      display: block;
      line-height: 45px;
      position: relative;
      text-decoration: none;
      letter-spacing: .35px;
      padding-left: 40px;
      outline: none;
    }
    .navbar-link-back span{
      border-bottom: 1px solid #e8e8e8;
      display: block;
      font-weight: bolder;
      cursor: pointer;
    }
    .navbar-link-back:after{
      border-bottom: 2px solid #737882;
      border-left: 2px solid #737882;
      content: '';
      height: 8px;
      left: 45px;
      position: absolute;
      top: 17px;
      transform: rotate(45deg);
      width: 8px;
    }
    .blocked{
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 30;
      height: 100%;
      width: 100%;
    }
    .aut{
      position: absolute;
      right: 12px;
      top: 25px;
      color: white;
    }
    .profMenu {
      position: absolute;
      top: 70px;
      right: 0px;
      background-color: #000000;
      color: white;
      width: 190px;
      font-size: 0.8rem;
      text-align: left;
      padding: 10px;
      z-index: 30;
    }
    .profMenu a {
      color: white;
      cursor: pointer;
      text-decoration: none;
      font-size: 0.8rem;
    }
    .foot{
      margin: 0 auto;
      width: 98%;
    }
    .menuBottom {
      width: 100%;
    }
    .linkBottom{
      text-align: center;
    }
  }
  @media screen and (min-width: 847px) {
    #nav{
      position: fixed;
      align-items: center;
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .app-main{
      margin-top: 70px;
    }
    .login-re {
      color: white;
      text-align: center;
      font-size: 20px;
      cursor: pointer;
    }
    .login-re span{
      font-size: 0.9rem;
    }
    .aut {
      width: 150px;
      position: relative;
      display: inline-block;
      vertical-align: middle;
    }
    .profMenu {
      position: absolute;
      z-index: 1000;
      cursor: pointer;
      width: 200px;
      background-color: #20207d;
      color: white;
      font-size: 0.9rem;
      text-align: left;
    }
    .profMenu a {
      color: white;
      cursor: pointer;
      text-decoration: none;
    }
    .profileMenuItem{
      display: inline-block;
      padding: 5px;
      width: 100%;
    }
    .profileMenuItem:hover{
      background-color: #98aeff;
    }
    .foot{
      margin: 0 auto;
      width: 80%;
    }
    .menuBottom {
      width: 25%;
    }
    .fixed {
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.75);
    }
  }
  .login-enter-active{
    transition: right .5s ease;
  }
  .login-leave-active{
    transition: right .5s ease;
  }
  .login-enter {
    right: -190px;
  }
  .login-leave-to{
    right: -190px;
  }
</style>
