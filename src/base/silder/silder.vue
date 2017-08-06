<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :class="{active:PageIndex===index}"></span>
        </div>
    </div>
</template>
<script>
import {addClass} from 'common/js/dom'
import BScroll from 'better-scroll'

export default {
    data(){
        return {
            dots:[],
            PageIndex:0,
        }
    },
    //从外部控制组件
    props:{
        //是否循环轮播
        loop:{
            type:Boolean,
            default:true
        },
        //自动轮播
        autoPlay:{
            type:Boolean,
            default:true
        },
        //轮播间隔
        interval:{
            type:Number,
            default:4000
        }
    },
    mounted(){
        setTimeout(()=>{
            this._setSliderWidth()
            this._initDots()
            this._initSlider()
            if(this.autoPlay){
                this._play()
            }
        },20);
        //监听窗口改变
        window.addEventListener('resize',()=>{
            if(!this.slider){
                return;
            }
            this._setSliderWidth(true)
        })
    },
    //在实例销毁之前清除计时器(性能)
    beforeDestroy(){
        clearTimeout(this.timer)
    },
    methods:{
        //计算宽度
        _setSliderWidth(isResize){
            this.children=this.$refs.sliderGroup.children;

            let width=0;
            //父容器的宽度
            let sliderWidth=this.$refs.slider.clientWidth;
            for(let i=0;i<this.children.length;i++){
                let child=this.children[i];
                //添加class
                addClass(child,'slider-item');
                //等于父容器的宽度
                child.style.width=sliderWidth+'px';
                width+=sliderWidth;
            }
            if(this.loop && !isResize){
                width+=2*sliderWidth;
            }
            this.$refs.sliderGroup.style.width=width+'px';
        },
        //无缝滚动
        _initSlider(){
            //初始化BScroll
            this.slider=new BScroll(this.$refs.slider,{
                scrollX:true,
                scrollY:false,
                momentum:false,
                snap:true,
                snapLoop:this.loop,
                snapThreshold:0.3,
                snapSpeed:400,
                click:true
            });
            //滚动完毕事件,回调
            this.slider.on('scrollEnd',()=>{
                //获取当前索引
                let pageIndex=this.slider.getCurrentPage().pageX;
                if(this.loop){
                    pageIndex-=1;
                }
                //赋值
                this.PageIndex=pageIndex;
                if(this.autoPlay){
                    clearTimeout(this.timer);
                    this._play();
                }
            })
        },
        //圆点
        _initDots(){
            this.dots=new Array(this.children.length)
        },
        _play(){
            //this.PageIndex是从0开始的
            let pageIndex=this.PageIndex+1;
            if(this.loop){
                pageIndex+=1;
            }
            this.timer=setTimeout(()=>{
                //获取当前索引
                this.slider.goToPage(pageIndex,0,400)
            },this.interval)
        }
    }
}
</script>
<style lang="less">
.slider{
    min-height: 1px;
    .slider-group{
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-item{
        float: left;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;
        a{
          display: block;
          width: 100%;
          overflow: hidden;
          text-decoration: none;
        }
        img{
          display: block;
          width: 100%;
        }
        }
    }
    .dots{
      position: absolute;
      right: 0;
      left: 0;
      bottom: 12px;
      transform: translateZ(1px);
      text-align: center;
      font-size: 0;
      .dot{
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #eee;
            &.active{
              width: 20px;
              border-radius: 5px;
              background: #fff;
            }
        }
    }
}
</style>