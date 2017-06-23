import css from '../utils/transform.js'
export default {
    /**
     * 滚动条滚动
     * @param {*} el
     * @param {*} tal
     */
    resize(scrollx, scroll, { merge, divi1, divi2 }, { content }, isDiviScreen) {
        // function resizeWrap() {
        //     let divi1Dom = document.querySelector(divi1)
        //     let divi2Dom = document.querySelector(divi2)
        //     let mergeDom = document.querySelector(merge)
        //     if (isDiviScreen) {
        //         let scrollXDom1 = divi1Dom.querySelector(scrollx)
        //         scrollXDom1.parentNode.style.width = divi1Dom.querySelector(content).offsetWidth + 'px'
        //         let scrollXDom2 = divi2Dom.querySelector(scrollx)
        //         scrollXDom2.parentNode.style.width = divi2Dom.querySelector(content).offsetWidth + 'px'
        //     } else {
        //         let mergeScrollx = mergeDom.querySelector(scrollx)
        //         mergeScrollx.parentNode.style.width = mergeDom.querySelector(content).offsetWidth + 'px'
        //         let mergeScroll = mergeDom.querySelector(scroll)
        //         css(mergeScroll.parentNode, 'translateX', mergeDom.querySelector(content).offsetWidth)
        //     }
        // }
        // resizeWrap()
        //
        // window.onresize = function() {
        //     resizeWrap()
        // }
    },
    widthScale(el, { mergeWrap, test }, vm) {
        // console.log(this)
        let $scorll = this
        if (mergeWrap) {
            vm.$nextTick(() => {
                scale(mergeWrap)
            })
        } else {
            // vm.$nextTick(() => {
            //     scale(diviContent1)
            //     scale(diviContent2)
            // })
        }

        function scale(parent) {
            let elDom = parent.querySelector(el);
            let divs = elDom.getElementsByTagName('div');
            let divArr = [].slice.call(divs)
                // let ulDoms = parent.getElementsByClassName('contentWrap')[0].getElementsByClassName('scrollTbody')[0].querySelectorAll('ul')
            let ulDoms = test.getElementsByTagName('ul')
            divArr.forEach((divDom, index) => {
                divDom.addEventListener('mousedown', function(ev) {

                    vm.$store.commit('UPDATE_IS_SORT', false)
                    ev.preventDefault();
                    // 阻止事件冒泡
                    ev.stopPropagation();
                    let that = this
                    that.startPointX = ev.clientX
                    that.width = that.parentNode.offsetWidth
                    document.addEventListener('mousemove', callback)

                    function callback(ev) {

                        that.movePointX = ev.clientX
                        let width = that.width + that.movePointX - that.startPointX
                        let liNodes = that.parentNode.parentNode.getElementsByTagName('li')
                        let liIndex = [].slice.call(liNodes).indexOf(that.parentNode)

                        if (liIndex === 0 || liIndex === 1) {
                            return
                        }

                        that.parentNode.style.width = width + 'px';
                        // ulDoms[liIndex].style.width = width + 'px';
                        ulDoms[liIndex + 1].style.width = width + 'px'

                    }
                    document.addEventListener('mouseup', mouseUpEnd)

                    function mouseUpEnd() {
                        vm.$store.commit('UPDATE_IS_SORT', true)
                        $scorll.moveWrapWidth('.tab', '.test')
                        document.removeEventListener('mousemove', callback)
                        document.removeEventListener('mouseup', mouseUpEnd)
                    }
                })


            })
        }

    },
    /**
     * 分屏高度拉伸
     * @param {*} el
     */
    diviHeightScale(el, scrollEl, scrollTbody, { divi1, divi2, $scrollBar }) {
        // 元素刚开始的位置
        let elementPoint = {
                top: 0,
                offsetHeight: 0
            }
            // 鼠标点击的位置
        let startPoint = {
                top: 0
            }
            // 鼠标移动的位置
        let movePoint = {
                top: 0
            }
            // 分屏1
        let divi1ElementPoint = {
                offsetHeight: 0
            }
            // 分屏2
        let dom = divi2.querySelector(el)

        // 分屏1的滚动条
        let divi1Scroll = divi1.querySelector(scrollEl)
            // 分屏2的滚动条
        let divi2Scroll = divi2.querySelector(scrollEl)

        // 滚动区域
        let scrollTbody1 = divi1.querySelectorAll(scrollTbody)
        let scrollTbody2 = divi2.querySelectorAll(scrollTbody)

        // 滚动条的信息
        let scrollParent1 = {
            height: 0
        }
        let scrollParent2 = {
            height: 0
        }
        dom.addEventListener('mousedown', downCallback)

        function downCallback(ev) {
            ev.preventDefault();
            ev.stopPropagation();
            startPoint.top = ev.clientY
            elementPoint.offsetHeight = divi2.offsetHeight

            divi1ElementPoint.offsetHeight = divi1.offsetHeight

            scrollParent1.height = divi1Scroll.parentNode.offsetHeight
            scrollParent2.height = divi2Scroll.parentNode.offsetHeight

            document.addEventListener('mousemove', moveCallback)

            function moveCallback(ev) {
                movePoint.top = ev.clientY
                divi2.style.height = elementPoint.offsetHeight + startPoint.top - movePoint.top + 'px'
                divi1.style.height = divi1ElementPoint.offsetHeight + movePoint.top - startPoint.top + 'px'
                    // 更新滚动条
                divi1Scroll.parentNode.style.height = scrollParent1.height + movePoint.top - startPoint.top + 'px'
                divi2Scroll.parentNode.style.height = scrollParent2.height + startPoint.top - movePoint.top + 'px'

                divi1Scroll.style.height = ((divi1Scroll.parentNode.offsetHeight) * (divi1Scroll.parentNode.offsetHeight)) / scrollTbody1[0].offsetHeight + 'px'
                divi2Scroll.style.height = ((divi2Scroll.parentNode.offsetHeight) * (divi2Scroll.parentNode.offsetHeight)) / scrollTbody2[0].offsetHeight + 'px'


            }
            document.addEventListener('mouseup', upCallback)

            function upCallback() {
                // console.log(movePoint.top - startPoint.top)
                document.removeEventListener('mousemove', moveCallback)
                document.removeEventListener('mouseup', upCallback)
            }
        }
    },
    /**
     * 滚动条滚动事件
     * @param {*} param0 
     */
    scroll({ vm, scrollBar, moveWrap, tbodyWrap, fixedIndex }) {
        let length = vm.$store.state.initData.length
            // let liHeight = document.querySelectorAll('li')[0].offsetHeight
        let totalHeight = length * 34
        scrollBar.style.height = (scrollBar.parentNode.offsetHeight * scrollBar.parentNode.offsetHeight) / totalHeight + 'px'
        moveWrap.style.height = totalHeight + 'px'
        console.log(moveWrap.offsetHeight)
        setTimeout(() => {
            let liHeight = 34
            let totalHeight = length * liHeight
            scrollBar.style.height = (scrollBar.parentNode.offsetHeight * scrollBar.parentNode.offsetHeight) / totalHeight + 'px'
        }, 20)

        scrollBar.addEventListener('mousedown', downCallback)

        let maxT
        let timeout = ''
        let maxMove

        function downCallback(ev) {
            maxT = scrollBar.parentNode.offsetHeight - scrollBar.offsetHeight
            maxMove = moveWrap.offsetHeight - scrollBar.parentNode.offsetHeight + 15 + 34
            this.initY = this.offsetTop
            this.downY = ev.clientY
            let that = this
            document.addEventListener('mousemove', moveCallback)
            document.addEventListener('mouseup', upCallback)

            function moveCallback(ev) {
                that.moveY = ev.clientY
                let T = that.moveY - that.downY + that.initY

                if (T < 0) {
                    T = 0
                    vm.startIndex = 0
                    vm.len = 25

                } else if (T > maxT) {
                    T = maxT
                    vm.len = vm.$store.state.initData.length + 1
                    vm.startIndex = vm.len - 25
                }
                let scale = T / maxT
                that.style.top = T + 'px'
                moveWrap.style.top = -maxMove * scale + 'px'
                tbodyWrap.style.top = maxMove * scale + 34 + 'px'
                fixedIndex.style.top = -maxMove * scale + 'px'
                    // if ((maxMove * scale) % 34 === 0) {
                    //     tbodyWrap.style.top = maxMove * scale + 34 + 'px'
                    //         // fixedIndex.style.top = -maxMove * scale + 'px'
                    // } else {
                    //     if (vm.len > vm.$store.state.initData.length) {
                    //         return
                    //     }
                    //     console.log((maxMove * scale) % 34, '%%%%')
                    //     tbodyWrap.style.top = maxMove * scale + 34 - (maxMove * scale) % 34 + 'px'
                    // }
                clearTimeout(timeout)

                timeout = setTimeout(() => {
                    let scale = T / maxT
                    if ((maxMove * scale) % 34 === 0) {
                        tbodyWrap.style.top = maxMove * scale + 34 + 'px'
                    } else {
                        tbodyWrap.style.top = maxMove * scale + 34 - (maxMove * scale) % 34 + 'px'
                    }

                    if (scale === 0) {
                        vm.len = 25
                        vm.startIndex = 0
                        return
                    } else if (scale === 1) {
                        vm.len = vm.$store.state.initData.length + 1
                        vm.startIndex = vm.len - 25
                        return
                    }

                    vm.len = scale * vm.$store.state.initData.length | 0

                    console.log(vm.len)

                    if (vm.len <= 25) {
                        vm.len = 25
                    } else if (vm.len >= vm.$store.state.initData.length) {
                        vm.len = vm.$store.state.initData.length
                    }
                    vm.startIndex = vm.len - 25
                }, 0)

            }

            function upCallback() {
                // scrollBar.removeEventListener('mousedown', downCallback)
                document.removeEventListener('mousemove', moveCallback)
                document.removeEventListener('mouseup', upCallback)
            }
        }
    },
    /**
     * 鼠标滚轮滚动
     * (解决) 鼠标向下滚 页面向上
     *        鼠标向上滚 页面向下
     * @param {*} el
     * @param {*} tal
     */
    mouseScroll({ vm, mergeWrap, scrollBar, tbodyWrap, moveWrap, fixedIndex }) {

        let maxT
        let come = true
        let maxMove
        moveWrap.style.height = vm.$store.state.initData.length * 34 + 'px'
        setTimeout(() => {
            maxT = scrollBar.parentNode.offsetHeight - scrollBar.offsetHeight
            maxMove = moveWrap.offsetHeight - scrollBar.parentNode.offsetHeight + 15
        })

        if (mergeWrap) {
            mouseMove(mergeWrap, { startIndex: vm.startIndex, len: vm.len })
        } else {
            mouseMove(mergeWrap, { startIndex: vm.comeStartIndex, len: vm.comeLen })
            mouseMove(mergeWrap, { startIndex: vm.leaveStartIndex, len: vm.leaveLen })
        }

        function mouseMove(parent) {
            /**
             *
             * @param {*事件对象} obj
             * @param {*事件类型} type
             * @param {*回调函数} fn
             */
            function addEvent(obj, type, fn) {
                if (obj.attachEvent) {
                    // IE
                    obj.attachEvent('on' + type, fn)
                } else {
                    // chrome和fireFox
                    obj.addEventListener(type, fn, false)
                }
            }
            // chrome IE
            addEvent(parent, 'mousewheel', function(ev) {
                maxT = scrollBar.parentNode.offsetHeight - scrollBar.offsetHeight

                if (ev.wheelDelta > 0) {
                    come = true
                    vm.startIndex -= 4
                    vm.len -= 4

                    if (vm.startIndex < 0) {
                        vm.startIndex = 0
                        vm.len = 25
                        scrollBar.style.top = 0
                        return
                    } else if (vm.len > vm.$store.state.initData.length) {
                        vm.len = vm.$store.state.initData.length + 1
                        vm.startIndex = vm.len - 25
                        scrollBar.style.top = maxT + 'px'
                        return
                    }

                    let scale = vm.len / vm.$store.state.initData.length
                    scrollBar.style.top = scale * maxT + 'px'
                    moveWrap.style.top = -maxMove * scale + 'px'
                    tbodyWrap.style.top = maxMove * scale + 34 + 'px'
                    fixedIndex.style.top = -maxMove * scale + 'px'
                } else if (ev.wheelDelta < 0) {
                    if (!come) {
                        return
                    }

                    // 向下滚 滚动条向下滚
                    vm.startIndex += 4
                    vm.len += 4
                    if (vm.len >= vm.$store.state.initData.length) {
                        vm.len = vm.$store.state.initData.length + 1
                        vm.startIndex = vm.len - 25
                        come = false
                        return
                    }

                    let scale = vm.len / vm.$store.state.initData.length
                    scrollBar.style.top = scale * maxT + 'px'

                    moveWrap.style.top = -maxMove * scale + 'px'
                    tbodyWrap.style.top = maxMove * scale + 34 + 'px'
                    fixedIndex.style.top = -maxMove * scale + 'px'

                    // console.log(scale * maxT, 'scale*maxT ---')
                }

            })

        }
    },

    scrollX({ vm, scrollX, moveWrap, wrap, tab }) {
        let theader = wrap.querySelector(tab)
        scrollX.style.width = (scrollX.parentNode.offsetWidth * scrollX.parentNode.offsetWidth) / (theader.offsetWidth) + 'px'
        setTimeout(() => {
            scrollX.style.width = (scrollX.parentNode.offsetWidth * scrollX.parentNode.offsetWidth) / (theader.offsetWidth) + 'px'
        }, 100)
        scrollX.addEventListener('mousedown', downCallback)


        function downCallback(ev) {
            let maxL = scrollX.parentNode.offsetWidth - scrollX.offsetWidth
            let testMaxL = theader.offsetWidth - wrap.offsetWidth + 142
            this.initX = this.offsetLeft
            this.downX = ev.clientX
            let that = this
            document.addEventListener('mousemove', moveCallback)

            function moveCallback(ev) {
                that.moveX = ev.clientX
                let L = that.moveX - that.downX + that.initX
                if (L < 0) {
                    L = 0
                }
                if (L > maxL) {
                    L = maxL
                }
                let scale = L / maxL
                that.style.left = L + 'px'
                moveWrap.style.left = -testMaxL * scale + 'px'
                theader.style.left = -testMaxL * scale + 'px'
            }
            document.addEventListener('mouseup', upCallback)

            function upCallback() {
                document.removeEventListener('mousemove', moveCallback)
                document.removeEventListener('mouseup', upCallback)
            }
        }
    }
}