<template>
  <div>
    <van-nav-bar title="地址管理" left-arrow @click-left="$router.go(-1)"/>

    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"/>

    <div class="btn">
      <button class="btn1" @click="deleteAddress">删除</button>
      <button class="btn2" @click="setDefaultAddress">设为默认地址</button>
    </div>

  </div>
</template>

<script>
import { getAddressList, getDefaultAddress, deleteAddress, setDefaultAddress } from '@/api/address'
export default {
  name: 'AddressIndex',
  data () {
    return {
      chosenAddressId: '', // 默认地址
      list: [] // 收货地址
    }
  },
  async created () {
    this.getAddress()
    this.getAddressList()
  },
  methods: {
    async getAddress () {
      // 获取默认收货地址
      const { data: { defaultId } } = await getDefaultAddress()
      this.chosenAddressId = String(defaultId)
    },
    async getAddressList () {
    // 已登录获取收获地址
      this.list = [] // 清空数组
      const { data: { list } } = await getAddressList()
      for (let i = 0; i < list.length; i++) { // 循环list
        // 添加数据
        // 渲染默认收获地址
        if (String(list[i].address_id) === this.chosenAddressId) {
          list[i].isDefault = true
        } else {
          list[i].isDefault = false
        }
        this.list.unshift({
          id: String(list[i].address_id),
          name: list[i].name,
          tel: String(list[0].phone),
          address: list[i].region.province + list[i].region.city + list[i].region.region + list[i].detail,
          isDefault: list[i].isDefault
        })
      }
    },
    onAdd () {
      this.$router.push('/addAddress')
    },
    onEdit () {
      this.$router.push('/editAddress')
    },
    beforeCloseDeleteAddressFn (action, done) {
      if (action === 'confirm') { // 点击确认
        setTimeout(done, 500)
        deleteAddress(this.chosenAddressId)
      } else { // 点击取消
        done()
      }
    },
    beforeCloseSetAddressFn (action, done) {
      if (action === 'confirm') { // 点击确认
        setTimeout(done, 500)
        setDefaultAddress(this.chosenAddressId)
      } else { // 点击取消
        done()
      }
    },
    async deleteAddress () { // 删除地址
      this.$dialog.confirm({
        title: '温馨提示',
        message: '删除后不可恢复，您确认删除吗？',
        beforeClose: this.beforeCloseDeleteAddressFn
      }).then(() => {
        this.$toast('删除成功')
        this.getAddressList()
        this.getAddress()
      }).catch(() => {

      })
    },
    async setDefaultAddress () { // 设置默认地址
      this.$dialog.confirm({
        title: '温馨提示',
        message: '请确认设置为默认地址吗？',
        beforeClose: this.beforeCloseSetAddressFn
      })
        .then(() => {
          this.$toast('设置成功')
          this.getAddressList()
          this.getAddress()
        }).catch(() => {

        })
    }
  }
}
</script>

<style lang="less" scoped>
.btn {
  position: fixed;
  bottom: 38px;
  width: 100%;
  height: 110px;
  .btn1 {
    position: fixed;
    bottom: 52px;
    left: 15px;
    width: 90%;
    height: 44px;
    line-height: 1.2;
    background: #ee0a24;
    color: #ffffff;
    font-size: 14px;
    border: 1px solid #ee0a24;
    border-radius: 27px;
    text-align: center;
  }
  .btn2 {
    position: fixed;
    left: 15px;
    width: 90%;
    height: 44px;
    line-height: 1.2;
    background: #ee0a24;
    color: #ffffff;
    font-size: 14px;
    border: 1px solid #ee0a24;
    border-radius: 27px;
    text-align: center;
  }
}

</style>
