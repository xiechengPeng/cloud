<template>
    <scroll class="listview" :data="data">
        <ul>
            <li v-for="group in data" class="list-group">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img :src="item.avatar" class="avatars">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut">
            <ul>
                <li v-for="item in shortcutList" class="item">{{item}}</li>
            </ul>
        </div>
        <div v-show="!data.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>
<script type="ecmascript-6">
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'

    export default {
        props:{
            data:{
                type:Array,
                default:[]
            }
        },
        computed:{
            shortcutList(){
                return this.data.map((group)=>{
                    return group.title.substr(0,1)
                })
            }
        },
        components: {
          Scroll,
          Loading
        }
    }
</script>
<style lang="less">
.listview{
    height: 100%;
    overflow: hidden;
    background:#fff;
    .list-group{
        padding-bottom: 30px;
        .list-group-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: 12px;
            color: #fff;
            background: #000;
        };
        .list-group-item{
            display: flex;
            align-items: center;
            padding: 10px 0 10px 30px;
            border-bottom: 1px solid #ddd;
            .avatars{
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
            .name{
                margin-left: 20px;
                color: #333;
                font-size: 12px;
            }
        }
    }
    .list-shortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: #000;
        font-family: Helvetica;
        .item{
            padding: 3px;
            line-height: 1;
            color: #333;
            font-size: 12px;
        }
    }
    .list-fixed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: 12px;
            color: #333;
            background: #000;
        }
    }
    .loading-container{
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
}
</style>