<template>
  <div class="count-box">
    <button class="minus" @click="handleSub(-1)">-</button>
    <input :value="value" @change="handleChange" type="text" class="inp">
    <button class="add" @click="handleAdd(1)">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: { // 加入购物车或购买数量
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub (num) { // 数量减一
      if (this.value <= 1) return // 为 1 时，不能减
      this.$emit('input', this.value + num)
    },
    handleAdd (num) { // 数量加一
      this.$emit('input', this.value + num)
    },
    handleChange (e) { // 直接输入数字
      if (!/^[1-9]\d*$/.test(+e.target.value)) { // 输入不合法
        e.target.value = String(this.value)
        this.$toast('输入不合法！')
        return
      }

      // 输入合法
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang='less' scoped>
.count-box {
    width: 110px;
    display: flex;
    .minus, .add {
        width: 30px;
        height: 30px;
        outline: none;
        border: none;
        background-color: #efefef;
    }
    .inp {
        width: 40px;
        height: 30px;
        text-align: center;
        outline: none;
        border: none;
        margin: 0 5px;
        background-color: #efefef;
    }
}
</style>
