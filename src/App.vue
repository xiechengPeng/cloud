<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
    	<router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'

export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style rel="stylesheet/less">
html,body{background: #fdfdfd;}
*{margin:0;padding:0;}
ul,li{list-style: none;}
</style>
