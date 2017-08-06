<template>
	<div class="tab">
		<router-link tag="div" class="item" to="/recommend">
			<span>推荐</span>
		</router-link>
		<router-link tag="div" class="item" to="/singer">
			<span>歌手</span>
		</router-link>
		<router-link tag="div" class="item" to="/ranking">
			<span>排行</span>
		</router-link>
		<router-link tag="div" class="item" to="/search">
			<span>搜索</span>
		</router-link>
	</div>
</template>
<script>
	export default {

	}
</script>
<style lang="less">
	.tab{
		display: flex;
		height: 40px;
		line-height: 40px;
		background: #fff;
		.item{
			flex:1;
			justify-content:center;
			text-align: center;
			font-size: 14px;
		}
		.router-link-active{
			color:#31c27c;
			border-bottom: 2px solid #31c27c;
		}
	}
</style>