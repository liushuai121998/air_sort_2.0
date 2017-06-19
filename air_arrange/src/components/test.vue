<template>
  <div class="wrap"  ref="wrap">
    <div class='merge_title'>到离港</div>
    <div class="inner" ref="inner">
      <div class="theader">
        <ul class='tab' ref="theader">
          <li v-for='(item, index) in thLeftData' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, tdData)'><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
          <!--服务数据头部-->
          <li v-for='(item, serIndex) in initData[0] && initData[0]["services"]' class='service_thead' :key="serIndex"  v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
          <li v-else-if='item.sorE === "E"' class='service_thead'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
        </ul>
      </div>
      <div class="test" ref="test">
        <!--固定两列-->
        <div class="fix_wrap" ref="fixWrap">
          <ul class="fixed_col">
            <li v-for="len in length" style="width: 40px">{{len + 1}}</li>
          </ul>
          <ul>
            <li v-for="item in fixData" :style="{width: thLeftData[1].width}">{{item}}</li>
          </ul>
        </div>
        <!--航班数据-->
        <div class="content_wrap" ref="contentWrap">
          <ul v-for="(showItem, index) in tdData" :style="{width: showItem.width}">
            <li v-for="(tdItem, i) in showItem.data"  @mousedown='selectTr($event, i, "flight")' :key="i">{{tdItem}}</li>
          </ul>
          <!--服务数据-->
          <ul v-for='(item, index) in serviceData' :key="index" class="service">
            <!--@dblclick='serviceSubmit($event)'-->
            <li v-for="(serviceItem, i) in item" @dblclick='serviceSubmit($event, i, initData, "tdData")'  @mousedown='selectTr($event,i, "service")'>
              <div v-for="str in serviceItem" :class='{unique_service: str != "/", service_show: true}'>{{str}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
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
              len: 30,
              target: null
          }
      },
      created () {
          this.$store.dispatch('GET_INIT_DATA', this)

      },
      mounted () {
            $scrollBar.moveWrapWidth('.tab', '.test')
            $scrollBar.theadFixed(this.$refs.inner, this.$refs.fixWrap, '.tab')
            this.$nextTick(() => {
//              $scrollBar.mouseScroll({vm: this, mergeWrap: this.$refs.wrap, scrollBar: this.$refs.scroll})
//              $scrollBar.scroll({vm: this, scrollBar: this.$refs.scroll})
//              $scrollBar.scrollX({vm: this, scrollX: this.$refs.scrollX, test: this.$refs.test, wrap: this.$refs.wrap, theader: this.$refs.theader})
              $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.wrap, test: this.$refs.wrap}, this)

            })
      },
      updated () {
          $scrollBar.moveWrapWidth('.tab', '.test')
          $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.wrap, test: this.$refs.wrap}, this)
          $scrollBar.theadFixed(this.$refs.inner, this.$refs.fixWrap, '.tab')
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

        },
        serviceSubmit (ev, index, data, diviStr) {
          /*flight的权限*/
          if(ev.target.nodeName.toLowerCase() === 'li') {
            let ulNodes = [].slice.call(ev.target.parentNode.parentNode.getElementsByTagName('ul'));
            let searchIndex = ulNodes.indexOf(ev.target.parentNode)
            if(this.$store.state.authData.flight.indexOf(this.$store.state.thLeftData[searchIndex + 2]['title']) >= 0) {

              this.isShowFlightInfo = true

              this.$http.post('http://192.168.7.53:8080/submitFlight', {
                "flightId":"3U8925",
                "data":"",
                "type":"0",
                "target":"协关",
                "username":"ghms_admin"
              }).then((res) => {
                console.log(res.data)
              })


              this.clickServiceData = data[index]

            }
          }else if(ev.target.nodeName.toLowerCase() === 'div') { // 服务数据 服务权限

            let ulNodes = [].slice.call(ev.target.parentNode.parentNode.parentNode.getElementsByTagName('ul'))
            let searchIndex = ulNodes.indexOf(ev.target.parentNode.parentNode)
            let serviceIndex = searchIndex - this.$store.state.thLeftData.length + 2
            // console.log(serviceIndex)
            if(this.$store.state.authData.service.indexOf(this.$store.state.initData[index]['services'][serviceIndex]['detailName']) >= 0 && ev.target.className.indexOf('unique_service') >= 0) {

              this.isShowSubmit = true
              // 找到对应的服务数据
              this.clickServiceData = data[index]
              this.clickServiceIndex = serviceIndex
              // 索引
              this.saveIndex = index
              this.isDiviScreenStr = diviStr
              // this.$store.commit('UPDATE_FLIGHT_ACTU_TIME', {clickServiceIndex: this.clickServiceIndex, index: this.saveIndex, str: this.isDiviScreenStr,  vm: this})

            }else if(ev.target.className.indexOf('able_submit') >= 0) {

              alert(`航班${this.tdData[index]['flightNo']}不支持提交`)

            }

          }
        },
        selectTr (ev, index, str) {
            console.log('ev.target')
            if(this.target != ev.target) {
                let liNodes = this.$refs.contentWrap.getElementsByTagName('li')
                Array.prototype.slice.call(liNodes).forEach(liNode => {
                    liNode.classList.remove('selectLi')
                })
            }
            this.target = ev.target
            let ulNodes = this.$refs.contentWrap.getElementsByTagName('ul')
            Array.prototype.slice.call(ulNodes).forEach(ulNode => {
                ulNode.getElementsByTagName('li')[index].classList.toggle('selectLi')
            })

        }
      },
      computed:{
        fixData () {
            let showData = []
            this.$store.state.initData.forEach((initItem, index) => {
              showData.push(initItem[this.$store.state.thLeftData[1].name])
            })
            return showData
        },
        tdData () {
            console.log(this.$store.state.initData.length)
            let showData = []
            this.$store.state.thLeftData.slice(2).forEach((item) => {
              let arr = {
                  data: [],
                  width: item.width
              }
              this.$store.state.initData.forEach((initItem, index) => {
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
              this.$store.state.initData.forEach((initItem) => {
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
    height: calc(100% - 34px);
    overflow: auto;
    position: relative;
    /*z-index: 1001;*/
  }
  .theader ul {
    display: flex;
    /*white-space: nowrap;*/
    position: absolute;
    z-index: 1004;
  }
  .theader ul li{
    /*float: left;*/
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
    position: absolute;
    top: 34px;
  }
  .test ul {
    float: left;
    cursor: pointer;
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
    /*text-overflow: ellipsis;*/
    white-space: nowrap;
    /*overflow: hidden;*/
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
    background:  #e8e8e8;
    /*background: red;*/
    cursor: e-resize;
  }
  .qq {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: #e8e8e8;
    /*background: red;*/
    cursor: e-resize;
  }
  .service, .service_thead {
    width: 120px;
  }
  .service .service_show {
    float: left;
    width: 50%;
    height: 100%;
    border-right: 1px solid black;
    box-sizing: border-box;
  }
  .service .service_show:nth-child(2) {
    border-right: none;
  }
  .unique_service {
    background: #f5501f;
  }
  .fix_wrap {
    position: relative;

  }
  .content_wrap ul .selectLi {
    background: #bfa;
  }
</style>
