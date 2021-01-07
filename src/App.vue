<template>
  <router-view/>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      log: false
    }
  },
  computed: {
    ...mapGetters({
      GetSiteData: 'GetSiteData',
      GetLoginRedirect: 'GetLoginRedirect',
      GetUserAt: 'GetUserAt'
    })
  },
  created () {
    // this.createLocalForageInstance()
    this.saveScreenSize()
    // this.socketIo()
  },
  // watch: {
  //   GetUserAt: function () {
  //     if (this.GetUserAt) {
  //       this.$router.addRoutes(asyncRoutes)
  //       this.$router.addRoutes(adminRoute)
  //       if (Object.keys(this.GetLoginRedirect).length > 0) {
  //         this.$router.push(this.GetLoginRedirect)
  //         this.loginRedirect({})
  //       }
  //     }
  //   }
  // },
  methods: {
    ...mapActions({
      createLocalForageInstance: 'createLocalForageInstance',
      loadSiteData: 'loadSiteData',
      saveScreenSize: 'saveScreenSize',
      loginRedirect: 'loginRedirect',
      socketIo: 'socketIo'
    })
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
