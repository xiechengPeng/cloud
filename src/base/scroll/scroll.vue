<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>
<script type="ecmascript-6">
    import BScroll from 'better-scroll'

    export default {
        prpos:{
            //
            probeType:{
                type:Number,
                default:1
            },
            click:{
                type:Boolean,
                default:true
            },
            data:{
                type:Array,
                default:null
            }
        },
        mounted(){
            //确保dom已经渲染
            setTimeout(()=>{
                this._initScroll()
            },20)

        },
        methods:{
            _initScroll(){
                //当初始化第一个参数为undefined的时候return
                if(!this.$refs.wrapper){
                    return
                }
                this.scroll=new BScroll(this.$refs.wrapper,{
                    probeType:this.probeType,
                    click:this.click
                })
            },
            enabel(){
                this.scroll && this.scroll.enabel()
            },
            disable(){
                this.scroll && this.scroll.disabel()
            },
            refresh(){
                this.scroll && this.scroll.refresh()
            }
        },
        //监听data的变化,
        watch:{
            data(){
                setTimeout(()=>{
                    this.refresh()
                },20)
            }
        }
    }
</script>
<style lang="less"></style>