<template>
  <div>
<!--    <div class="block-container"></div>-->
    <div class="frontContent">
      <div class="slogan">
        <div class="sl">SHOP SHARING - заработать может каждый</div>
        <div class="sl">готовые интернет магазины</div>
        <div class="sl">бери и зарабатывай!</div>
      </div>
      <!--<button class="button btSuccess replenishRef" @click="test">test</button>-->
      <div class="frontTable">
        <div class="td"><i class="icon-money icq"></i>бесплатно</div>
        <div class="td"><i class="icon-clock-1 icq"></i>за 10 минут</div>
        <div class="td"><i class="icon-calendar-alt icq"></i>большой ассортимент товаров</div>
        <div class="td"><i class="icon-rouble icq"></i>хорошие отпускные цены</div>
        <div class="td"><i class="icon-wallet icq"></i>отсутствие финансовых вложений</div>
        <div class="td"><i class="icon-truck icq"></i>подключена доставка</div>
        <div class="td"><i class="icon-cc-visa icq"></i>подключена оплата</div>
        <div class="td"><i class="icon-cog-1 icq"></i>настройка дизайна</div>
        <div class="td"><i class="icon-gauge-1 icq"></i>высокая производительность</div>
        <router-link  class="td" :to="{name:'About', params: {}}"><i class="icon-lock icq"></i>SSL-сертификат</router-link>
        <div class="td"><i class="icon-wrench icq"></i>бесплатное обновление</div>
        <div class="td"><i class="icon-chat icq"></i>встроенный онлайн чат</div>
      </div>
    </div>
<!--    <div class="imageBlock">-->
<!--        <div :class="['image',{imageActive:banner}]">-->
<!--          <div class="constructor">Так работает конструктор сайтов, любой....</div>-->
<!--          <div class="kit">Так работает Kitcommerce</div>-->
<!--        </div>-->
<!--    </div>-->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'frontPage',
  components: {
  },
  data () {
    return {
      random: [],
      bWidth: '',
      iW: '',
      iH: '',
      images: []
    }
  },

  computed: {
    // ...mapGetters({
    // })
  },
  methods: {
    // test () {
    //   this.switcher = !this.switcher
    //   console.log(this.switcher)
    // }
  }

}
</script>

<style scoped>
  .frontContent{
    width: 100%;
    background-color: #000000;
  }
  .frontContent:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(transparent, rgba(0, 0, 0, 0.4));
    pointer-events: none;
  }
  .slogan{
    color: white;
    font-weight: 800;
    width: 80%;
    margin: 0 auto;
  }
  .frontTable{
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .td{
    color: white;
    cursor: pointer;
  }
  .icq, .https{
    display: block;
    color: rgba(0, 255, 23, 0.81);
    transition-duration: 1s;
  }
  .getShop{
    position: absolute;
    top: 450px;
    left:150px;
  }
  @media screen and (max-width: 420px) {
    .frontContent {
      background: url(../assets/fon/teBrs415v.jpg) no-repeat center center;
      background-position: right 0 top 0;
    }
    .slogan {
      font-size: 1rem;
    }
    .td{
      width: 50%;
      height: 95px;
      font-weight: 800;
    }
    .icq{
      font-size: 2.5rem;
    }
    .imageBlock{
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .image01{
      position: relative;
      width: 98%;
      height: 250px;
      background: url(../assets/art.png) no-repeat center center;
      background-size: cover;
      border: solid 3px #d5d5d5;
      margin: 0 auto;
    }
    .image02{
      position: relative;
      width: 98%;
      height: 250px;
      background: url(../assets/sh.jpg) no-repeat center center;
      background-size: cover;
      border: solid 3px #d5d5d5;
      margin: 0 auto;
    }
    .title{
      position: absolute;
      right:0px;
      padding: 5px;
      background-color: rgba(96, 113, 187, 0.8);
      color: white;
    }
    .vs{
      position: absolute;
      background: url(../assets/vs.png) no-repeat center center;
      background-size: contain;
      width: 100px;
      height: 100px;
      top: 190px;
      left: 0;
    }
    .image01 div, .image02 div {
      text-align: left;
      font-size: 1.5rem;
      font-weight: bolder;
    }
  }
  @media only screen and (min-width: 421px) and (max-width: 810px){
    .frontContent{
      background: url(../assets/fon/teBrs770.jpg) no-repeat center center;
      height: 100vh;
      padding-top: 50px;
    }
    .frontTable{
      margin-top: 30px;
    }
    .slogan {
      font-size: 1rem;
    }
    .td{
      width: 50%;
      height: 95px;
      font-weight: 800;
    }
    .icq{
      font-size: 2.5rem;
    }
    .imageBlock{
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .image01{
      position: relative;
      display: inline-block;
      width: 49%;
      height: 250px;
      background: url(../assets/hello.png) no-repeat center center;
      background-size: cover;
      border: solid 3px #d5d5d5;
    }
    .image02{
      position: relative;
      display: inline-block;
      width: 49%;
      height: 250px;
      background: url(../assets/sh.jpg) no-repeat center center;
      background-size: cover;
      border: solid 3px #d5d5d5;
    }
    .title{
      position: absolute;
      right:0px;
      padding: 5px;
      background-color: rgba(96, 113, 187, 0.8);
      color: white;
    }
    .vs{
      position: absolute;
      background: url(../assets/vs.png) no-repeat center center;
      background-size: contain;
      width: 100px;
      height: 100px;
      top: 70px;
      left: 335px;
    }
    .image01 div, .image02 div {
      text-align: left;
      font-size: 1.5rem;
      font-weight: bolder;
    }
  }
  @media only screen and (min-width: 811px) and (max-width: 1300px){
    .frontContent{
      background: url(../assets/fon/teBrs1024.jpg) no-repeat;
      height: 100vh;
    }
    .slogan{
      padding-top: 100px;
      font-size: 1.3rem;
    }
    .td{
      width: 50%;
      height: 95px;
      font-weight: 800;
    }
    .icq{
      font-size: 2.5rem;
    }
    .imageBlock{
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .image01{
      position: relative;
      display: inline-block;
      width: 49%;
      height: 340px;
      background: url(../assets/art.png) no-repeat center center;
      background-size: cover;
      border: solid 3px #d5d5d5;
    }
    .title{
      position: absolute;
      right:0px;
      padding: 5px;
      background-color: rgba(96, 113, 187, 0.8);
      color: white;
    }
    .vs{
      position: absolute;
      background: url(../assets/vs.png) no-repeat center center;
      background-size: contain;
      width: 100px;
      height: 100px;
      top: 110px;
      left: 460px;
    }
    .image01 div, .image02 div {
      text-align: left;
      font-size: 1.5rem;
      font-weight: bolder;
    }
  }
  @media screen and (min-width: 1301px) {
    .frontContent{
      height: 100vh;
      background: url(../assets/fon/teBrs.jpg) no-repeat;
    }
    .frontTable {
      margin-top: 50px;
    }
    .slogan{
      padding-top: 100px;
      font-size: 1.3rem;
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
    .imageBlock{
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;
      height: 600px;
    }
    .image{
      position: absolute;
      top: 0px;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 600px;
      background: url(../assets/art.png) no-repeat center center ;
      background-size: contain;
      transition: top 1s;
      z-index: 200;
    }
    .imageActive{
      top: -565px;
    }
    .constructor{
      position: absolute;
      left:50px;
      top:0px;
      padding: 5px;
      color: #000000;
      font-size: 2rem;
      text-shadow:
        -0   -1px 2px #00FC1D,
        0   -1px 2px #00FC1D,
        -0    1px 2px #00FC1D,
        0    1px 2px #00FC1D,
        -1px -0   2px #00FC1D,
        1px -0   2px #00FC1D,
        -1px  0   2px #00FC1D,
        1px  0   2px #00FC1D,
        -1px -1px 2px #00FC1D,
        1px -1px 2px #00FC1D,
        -1px  1px 2px #00FC1D,
        1px  1px 2px #00FC1D,
        -1px -1px 2px #00FC1D,
        1px -1px 2px #00FC1D,
        -1px  1px 2px #00FC1D,
        1px  1px 2px #00FC1D;
    }
    .kit{
      position: absolute;
      right:100px;
      top: 0px;
      padding: 5px;
      font-size: 2rem;
      color: #000000;
      text-shadow:
        -0   -1px 2px #00FC1D,
        0   -1px 2px #00FC1D,
        -0    1px 2px #00FC1D,
        0    1px 2px #00FC1D,
        -1px -0   2px #00FC1D,
        1px -0   2px #00FC1D,
        -1px  0   2px #00FC1D,
        1px  0   2px #00FC1D,
        -1px -1px 2px #00FC1D,
        1px -1px 2px #00FC1D,
        -1px  1px 2px #00FC1D,
        1px  1px 2px #00FC1D,
        -1px -1px 2px #00FC1D,
        1px -1px 2px #00FC1D,
        -1px  1px 2px #00FC1D,
        1px  1px 2px #00FC1D;
    }
    .vs{
      position: absolute;
      background: url(../assets/vs.png) no-repeat center center;
      background-size: contain;
      width: 100px;
      height: 100px;
      top: 100px;
      left:  calc(50% - 50px);
    }
    .image01 div, .image02 div {
      text-align: left;
      font-size: 1.5rem;
      font-weight: bolder;
    }
    .sp{
      text-align: left;
      width: 50%;
      margin: 0 auto;
    }
    .sl{
      font-size: 1.8rem;
      text-transform: uppercase;
    }
    .frontTable {
      width: 80%;
    }
    .td{
      width: 25%;
      height: 170px;
      font-size: 1.3rem;
      text-decoration: none;
    }
    .icq{
      font-size: 3.5rem;
    }
    .https{
      font-size: 3.5rem;
      padding-top: 15px;
      padding-bottom: 12px;
    }
    .icq:hover{
      transform: rotateY(180deg)
    }
  }
</style>
