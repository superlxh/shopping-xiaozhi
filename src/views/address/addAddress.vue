<template>
    <div>
        <van-nav-bar title="新增地址" left-arrow @click-left="$router.go(-1)"/>
        <!-- 新增地址 -->
        <van-address-edit :area-list="areaList" show-set-default show-search-result :tel-validator="checkTel"
         :area-columns-placeholder="['请选择', '请选择', '请选择']"  @save="onSave"/>
    </div>
</template>

<script>
import { areaList } from '@vant/area-data' // 引入地区数据
export default {
  name: 'AddAddressPage',
  data () {
    return {
      areaList // 所有省市区地址
    }
  },
  methods: {
    checkTel (mobile) { // 验证手机号
      if (/^1[3-9]\d{9}$/.test(mobile)) {
        return true
      } else {
        return false
      }
    },
    onSave (list) {
    }
  }
}
</script>

<style>

</style>
