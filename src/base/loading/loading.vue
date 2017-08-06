<template>
    <div class="loading">
        <img src="./loading.gif" height="25" width="25">
        <p>{{title}}</p>
    </div>
</template>
<script type="ecmascript-6">
    export default {
        props:{
            title:{
                type:String,
                default:'加载中...'
            }
        }
    }
</script>
<style lang="less">
    .loading{
        width: 100%;
        text-align: center;
        p{
            color:#666;
            margin-top: 5px;
        }
    }
</style>