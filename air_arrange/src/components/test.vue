<template>
  <div class="wrap"  ref="wrap">
    <!--<div class='merge_title'>到离港</div>-->
    <div class="theader">
      <ul class='tab' ref="theader">
        <li v-for='(item, index) in thLeftData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, tdData)'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
        <!--服务数据头部-->
        <li v-for='(item, serIndex) in initData[0] && initData[0]["services"]' style="width: 120px" :key="serIndex"  v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
        <li v-else-if='item.sorE === "E"' style="width: 120px"><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
      </ul>
    </div>
    <div class="inner">
      <div class="test" ref="test">
        <!--航班数据-->
        <ul v-for="showItem in tdData" :style="{width: showItem.width}">
          <li v-for="(tdItem, index) in showItem.data" :key="index">{{tdItem}}</li>
        </ul>
        <!--服务数据-->
        <ul v-for='(item, i) in serviceData' :key="i" style="width: 120px">
          <li v-for="serviceItem in item">
            <div v-for="str in serviceItem" style="width: 50%">{{str}}</div>
          </li>
        </ul>
      </div>
    </div>
    <v-footer></v-footer>
    <div class="scroll_bar">
        <div class="scroll" ref="scroll"></div>
    </div>
    <div class="scroll_x">
        <div class="scroll_x_bar" ref="scrollX"></div>
    </div>
  </div>
</template>
<script>
  import footer from './footer.vue'

  import $scrollBar from '../js/jqueryScrollBar.js'
  export default {
      data () {
          return {
              initData: this.$store.state.initData,
              thLeftData: this.$store.state.thLeftData,
              startIndex: 0,
              len: 30
          }
      },
      created () {
          this.$store.dispatch('GET_INIT_DATA', this)

      },
      mounted () {
            this.$nextTick(() => {
              $scrollBar.mouseScroll({vm: this, mergeWrap: this.$refs.wrap, scrollBar: this.$refs.scroll})
              $scrollBar.scroll({vm: this, scrollBar: this.$refs.scroll})
              $scrollBar.scrollX({vm: this, scrollX: this.$refs.scrollX, test: this.$refs.test, wrap: this.$refs.wrap, theader: this.$refs.theader})
              $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.wrap, test: this.$refs.wrap}, this)
            })
      },
      methods: {
        // 表格排序
        sortTable (ev,index, data) {
            console.log(data)
          if(!this.$store.state.isSort) {
            return
          }
          let str = ''
          let arrowNodes
          if(data === this.tdData) {
            str = 'merge'
            arrowNodes = document.querySelector('.theader').querySelectorAll('.arrow');
          }else if(data === this.comeData) {
            str = 'come'
//            arrowNodes = document.querySelector('.divi_content1').querySelectorAll('.arrow');
          }else if(data === this.leaveData) {
            str = 'leave'
//            arrowNodes = document.querySelector('.divi_content2').querySelectorAll('.arrow');
          }
          [].slice.call(arrowNodes).forEach((item) => {
            item.style.display = 'none'
          })



          if(this.target) {

//            [].slice.call(document.getElementsByClassName('tbodyWrap')[0].getElementsByTagName('ul')).forEach((ulDom, i) => {
//              [].slice.call(ulDom.getElementsByTagName('li')).forEach((liNode, liIndex) => {
////                liNode.classList.remove('selectTr')
//              })
//            });

//            if(this.target.nodeName.toLowerCase() === 'li') {
//              this.target.classList.remove('selectLi')
//            } else {
//              this.target.classList.remove('select_span')
//            }
          }
          // console.log(ev.target.sort)


          let arrow
          if(ev.target.nodeName.toLowerCase() === 'li') {
            arrow = ev.target.querySelector('.arrow')
          }else {
            arrow = ev.target.parentNode.querySelector('.arrow')
          }

          if(ev.target.sort) {
            arrow.style.display = 'block'
            arrow.style.borderBottomColor = 'red'
            arrow.style.borderTopColor = 'transparent'
          }else{
            arrow.style.display = 'block'
            arrow.style.borderBottomColor = 'transparent'
            arrow.style.borderTopColor = 'red'
          }

          this.$store.commit('SORT_TABLE', {str, target: ev.target, param: this.$store.state.thLeftData[index]['name'], vm: this})

          // 解决v-for强制刷新列表 this.$forceUpdate()
          //this.$forceUpdate()

        }
      },
      computed:{
        tdData () {
            console.log(this.$store.state.initData.length)
            let showData = []
            this.$store.state.thLeftData.forEach((item) => {
              let arr = {
                  data: [],
                  width: item.width
              }
              this.$store.state.initData.slice(this.startIndex, this.len).forEach((initItem, index) => {
                arr.data.push(initItem[item.name])
              })
              showData.push(arr)
            })
            return showData
        },
        serviceData () {
            let serviceArr = []
            if(!this.$store.state.initData[0]) {
                return
            }
            this.$store.state.initData[0]['services'].forEach((item, index) => {
              let arr = []
              this.$store.state.initData.slice(this.startIndex, this.len).forEach((initItem) => {
                arr.push([initItem['services'][index]['planTime'], initItem['services'][index]['actualTime']])
              })
              serviceArr.push(arr)
            })
            return serviceArr
        },
        length () {
            let lenArr = [...Array(this.$store.state.initData.length).keys()]
            return lenArr
        }
      },
      components: {'v-footer': footer}
  }
</script>
<style>
  .wrap {
    margin-left: 60px;
    width: 80%;
    height: calc(100% - 60px);
    /*overflow-y: scroll;*/
    /*overflow-x: scroll;*/
    position: relative;
  }
  .inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    /*z-index: 1001;*/
  }
  .theader ul {
    display: flex;
    white-space: nowrap;
    position: absolute;
    z-index: 1004;
  }
  .theader ul li{
    height: 34px;
    background: #EBEBEB;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    /*display: flex;*/
    /*float: left;*/
    text-align: center;
    line-height: 34px;
    color: black;
    position: relative;
    cursor: pointer;
  }
  .test {
    margin-top: 34px;
    position: absolute;
    display: flex;
  }
  .test ul {
    float: left;
  }
  .test ul li {
    background: #3B3B3B;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    box-sizing: border-box;
    height: 34px;
    text-align: center;
    line-height: 34px;
    color: #fff;
  }
  .scroll_bar {
    width: 15px;
    height: calc(100% - 34px);
    background-color: red;
    position: absolute;
    left: 100%;
    top: 34px;
    z-index: 1002;
  }
  .scroll_bar .scroll {
    width: 100%;
    height: 50px;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
  }
  .scroll_x {
    position: absolute;
    left: 0;
    bottom: -15px;
    width: 100%;
    height: 15px;
    background: red;
  }
  .scroll_x .scroll_x_bar {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
    background: #fff;
  }
  .merge_title {
    position: relative;
    height: 34px;
    line-height: 34px;
    border: 1px solid black;
    border-left: none;
    box-sizing: border-box;
    background: #fff;
    width: calc(100% + 15px);
  }
  .arrow {
    position: absolute;
    right: 4px;
    top: 50%;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    /*border-top-color: red;*/
    display: none;

  }
  .ww {
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    /*background:  #e8e8e8;*/
    background: red;
    cursor: e-resize;
  }
</style>
