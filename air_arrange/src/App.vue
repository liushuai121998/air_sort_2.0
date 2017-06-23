<template>
  <div id="app" @keyup.esc='resetSearch'>
    <div v-if='isContentShow.isShow'>
      <v-header :td-data="tdData"></v-header>
      <side-bar></side-bar>
      <keep-alive>
        <table-content v-once :get-td-data="getTdData"></table-content>
      </keep-alive>
      <v-footer></v-footer>
    </div>
    <div v-else>
      <login></login>
    </div>
  </div>
</template>

<script>
import header from './components/Header'
import sideBar from './components/sideBar'
import tableContent from './components/tableContent'
import footer from './components/footer'
import login from './components/login'
import Vue from 'vue'
export default {
  name: 'app',
  data () {
    return {
      isContentShow: this.$store.state.isContentShow,
      tdData: []
    }
  },
  created () {
  },
  methods: {
      getTdData (data) {
        this.tdData = data
        console.log(data)
      },
      // 按下delete键还原数据
        resetSearch () {
          //this.inputValue = ''
          this.$store.commit('RESET_DATA_SEARCH', {vm: this})
        }
  },
  computed: {
    // data () {
    //   return this.$store.state.initData
    // }
  },
  components: {'v-header': header, 'side-bar': sideBar, 'table-content': tableContent, 'v-footer': footer, 'login': login}
}
</script>

<style>
</style>
