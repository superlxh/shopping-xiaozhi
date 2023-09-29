<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar title="小智商城" class="top"/>

    <!-- 搜素框 -->
    <van-search v-model="value" shape="round" background="#acaaaa" placeholder="请输入搜索关键词"/>

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- 导航 -->
    <van-grid :column-num="5">
      <van-grid-item v-for="item in navList" :key="item.imgUrl" :icon="item.imgUrl" :text="item.text" />
    </van-grid>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <!-- 商品 -->
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item=item></GoodsItem>
    </div>

  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'

export default {
  name: 'HomeIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      bannerList: [], // 轮播图资源
      navList: [], // 导航资源
      proList: [], // 商品资源
      value: '' // 搜素关键词
    }
  },
  async created () {
    const { data: { pageData: { items } } } = await getHomeData()
    this.bannerList = items[1].data
    this.navList = items[3].data
    this.proList = items[6].data
  }
}
</script>

<style lang='less' scoped>
.top {//顶部
  background-color: #7aa4f8;
  ::v-deep .van-nav-bar__title {
    font-size: 22px;
    text-align: center;
    color: #fff;}
  }

  .my-swipe .van-swipe-item {//轮播图
    color: #fff;
    font-size: 20px;
    height: 185px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 100%;
      height: 185px;
    }
  }

.guess .guess-title {// 猜你喜欢
  height: 40px;
  line-height: 40px;
  text-align: center;
  .goods-list {// 商品样式
  background-color: #f6f6f6;
}
}

</style>
