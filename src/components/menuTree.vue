<template>
  <div :class="['mainMenuBlock', level]">
    <div
      v-for="(item,index) in menuData"
      @mouseenter="profileActive = item.term"
      @mouseleave="profileActive = ''"
      @click="tap(item.term)"
      :key="index"
      :class="['mainMenuItem', {mainMenuLinkActive:profileActive === item.term}]">
      <div
        @click="link(item.rout, item.doc, item.children)"
        class="mainMenuLink">
        <i :class="item.icon"></i>
        {{item.term}}
      </div>
      <transition name="menu" mode="out-in">
      <div
        v-if="item.children && item.children.length && profileActive === item.term"
        class="subMenu">
        <div class="back" v-if="GetScreenSize < 847">
          <i class="icon-left-open"></i>
          <div class="title">Назад</div>
        </div>
          <menuTree :menuData="item.children" :level="item.level" :key="item.term"/>
      </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'menuTree',
  props: {
    menuData: {},
    level: {
      type: String,
      default: function () {
        return 'level-0'
      }
    }
  },
  data () {
    return {
      profileActive: ''
    }
  },
  computed: {
    ...mapGetters({
      GetScreenSize: 'GetScreenSize'
    })
  },
  methods: {
    ...mapActions({
      menuStateSave: 'menuStateSave'
    }),
    link (rout, params, children) {
      if (!children) {
        if (rout !== 'external') {
          this.$router.push({ name: rout, params: { doc: params } })
        } else {
          window.open(params)
        }
        this.profileActive = ''
        this.menuStateSave(false)
      }
    },
    tap (term) {
      if (this.profileActive !== term) {
        this.profileActive = term
      } else {
        this.profileActive = ''
      }
    },
    test () {
      console.log(this.$route.name)
    }
  }
}
</script>

<style scoped>
  @media only screen and (max-width: 846px){
    .mainMenuBlock{
      position: absolute;
      background-color: #000000;
      z-index: 30;
      height: 100%;
      /*width: 80%;*/
      left: 0;
      overflow-y: scroll;
      color: white;
      padding-right: 10px;
    }
    .mainMenuItem{
      width: 250px;
    }
    .mainMenuLink{
      color: white;
      text-decoration: none;
      font-weight: bold;
      outline: none;
      transition: color .5s, background-color .5s;
      padding-left: 10px;
      padding-right: 15px;
      padding-bottom: 10px;
      padding-top: 10px;
      white-space: nowrap;
      font-size: 0.8rem;
      text-align: left;
    }
    .mainMenuLink:hover{
      color:yellow;
    }
    .subMenu{
      position: absolute;
      background-color: #000000;
      z-index: 50;
      height: 100%;
      width: 100%;
      left: 0;
      top:0px;
      overflow-y: scroll;
      color: white;
      padding-right: 10px;
    }
    .back{
      font-size: 0.8rem;
      text-decoration: none;
      font-weight: bold;
      padding-left: 10px;
      padding-right: 15px;
      padding-bottom: 10px;
      padding-top: 10px;
      white-space: nowrap;
    }
    .back .title{
      display: inline-block;
      width: 100%;
      text-align: center;
    }
    .menu-enter-active{
      transition: left .5s ease;
    }
    .menu-leave-active{
      transition: left .5s ease;
    }
    .menu-enter {
      left: -300px;
    }
    .menu-leave-to{
      left: -300px;
    }
  }
  @media screen and (min-width: 847px) {
    .subMenu .mainMenuItem{
      padding-top: 0px;
      padding-bottom: 0px;
    }
    .mainMenuItem{
      display: inline-block;
      position: relative;
      cursor: pointer;
      transition: background-color .5s;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .mainMenuLink{
      color: white;
      text-decoration: none;
      font-weight: bold;
      outline: none;
      transition: color .5s, background-color .5s;
      padding-left: 10px;
      padding-right: 15px;
      padding-bottom: 10px;
      padding-top: 10px;
      white-space: nowrap;
      font-size: 0.8rem;
      text-align: left;
    }
    .mainMenuLink:hover{
      color:yellow;
    }
    .mainMenuLinkActive{
      background-color: rgba(255, 255, 255, 0.31);
    }
    .subMenu{
      position: absolute;
      left: 0px;
      background-color: rgba(14, 10, 10);
      top: 59px;
    }
    .subMenu .mainMenuItem{
      display: block;
    }
    .menu-enter-active{
      transition: opacity .5s ease;
    }
    .menu-leave-active{
      transition: opacity.5s ease;
    }
    .menu-enter {
      opacity: 0;
    }
    .menu-leave-to{
      opacity: 0;
    }
  }
</style>
