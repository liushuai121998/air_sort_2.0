<template>
  <div class='wrap' ref='wrap'>
    <template v-if='!isDiviScreen'>
      <div class='merge_wrap' ref='mergeWrap'>
          <div class='merge_title'>到离港</div>
          <div class='contentWrap' ref='contentWrap'>
            <div class='main_content'>
              <div class='theadWrap  scrollX' ref='theadWrap'>
                <ul style='color: #000' class='fixed_thead'>
                  <li style='width: 40px'>序号</li>
                  <li style='width: 102px;'>航班号</li>
                </ul>
                <ul class='tab' style='margin-left: 142px;'>
                  <li v-for='(item, index) in thLeftData.slice(2)' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, tdData)' :class='{sort_li: true}' ><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
                  <!--服务数据头部-->
                  <li v-for='(item, serIndex) in tdData[0] && tdData[0]["services"]' :key="serIndex" :style='{width: serviceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
                  <li v-else-if='item.sorE === "E"' :style='{width: serviceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
                </ul>
              </div>
              <div class='tbodyWrap scrollX scrollTbody' ref='tbodyWrap'>
                <!--固定部分-->
                <div class='index_fixed' ref='fixedIndex'>
                  <ul :style='{width: thLeftData[0]["width"]}'>
                    <!--序号固定-->
                    <li v-for='(len, index) in length' :key="index">{{len}}</li>
                  </ul>
                  <ul :style='{width: thLeftData[1]["width"]}'>
                    <li v-for='(tdItem, index) in tdData' :key="index">{{tdItem["flightNo"]}}</li>
                  </ul>
                </div>
                <div class="move_wrap" ref='moveWrap'>
                  <ul class='move_content' v-for='(item, i) in thLeftData.slice(2)' :key="i" :style='{width: item.width}'>
                    <li v-for="(tdItem, index) in tdData" :key="index"  @dblclick='serviceSubmit($event, tdItem, index, tdData, "tdData")' @mousedown='selectTr($event,index, "merge_wrap")' :class='{first: tdItem["level"]["AOC"] === 1, second: tdItem["level"]["AOC"] === 2, third: tdItem["level"]["AOC"] === 3, forth: tdItem["level"]["AOC"] === 4, fifth: tdItem["level"]["AOC"] === 5, sixth: tdItem["level"]["AOC"] === 6, seven: tdItem["level"]["AOC"] === 7, eight: tdItem["level"]["AOC"] === 8, ninth: tdItem["level"]["AOC"] === 9, tenth: tdItem["level"]["AOC"] === 10, tenFirst: tdItem["level"]["AOC"] === 11, tenSecond: tdItem["level"]["AOC"] === 12}'>{{tdItem[item['name']]}}</li>
                    <!--<li v-for="(tdItem, index) in tdData" :key="index"  @dblclick='serviceSubmit($event, tdItem, index, tdData, "tdData")' @mousedown='selectTr($event,index, "merge_wrap")'>{{tdItem[item['name']]}}</li>-->
                  </ul>
                  <ul v-for='(item, i) in tdData[0] && tdData[0]["services"]' :key="i" :style='{width: serviceWidth[i]["width"]}'>
                    <li v-for='(tdItem, index) in tdData' :key="index" @dblclick='serviceSubmit($event, tdItem, index, tdData, "tdData")' @mousedown='selectTr($event,index, "merge_wrap")' :class='{first: tdItem["level"]["AOC"] === 1, second: tdItem["level"]["AOC"] === 2, third: tdItem["level"]["AOC"] === 3, forth: tdItem["level"]["AOC"] === 4, fifth: tdItem["level"]["AOC"] === 5, sixth: tdItem["level"]["AOC"] === 6, seven: tdItem["level"]["AOC"] === 7, eight: tdItem["level"]["AOC"] === 8, ninth: tdItem["level"]["AOC"] === 9, tenth: tdItem["level"]["AOC"] === 10, tenFirst: tdItem["level"]["AOC"] === 11, tenSecond: tdItem["level"]["AOC"] === 12}'>
                      <!--<li v-for='(tdItem, index) in tdData' :key="index" @dblclick='serviceSubmit($event, tdItem, index, tdData, "tdData")' @mousedown='selectTr($event,index, "merge_wrap")'>-->
                      <span>{{tdItem["services"][i]['planTime']}}</span><!--
                        --><span :class='{unique_service: tdItem["services"][i]["planTime"] && tdItem["services"][i]["planTime"] != "/", able_submit: true}'>{{tdItem["services"][i]['actualTime']}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll_bar">
            <div class="scroll" ref="scroll"></div>
          </div>
          <div class="scroll_x">
            <div class="scroll_x_bar" ref="scrollX"></div>
          </div>
          
      </div>
    </template>
    <template v-if='isDiviScreen'>
      <div class='divi_wrap' >
      <div class='divi_content1' ref='diviContent1'>
          <div class='title_come'>到港</div>
          <div class='contentWrap'>
            <div class='main_content'>
              <div class='theadWrap  scrollX' ref='divi1TheadWrap'>
                <ul style='color: #000' class='fixed_thead'>
                  <li style='width: 40px'>序号</li>
                  <li style='width: 102px;'>航班号</li>
                </ul>
              <ul class='tab'>
                <li v-for='(item, index) in tabComeData.slice(2)' :style='{width: item.width}' :key='index' @mousedown='sortTable($event, index, comeData)' :class='{sort_li: true}' ><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
                <li v-for='(item, serIndex) in comeData[0] && comeData[0]["services"]' :style='{width: comeServiceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
                <li v-else-if='item.sorE === "E"' :style='{width: comeServiceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
              </ul>
              </div>
              <div class='tbodyWrap scrollX scrollTbody'  ref='divi1TbodyWrap'>
                <!--固定部分-->
                <div class='index_fixed ' ref='divi1FixedIndex'>
                  <ul>
                      <!--序号固定-->
                      <li :style='{width: tabComeData[0]["width"]}' v-for='(tdItem, index) in comeData'>{{index + 1}}</li>
                  </ul>
                  <ul>
                      <li v-for='(tdItem, index) in comeData'  :style='{width: tabComeData[1].width}' >{{tdItem["flightNo"]}}</li>
                  </ul>
                </div>
                <div class="move_wrap" ref='divi1MoveWrap'>
                    <ul class='move_content' v-for='(item, i) in tabComeData.slice(2)' :style='{width: item.width, display: "flex", flexDirection: "column", float: "left"}'>
                      <li v-for='(tdItem, index) in comeData'  @dblclick='serviceSubmit($event, tdItem, index, comeData, "comeData")' @mousedown='selectTr($event,index, "divi_content1")' >{{tdItem[item['name']]}}</li>
                    </ul>
                    <ul v-for='(item, i) in comeData[0] && comeData[0]["services"]' :style='{width: comeServiceWidth[i]["width"], display: "flex", flexDirection: "column", float: "left"}'>
                        <li v-for='(tdItem, index) in comeData' @dblclick='serviceSubmit($event, tdItem, index, comeData, "comeData")' @mousedown='selectTr($event,index, "divi_content1")'>
                          <span :style='{display: "inline-block", width: "50%", borderRight: "1px solid black", boxSizing: "border-box", height: "100%"}'>{{tdItem["services"][i]['planTime']}}</span><!--
                          --><span :style='{display: "inline-block", width: "50%", height: "100%"}' :class='{unique_service: tdItem["services"][i]["planTime"] && tdItem["services"][i]["planTime"] != "/", able_submit: true}'>{{tdItem["services"][i]['actualTime']}}</span>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll_bar">
            <div class="scroll" ref='divi1Scroll'></div>
          </div>
          <div class="scroll_x">
            <div class="scroll_x_bar" ref='divi1ScrollX'></div>
          </div>
      </div>
      <div class='divi_content2' ref='diviContent2'>
          <div class='title_leave'><span>离港</span><div class='divi_height_scale'></div></div>
          <div class='contentWrap'>
            <div class='main_content'>
              <div class='theadWrap scrollX' ref='divi2TheadWrap'>
                <ul style='color: #000' class='fixed_thead'>
                  <li style='width: 40px'>序号</li>
                  <li style='width: 102px;'>航班号</li>
                </ul>
                <ul class='tab'>
                  <li v-for='(item, index) in tabLeaveData.slice(2)' :style='{width: item.width}' :key='index' @click='sortTable($event, index, leaveData)' :class='{sort_li: true}' ><span>{{item.title}}</span><span class='arrow'></span><div class='ww'></div></li>
                  <li v-for='(item, serIndex) in leaveData[0] && leaveData[0]["services"]' :style='{width: leaveServiceWidth[serIndex]["width"]}' v-if='item.sorE === "S"'><span>{{item.detailName + '-'}}</span><div class='qq'></div></li>
                  <li v-else-if='item.sorE === "E"' :style='{width: leaveServiceWidth[serIndex]["width"]}'><span>{{item.detailName + '|'}}</span><div class='qq'></div></li>
                </ul>
              </div>
              <div class='tbodyWrap scrollX scrollTbody' ref='divi2TbodyWrap'>
                <!--固定部分-->
                <div class='index_fixed ' ref='divi2FixedIndex'>
                  <ul>
                      <!--序号固定-->
                      <li :style='{width: tabLeaveData[0]["width"]}' v-for='(tdItem, index) in leaveData'>{{index + 1}}</li>
                  </ul>
                  <ul>
                      <li v-for='(tdItem, index) in leaveData'  :style='{width: tabLeaveData[1].width}' >{{tdItem["flightNo"]}}</li>
                  </ul>
                </div>
                <div class="move_wrap" ref='divi2MoveWrap'>
                    <ul class='move_content' v-for='(item, i) in tabLeaveData.slice(2)' :style='{width: item.width, display: "flex", flexDirection: "column", float: "left"}'>
                      <li v-for='(tdItem, index) in leaveData'  @dblclick='serviceSubmit($event, tdItem, index, leaveData, "leaveData")' @mousedown='selectTr($event,index, "divi_content2")' >{{tdItem[item['name']]}}</li>
                    </ul>
                    <ul v-for='(item, i) in leaveData[0] && leaveData[0]["services"]' :style='{width: leaveServiceWidth[i]["width"], display: "flex", flexDirection: "column", float: "left"}'>
                        <li v-for='(tdItem, index) in leaveData' @dblclick='serviceSubmit($event, tdItem, index, leaveData, "leaveData")' @mousedown='selectTr($event,index, "divi_content2")'>
                          <span :style='{display: "inline-block", width: "50%", borderRight: "1px solid black", boxSizing: "border-box", height: "100%"}'>{{tdItem["services"][i]['planTime']}}</span><!--
                          --><span :style='{display: "inline-block", width: "50%", height: "100%"}' :class='{unique_service: tdItem["services"][i]["planTime"] && tdItem["services"][i]["planTime"] != "/", able_submit: true}'>{{tdItem["services"][i]['actualTime']}}</span>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll_bar">
            <div class="scroll" ref='divi2Scroll'></div>
          </div>
          <div class="scroll_x">
            <div class="scroll_x_bar" ref='divi2ScrollX'></div>
          </div>
      </div>
    </div>
    </template>
    <right-content></right-content>
    <!--服务提交的dom-->
    <div class='service_form' v-if='isShowSubmit'>
      <p class='service_title'>服务的提交与取消</p>
      <div class='service_sub'>
        <input type='button' value='提交' @click='confirmSubmit(true)'>
        <input type='button' value='不提交' @click='confirmSubmit(false)'>
        <input type='button' value='取消发布的实际时间' @click='cancelActuTime'>
      </div>
    </div>
    <!--取消时间-->
    <div class='cancel_time' v-if='isShowCancelTime'>
        <p class='cancel_title'>
          确定取消发布的实际时间
        </p>
      <div class='cancel_form'>
        <input type='button' value='确定' @click='confirmCancelTime(true)'>
        <input type='button' value='取消' @click='confirmCancelTime(false)'>
      </div>
    </div>
    <!--航班信息
    -->
    <div class='flight_info' v-if='isShowFlightInfo'>
      <p class='flight_title'>航班信息</p>
      <div class='flight_form'>
        <input type='button' value='确定' @click='confirmFlightInfo(true)'>
        <input type='button' value='取消' @click='confirmFlightInfo(false)'>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import scrollBar from './scrollBar'
  import scrollXBar from './scrollXBar'
  import rightContent from './rightContent'
  import $scrollBar from '../js/jqueryScrollBar'
  import $scrolllTest from '../js/testScroll'
  export default {
    props: ['getTdData'],
    data () {
      return {
        // tdData: this.$store.state.initData,
        //tdData: [],
        //cloneTdData: this.$store.state.cloneInitData,
        cloneInitData: [],
        comeTemp: null,
        leaveTemp: null,
        isFirstUpdate: false,
        isMergeFirstUpdate: false,
        selectTarget: '',
        serviceData: this.$store.state.serviceData,
        // comeData: this.$store.state.comeData,
        // leaveData: this.$store.state.leaveData,
        serviceWidth: this.$store.state.serviceWidth,
        comeServiceWidth: this.$store.state.comeServiceWidth,
        leaveServiceWidth: this.$store.state.leaveServiceWidth,
        target: null,
        /*服务提交与取消*/
        isShowSubmit: false,
        /*点击的服务数据*/
        clickServiceData: null,
        clickServiceIndex: 0,
        /*实离时间的取消发布*/
        isShowCancelTime: false,
        saveIndex: 0,
        isDiviScreenStr: '',
        //航班信息发布的显示
        isShowFlightInfo: false,
        isFirst: true,
        isFirstCommit: false,
        startIndex: 0,
        len: 25,
        comeStartIndex: 0,
        comeLen: 25,
        leaveStartIndex: 0,
        leaveLen: 25
      }
    },
    created () {
      // this.getInitData(this)
      // setInterval(() => {
      //   this.$store.dispatch('FLIGHT_INFO_UPDATE', {vm: this})
      // }, 5000)
      // 发送ajax请求
      this.$store.dispatch('GET_INIT_DATA', this)
    },
    mounted () {
      $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.mergeWrap, scrollBar: this.$refs.scroll, tbodyWrap: this.$refs.tbodyWrap, moveWrap: this.$refs.moveWrap, fixedIndex: this.$refs.fixedIndex})
      // $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.diviContent1, scrollBar: this.$refs.divi1Scroll, tbodyWrap: this.$refs.divi1TbodyWrap, moveWrap: this.$refs.divi1MoveWrap, fixedIndex: this.$refs.divi1FixedIndex})
      // $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.diviContent2, scrollBar: this.$refs.divi2Scroll, tbodyWrap: this.$refs.divi2TbodyWrap, moveWrap: this.$refs.divi2MoveWrap, fixedIndex: this.$refs.divi2FixedIndex})
      $scrolllTest.scroll({vm: this, scrollBar: this.$refs.scroll, moveWrap: this.$refs.moveWrap, tbodyWrap: this.$refs.tbodyWrap, fixedIndex: this.$refs.fixedIndex})
      
     if(this.$store.state.isDiviScreen) {
        this.$refs.diviContent1.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        this.$refs.diviContent2.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        $scrollBar.theadFixed(this.$refs.diviContent1, '.contentWrap', '.theadWrap')
        $scrollBar.theadFixed(this.$refs.diviContent2, '.contentWrap', '.theadWrap')
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)

        $scrollBar.moveWrapWidth(this.$refs.diviContent1, '.move_wrap', '.tab')
        $scrollBar.moveWrapWidth(this.$refs.diviContent2, '.move_wrap', '.tab')

        $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.diviContent1, scrollBar: this.$refs.divi1Scroll, tbodyWrap: this.$refs.divi1TbodyWrap, moveWrap: this.$refs.divi1MoveWrap, fixedIndex: this.$refs.divi1FixedIndex})
        $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.diviContent2, scrollBar: this.$refs.divi2Scroll, tbodyWrap: this.$refs.divi2TbodyWrap, moveWrap: this.$refs.divi2MoveWrap, fixedIndex: this.$refs.divi2FixedIndex})
     }else {
//         this.$nextTick(() => {
//           $scrollBar.showEclips()
//         })
        // $scrollBar.theadFixed(this.$refs.mergeWrap, '.contentWrap', '.theadWrap')
        this.$refs.mergeWrap.style.height = document.documentElement.clientHeight - 60 + 'px'

        $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null}, this)

        $scrollBar.moveWrapWidth(this.$refs.mergeWrap, '.move_wrap', '.tab')
        //$scrollBar.mouseScroll({vm: this, mergeWrap: this.$refs.mergeWrap})

     }
     this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'
     
    },
    beforeUpdate () {
        console.time('start')
    },
    updated () {
        console.timeEnd('start')
      if(!this.isFirstCommit) {
        this.isFirstCommit = true
        this.$store.dispatch('SHOW_CONTENT', {val: this.$store.state.username, vm: this})
      }
      if(!this.$store.state.isDiviScreen) {
                let rightContent = document.querySelector('.merge_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
            } else {
                let rightContent = document.querySelector('.divi_wrap').querySelector('.right_message')
                this.$store.commit('RIGHT_CONTENT', {vm: this, rightContent})
          }
      if(this.$store.state.isDiviScreen && !this.isFirstUpdate) {
        // 第一次进入
        this.isFirstUpdate = true
        this.isMergeFirstUpdate = false
        this.$refs.diviContent1.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        this.$refs.diviContent2.style.height = (document.documentElement.clientHeight - 60) / 2 + 'px'
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)
        $scrollBar.widthScale('.tab', {mergeWrap: null, diviContent1: this.$refs.diviContent1, diviContent2: this.$refs.diviContent2}, this)

        $scrollBar.theadFixed(this.$refs.diviContent1, '.contentWrap', '.theadWrap')
        $scrollBar.theadFixed(this.$refs.diviContent2, '.contentWrap', '.theadWrap')

        this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.moveWrapWidth(this.$refs.diviContent1, '.move_wrap', '.tab')
        $scrollBar.moveWrapWidth(this.$refs.diviContent2, '.move_wrap', '.tab')

        $scrollBar.diviHeightScale('.divi_height_scale', '.scrollTbody', { divi1: this.$refs.diviContent1, divi2: this.$refs.diviContent2 })
        
        $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.diviContent1, scrollBar: this.$refs.divi1Scroll, tbodyWrap: this.$refs.divi1TbodyWrap, moveWrap: this.$refs.divi1MoveWrap, fixedIndex: this.$refs.divi1FixedIndex})
        $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.diviContent2, scrollBar: this.$refs.divi2Scroll, tbodyWrap: this.$refs.divi2TbodyWrap, moveWrap: this.$refs.divi2MoveWrap, fixedIndex: this.$refs.divi2FixedIndex})

      }else if(!this.$store.state.isDiviScreen && !this.isMergeFirstUpdate){
        // 第一次进入
        $scrollBar.theadFixed(this.$refs.mergeWrap, '.contentWrap', '.theadWrap')
        this.isMergeFirstUpdate = true
        this.isFirstUpdate = false
        this.$refs.mergeWrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.widthScale('.tab', {mergeWrap: this.$refs.mergeWrap, diviContent1: null, diviContent2: null}, this)

        this.$refs.wrap.style.height = document.documentElement.clientHeight - 60 + 'px'
        $scrollBar.moveWrapWidth(this.$refs.mergeWrap, '.move_wrap', '.tab')

        $scrolllTest.mouseScroll({vm: this, mergeWrap: this.$refs.mergeWrap, scrollBar: this.$refs.scroll, tbodyWrap: this.$refs.tbodyWrap, moveWrap: this.$refs.moveWrap, fixedIndex: this.$refs.fixedIndex})
        $scrolllTest.scroll({vm: this, scrollBar: this.$refs.scroll, moveWrap: this.$refs.moveWrap, tbodyWrap: this.$refs.tbodyWrap, fixedIndex: this.$refs.fixedIndex})
        $scrolllTest.scrollX({vm: this, scrollX: this.$refs.scrollX, moveWrap: this.$refs.moveWrap, wrap: this.$refs.contentWrap, tab: '.tab'})
      }
      // $scrolllTest.scroll({vm: this, scrollBar: this.$refs.scroll, tbodyWrap: this.$refs.tbodyWrap})
      // $scrolllTest.scrollX({vm: this, scrollX: this.$refs.scrollX, moveWrap: this.$refs.moveWrap, wrap: this.$refs.contentWrap, tab: '.tab'})
    },
    methods: {
      /*选中的tr*/
      selectTr(ev, index, str) {
        if(!this.target) {
          this.target = ev.target
        }
        // 删除class

        if(this.target != ev.target) {
          if(this.target.nodeName.toLowerCase() === 'li') {

            this.target.classList.remove('selectLi');
            [].slice.call(document.querySelector('.' + str).getElementsByClassName('tbodyWrap')[0].getElementsByTagName('ul')).forEach((ulDom, i) => {
              [].slice.call(ulDom.getElementsByTagName('li')).forEach((liNode, liIndex) => {
                liNode.classList.remove('selectTr')
              })
            })

          }else if(this.target.nodeName.toLowerCase() === 'span') {

            this.target.classList.remove('select_span');
            [].slice.call(document.querySelector('.' + str).getElementsByClassName('tbodyWrap')[0].getElementsByTagName('ul')).forEach((ulDom, i) => {
              [].slice.call(ulDom.getElementsByTagName('li')).forEach((liNode, liIndex) => {
                liNode.classList.remove('selectTr')
              })
            })
          }
          this.target = ev.target

        }
        // 添加class
        if(ev.target.nodeName.toLowerCase() === 'li') {
          ev.target.classList.add('selectLi');
          [].slice.call(document.querySelector('.' + str).getElementsByClassName('tbodyWrap')[0].getElementsByTagName('ul')).forEach((ulDom, i) => {
              ulDom.getElementsByTagName('li')[index].classList.add('selectTr')
          })

        } else if(ev.target.nodeName.toLowerCase() === 'span') {
          console.log('hello')
          ev.target.classList.add('select_span');
          [].slice.call(document.querySelector('.' + str).getElementsByClassName('tbodyWrap')[0].getElementsByTagName('ul')).forEach((ulDom, i) => {
            ulDom.getElementsByTagName('li')[index].classList.add('selectTr')
          })
        }


      },
      // 表格排序
      sortTable (ev,index, data) {
        if(!this.$store.state.isSort) {
          return
        }
        let str = ''
        let arrowNodes
        if(data === this.tdData) {
          str = 'merge'
          arrowNodes = document.querySelector('.merge_wrap').querySelectorAll('.arrow');
        }else if(data === this.comeData) {
          str = 'come'
          arrowNodes = document.querySelector('.divi_content1').querySelectorAll('.arrow');
        }else if(data === this.leaveData) {
          str = 'leave'
          arrowNodes = document.querySelector('.divi_content2').querySelectorAll('.arrow');
        }
        [].slice.call(arrowNodes).forEach((item) => {
          item.style.display = 'none'
        })



       if(this.target) {

         [].slice.call(document.getElementsByClassName('tbodyWrap')[0].getElementsByTagName('ul')).forEach((ulDom, i) => {
           [].slice.call(ulDom.getElementsByTagName('li')).forEach((liNode, liIndex) => {
             liNode.classList.remove('selectTr')
           })
         });

          if(this.target.nodeName.toLowerCase() === 'li') {
            this.target.classList.remove('selectLi')
          } else {
            this.target.classList.remove('select_span')
          }
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
       this.$store.commit('SORT_TABLE', {str, target: ev.target, param: this.thLeftData.slice(2)[index]['name'], vm: this})

        // 解决v-for强制刷新列表 this.$forceUpdate()
         //this.$forceUpdate()

      },
      /*
      提交服务serviceSubmit
      */
      serviceSubmit (ev, item, index, data, diviStr) {
        /*flight的权限*/
       //  console.log(this.$store.state.authData.flight)
        // console.log(ev.target)
        if(ev.target.nodeName.toLowerCase() === 'li') {
          console.log(ev.target.parentNode.parentNode)
          let ulNodes = [].slice.call(ev.target.parentNode.parentNode.getElementsByTagName('ul'));
          let searchIndex = ulNodes.indexOf(ev.target.parentNode)
          console.log(searchIndex)
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


            this.clickServiceData = this.$store.state.initData[this.startIndex + index]

          }
        }else if(ev.target.nodeName.toLowerCase() === 'span') { // 服务数据 服务权限

          let ulNodes = [].slice.call(ev.target.parentNode.parentNode.parentNode.getElementsByTagName('ul'));
          let searchIndex = ulNodes.indexOf(ev.target.parentNode.parentNode)
          let serviceIndex = searchIndex - this.$store.state.thLeftData.length + 2
          console.log(serviceIndex)
          if(this.$store.state.authData.service.indexOf(item['services'][serviceIndex]['detailName']) >= 0 && ev.target.className.indexOf('unique_service') >= 0) {

            this.isShowSubmit = true
            // 找到对应的服务数据
            this.clickServiceData = this.$store.state.initData[this.startIndex + index]
            this.clickServiceIndex = serviceIndex
            // 索引
            this.saveIndex = this.startIndex + index
            this.isDiviScreenStr = diviStr

            this.$store.commit('UPDATE_FLIGHT_ACTU_TIME', {clickServiceIndex: this.clickServiceIndex, index: this.saveIndex, str: this.isDiviScreenStr,  vm: this})

          }else if(ev.target.className.indexOf('able_submit') >= 0) {

            alert(`航班${this.tdData[index]['flightNo']}不支持提交`)

          }

        }
      },
      /*服务提交的确认与取消*/
      confirmSubmit (isConfirm) {
        if(isConfirm) {
          // 提交服务
          this.$store.commit('IS_GET_PARAM_TIME', {vm: this, isGet: true})

          setTimeout(() => {
            // console.log(this.$store.state.updateTime, '+++++', this.clickServiceData["services"][this.clickServiceIndex]["detailNo"])
            this.$http.post('http://192.168.7.53:8080/submitService', {
                          "flightId": this.clickServiceData["flightId"],
                          "time": this.$store.state.updateTime,
                          "isCancel": "0",
                          "detailNo": this.clickServiceData["services"][this.clickServiceIndex]["detailNo"],
                          "sore": this.clickServiceData["services"][this.clickServiceIndex]["sorE"],
                          //"username": this.$store.state.username
                          "username": "ghms_admin"
                      }).then((res) => {

                          console.log(res.data)
                          // this.$store.commit('IS_GET_PARAM_TIME', {vm: this, isGet: false})
                      })
          }, 2000)
          // this.$http.post('http://192.168.7.53:8080/submitService', {
          //     "flightId":"3U8925",
          //     "time":"0004",
          //     "isCancel":"0",
          //     "detailNO":"0113",
          //     "sore":"E",
          //     "username":"ghms_admin"
          // }).then((res) => {
          //     console.log(res.data)
          // })

        }
        this.isShowSubmit = false
      },
      /*取消发布实离时间*/
      cancelActuTime () {

        this.isShowSubmit = false
        this.isShowCancelTime = true

      },
      confirmCancelTime (isConfirm) {
        if(isConfirm) {
          if(this.clickServiceData['services'][this.clickServiceIndex]['actualTime'] === '/') {
            this.isShowCancelTime = false
            return
          }
          // 取消发布时间 发送请求
          this.$store.commit('IS_GET_PARAM_TIME', {vm: this, isGet: true})
          setTimeout(() => {
            console.log(this.$store.state.updateTime, '+++++', this.clickServiceData["services"][this.clickServiceIndex]["detailNo"])
            this.$http.post('http://192.168.7.53:8080/submitService', {
                          "flightId": this.clickServiceData["flightId"],
                          "time": this.$store.state.updateTime,
                          "isCancel": "0",
                          "detailNo": this.clickServiceData["services"][this.clickServiceIndex]["detailNo"],
                          "sore": this.clickServiceData["services"][this.clickServiceIndex]["sorE"],
                          //"username": this.$store.state.username
                          "username": "ghms_admin"
                      }).then((res) => {

                          console.log(res.data)
                          // this.$store.commit('IS_GET_PARAM_TIME', {vm: this, isGet: false})
                      })
          }, 2000)

          // 取消发布时间
          this.$store.commit('CANCEL_TIME', {vm: this})
        }
        this.isShowCancelTime = false
      },

      /*航班信息
      */
      confirmFlightInfo (isConfirm) {
        if(isConfirm) {
          alert(this.clickServiceData['flightNo'])
        }
        this.isShowFlightInfo = false
      }
    },
    computed: {
      tdData () {
        return this.$store.state.initData.slice(this.startIndex, this.len)
      },
      thLeftData () {
        return this.$store.state.thLeftData
      },
      // 到港数据
      tabComeData () {

        return this.$store.state.tabComeData
      },
      // 离港数据
      tabLeaveData () {

        return this.$store.state.tabLeaveData
      },
      thRightData () {

        return this.$store.state.thRightData

      },
      isDiviScreen () {
        return this.$store.state.isDiviScreen
      },
      length () {
        let arr = [];

          Array.prototype.range = function ( start,end ){
            let _self = this;
            let length = end - start +1;
            let step = start - 1;
            return Array.apply(null,{length:length}).map(function (v,i){step++;return step;});
          }
          return arr.range(this.startIndex + 1, this.len)
      },
      comeData () {
        return this.$store.state.comeData.slice(this.comeStartIndex, this.comeLen)
      },
      leaveData () {
        return this.$store.state.leaveData.slice(this.leaveStartIndex, this.leaveLen)
      }
    },
    components: {'scroll-bar': scrollBar, 'scroll-x-bar': scrollXBar, 'right-content': rightContent}
  }
</script>
<style scoped>

  .divi_wrap:after {
    content: '';
    display: block;
    clear: both;
  }
  .divi_wrap {
    width: 85%;
  }
  .divi_wrap .divi_content1, .divi_wrap .divi_content2 {
    position: relative;
    width: 100%;
    float: left;

  }
  .divi_wrap .divi_content2 {
    z-index: 2000;
  }

  .divi_wrap .divi_content1 .contentWrap, .divi_wrap .divi_content2 .contentWrap {
    width: 100%;
  }

  .divi_content2 .divi_height_scale {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    cursor: n-resize;
  }

  .wrap{
    margin-left: 60px;
    width: calc(100% - 60px);
    overflow: hidden;
    position: relative;
  }
  .wrap:after{
    content: '';
    display: block;
    clear: both;
  }
  .merge_wrap {
    width: 85%;
    position: relative;
  }

  .merge_wrap:after {
    content: '';
    display: block;
    clear: both;
  }
  .merge_title {
    position: relative;
    height: 34px;
    line-height: 34px;
    border: 1px solid black;
    border-left: none;
    box-sizing: border-box;
    background: #fff;
  }

  .contentWrap {
    width: 100%;
    float: left;
    box-sizing: border-box;
    border-right: 1px solid black;
  }
  .contentWrap .main_content {
    /*white-space: nowrap;*/
  }
  .theadWrap ul {
    display: flex;
    position: absolute;
  }
  .title_come, .title_leave {
    position: relative;
    background: #fff;
    height: 34px;
    line-height: 34px;
    border: 1px solid black;
    border-left: none;
    box-sizing: border-box;
  }
  .title_leave {
    background: #fff;
  }

  .contentWrap ul{
    /*width: auto;*/
    box-sizing: border-box;
    font-size: 0;
    cursor: pointer;
  }
  .contentWrap {
    position: relative;
    height: calc(100% - 34px);
    overflow: hidden;
    /*overflow-x: scroll;*/
    /*overflow-x: scroll;*/
  }
  .contentWrap .main_content {
    height: 100%;
  }
  .contentWrap .main_content .theadWrap  {
    position: absolute;
    left: 0;
    top: 0;
  }
  .contentWrap .main_content .tbodyWrap {
    height: calc(100% - 34px);
    width: 100%;
    position: relative;
    left: 0;
    top: 34px;
  }

  .theadWrap{
    position: relative;
    z-index: 99;
  }

  .theadWrap ul li {
    background: #ebebeb;
  }
  .tbodyWrap ul li {
    background: #3b3b3b;
    color: #fff;
  }
  .tbodyWrap ul li:nth-of-type(2) {
    /*text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;*/
  }
  /*.tbodyWrap ul li:nth-of-type(even) {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }*/
  .wrap ul li {
    display: inline-block;
    border: 1px solid black;
    border-left: none;
    border-top: none;
    box-sizing: border-box;
    /*text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;*/
    font-size: 16px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }
  /*搜索索引*/
  .tbodyWrap .searchTd li{
    background: #bfa;
  }
  .contentWrap .tbodyWrap  .selectTr{

    background: #B8CF00;

  }
  .contentWrap .tbodyWrap .selectUl li {
    background: #B8CF00;
  }
  .theadWrap li {
    position: relative;
  }
  .ww {
    /*float: right;*/
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background:  #e8e8e8;
    cursor: e-resize;
  }
  .qq {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: #e8e8e8;
    cursor: e-resize;
  }
  .wrap .contentWrap .tbodyWrap ul .selectLi {
    background: #02BDF2;
    box-sizing: border-box;
  }
  .wrap .contentWrap .tbodyWrap ul .select_span {
    background: #02BDF2;
    box-sizing: border-box;
  }

  /*排序箭头*/
  .wrap li.sort_li .arrow {
    position: absolute;
    right: 4px;
    top: 50%;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    /*border-top-color: red;*/
    display: none;
  }
  .divi_content1 .contentWrap {
    height: calc(100% - 30px);
  }
  .divi_content1 .main_content{
    /*height: calc(100% - 32px);
    overflow: hidden;*/
  }
  /*服务提交与取消部分*/
  .cancel_time, .service_form, .flight_info{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 9999;
    width: 300px;
    height: 100px;
    background: #fff;
    border: 1px solid #02BDF2;
    border-radius: 5px;
  }
  .flight_info .flight_title, .cancel_time .cancel_title, .service_form .service_title {
    text-align: center;
    margin: 20px 0;
  }
  .flight_info .flight_form, .cancel_time .cancel_form, .service_form .service_sub {
    text-align: center;
  }
  /*实离时间
  */
  .unique_service {
    background: #f5501f;
  }
  /*将左侧固定*/
  .wrap .index_fixed {
    position: relative;
    left: 0;
    top: 0;
    float:left;
    z-index: 1;
  }
  .index_fixed ul, .move_wrap ul{
    display: flex;
    flex-direction: column;
    float: left;
  }
  .theadWrap .index_fixed{
    z-index: 9999;
  }
  .move_wrap:after{
    content: '';
    display: block;
    clear: both;
  }
  .move_wrap {
    position: relative;
    left: 0;
    top: 0;
  }
  .move_wrap ul span {
    width: 50%;
    display: inline-block;
    border-right: 1px solid black;
    box-sizing: border-box;
    height: 100%;
  }
  .move_wrap ul span.able_submit {
    border-right: none;
  }
  .move_wrap ul .first {
    background: #31849B;
    color: #000;
  }
  /*E5E0EC*/
  .move_wrap ul .second {
    background: #E5E0EC;
    color: #000;
  }
  .move_wrap ul .third {
    background: #FCD5B4;
    color: #000;
  }
  /*B2A1C7 E6B9B8 D7E4BC*/
  .move_wrap ul .forth {
    background: #FCD5FF;
    color: #000;
  }
  .move_wrap ul .fifth {
    background: #B2A1C7;
    color: #000;
  }
  .move_wrap ul .sixth {
    background: #E6B9B8;
    color: #000;
  }
  .move_wrap ul .seven {
    background: #D7E4BC;
    color: #000;
  }
  .move_wrap ul .eight {
    background: #D7E4EE;
    color: #000;
  }
  .move_wrap ul .ninth {
    background: #538ED5;
    color: #000;
  }
  .move_wrap ul .tenth {
    background: #efa;
    color: #000;
  }
  .tbodyWrap ul li.tenFirst {
    background: #111;
  }
  .tbodyWrap ul li.tenSecond {
    background: #222;
  }

  .scroll_bar {
    position: absolute;
    left: 100%;
    top: 68px;
    z-index: 1002;
    width: 15px;
    height: calc(100% - 68px);
    background-color: #fff;
  }
  .scroll_bar .scroll {
    width: 100%;
    /*height: 50px;*/
    background: #aaa;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1003;
  }
  .scroll_x {
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 15px;
    background: #aaa;
    z-index: 9999;
  }
  .scroll_x .scroll_x_bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #fff;
  }
  .fixed_thead {
    position: relative;
    z-index: 999;
  }
  .divi_content1 .tab, .divi_content2 .tab{
    margin-left: 142px; 
  }
</style>
