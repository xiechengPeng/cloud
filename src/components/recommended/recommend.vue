<template>
	<div class="recommend" ref="recommend">
		<scroll ref="scroll" class="recommend-content" :data="discList">
		<div>
			<div class="banner">
				<div v-if="recommends.length" class="slider-wrapper">
					<div class="slider-content">
						<slider ref="slider">
							<div v-for="item in recommends">
								<a :href="item.linkUrl">
									<img @load="loadImg" :src="item.picUrl">
								</a>
							</div>
						</slider>
					</div>
				</div>
			</div>
			<div class="recommended">
				<h1>热门歌单推荐</h1>
				<ul>
					<li v-for="(item,index) in discList" class="item">
						<div class="icon">
							<img width="70" height="70" v-lazy="item.imgurl">
						</div>
						<div class="text">
							<h2 class="name" v-text="item.creator.name"></h2>
							<p class="desc" v-text="item.dissname"></p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="loading-content" v-show="!discList.length">
			<loading title="数据加载中..."></loading>
		</div>
		</scroll>
	</div>
</template>
<script type="ecmascript-6">
import Loading from 'base/loading/loading'
import Slider from 'base/silder/silder'	
import Scroll from 'base/scroll/scroll'
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'

export default {
	data() {
		return {
			recommends:[],
			discList:[],
		}
	},
	created() {
		setTimeout(()=>{
			this._getRecommend()
		},1000)
		this._getDiscList()
	},
	activated() {
      setTimeout(() => {
        this.$refs.slider && this.$refs.slider.refresh()
      }, 20)
    },
	methods:{
		_getRecommend(){
			getRecommend().then((res) => {
				if (res.code === ERR_OK) {
		            this.recommends = res.data.slider
		          }
			})
		},
		_getDiscList(){
			getDiscList().then((res) => {
				if (res.code === ERR_OK) {
		            this.discList = res.data.list
		          }
			})
		},
		//监听到banner数据有变化再次调用scroll方法
		loadImg(){
			if(!this.checkload){
				this.checkload=true
				setTimeout(()=>{
					this.$refs.scroll.refresh()
				},20)
			}
		}
	},
	components:{
		Slider,
		Scroll,
		Loading
	}
}

</script>
<style lang="less">
	.recommend{
		position: fixed;
	    width: 100%;
	    top: 84px;
	    bottom: 0;
		.recommend-content{
			height: 100%;
			overflow:hidden;
		}
		.banner{
			width: 100%;
			overflow: hidden;
			.slider-wrapper{
				position: relative;
				height:0;
				padding-top: 40%;
				overflow: hidden;
				.slider-content{
					position: absolute;
		          	top: 0;
		            left: 0;
		          	width: 100%;
		          	height: 100%;
				}
			}
			.swiper-container {
		        width: 100%;
		        height: 10rem;
		        .swiper-wrapper {
		            width: 100%;
		            height: 100%;
		        }
		        .swiper-slide {
		            background-position: center;
		            background-size: cover;
		            width: 100%;
		            height: 100%;
		            img {
		                width: 100%;
		                height: 100%;
		            }
		        }
		        .swiper-pagination-bullet {
		            width:0.833rem;
		            height: 0.833rem;
		            display: inline-block;
		            background: #7c5e53;
		        }
		    }
		}
		//推荐
		.recommended{
			h1{
				text-align: center;
				line-height: 40px;
				font-size: 14px;
				color:#31c27c;
				background: #fff;
			}
			ul{
				padding:0 20px;
				.item{
					display: flex;
					box-sizing:border-box;
					align-items:center;
					padding: 10px 0px 10px 0px;
					border-bottom: 1px solid #ddd;
					.icon{
						padding-right: 20px;
					}
					.text{
						display: flex;
						flex-direction:column;
						justify-content:center;
						flex:1;
						line-height: 20px;
	            		overflow: hidden;
	            		.name{
	            			margin-bottom: 10px;
	            			color:#333;
	            			font-size: 14px;
	            		}
	            		.desc{
	            			color:#666;
	            			font-size: 12px;
	            		}
					}
				}
			}
		}
		.loading-content{
			position: absolute;
			width:100%;
			top:50%;
			transform:translateY(-50%)
		}
	}
</style>