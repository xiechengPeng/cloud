<template>
	<div class="singer" ref="singer">
        <listview :data="singers"></listview>
    </div>
</template>
<script type="ecmascript-6">
    import Listview from 'base/listview/listview'
    import {getSingerList} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import Singer from 'common/js/singer'

    var HOT_NAME='热门'
    var HOT_SINGER_LEN=10
	export default {
        data() {
            return {
                singers:[],
            }
        },
        created(){
                this._getSingerList()
        },
        methods:{
            _getSingerList(){
                getSingerList().then((res)=>{
                    if(res.code==ERR_OK){
                        this.singers=this._normlizeSinger(res.data.list)
                        console.log(this.singers)
                    }
                })
            },
            _normlizeSinger(list){
                //获取热门歌手
                let map={
                    hot:{
                        title:HOT_NAME,
                        items:[]
                    }
                }
                //获取前10条并设为热门
                list.forEach((item,index)=>{
                    if(index<HOT_SINGER_LEN){
                        map.hot.items.push(new Singer({
                            id:item.Fsinger_mid,
                            name:item.Fsinger_name,
                        }))
                    }
                    //获取字母
                    const key=item.Findex
                    if(!map[key]){
                        map[key]={
                            title:key,
                            items:[]
                        }
                    }
                    map[key].items.push(new Singer({
                        id:item.Fsinger_mid,
                        name:item.Fsinger_name,
                    }))
                })
                //得到有序列表，处理map
                let hot = []
                let ret = []
                for(let key in map){
                    let val = map[key]
                    if(val.title.match(/[a-zA-Z]/)){
                        ret.push(val)
                    }else if(val.title===HOT_NAME){
                        hot.push(val)
                    }
                }
                //处理字母排序
                ret.sort((a,b)=>{
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret)
            }
        },
        components:{
            Listview
        }
    }
</script>
<style lang="less">
	.singer{
        position: fixed;
        top: 84px;
        bottom: 0;
        width: 100%;
    }
</style>