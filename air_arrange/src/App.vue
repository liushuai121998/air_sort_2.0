<template>
  <div id="app">
    <div v-if='isContentShow.isShow' class="main_wrap">
      <v-header></v-header>
      <!--<v-header :td-data="tdData"></v-header>-->
      <side-bar></side-bar>
      <test></test>
      <!--<keep-alive>-->
        <!--<table-content v-once v-show="!isDiviScreen"></table-content>-->
      <!--</keep-alive>-->
      <!--<v-footer></v-footer>-->
      <right-content></right-content>
    </div>
    <div v-else>
      <login></login>
    </div>
  </div>
</template>

<script>
import header from './components/Header'
import test from './components/test'
import sideBar from './components/sideBar'
import rightContent from './components/rightContent'
import tableContent from './components/tableContentTest'
import footer from './components/footer'
import login from './components/login'
import Vue from 'vue'
export default {
  name: 'app',
  data () {
    return {
      isContentShow: this.$store.state.isContentShow,
      tdData: this.$store.state.initData,
      isDiviScreen: this.$store.state.isDiviScreen
    }
  },
  created () {
    // 发送ajax
//      this.$http.post('http://192.168.7.53:8080/getInitData', {"username": 'ghms_admin'}).then((res) => {
//
//        this.$store.commit('GET_INIT_DATA', res.data)
//
//      }, (error) => {
//        console.log('error')
//      })
    //this.$store.dispatch('GET_INIT_DATA', this)
  },
  methods: {
//      getTdData (data) {
//        this.tdData = data
//        console.log(data)
//      }
  },
  computed: {
    // data () {
    //   return this.$store.state.initData
    // }
  },
//  components: {'v-header': header, 'side-bar': sideBar, 'table-content': tableContent, 'v-footer': footer, 'login': login}
  components: {'v-header': header, 'test': test, 'login': login, 'side-bar': sideBar, 'right-content': rightContent, 'table-content': tableContent}
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
  .main_wrap {
    width: 100%;
    height: 100%;
  }
</style>
