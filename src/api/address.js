import request from '@/utils/request'

// 获取收获地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 添加收货地址
export const addAddress = (name, phone, region, detail) => {
  return request.get('/address/add', {
    form: {
      name,
      phone,
      region,
      detail
    }
  })
}

// 获取默认收获地址ID
export const getDefaultAddress = () => {
  return request.get('/address/defaultId', {
    params: {

    }
  })
}
// 获取收获地址详情
export const getDetailAddress = (addressId) => {
  return request.get('/address/detail', {
    params: {
      addressId
    }
  })
}
// 删除收获地址
export const deleteAddress = (addressId) => {
  return request.post('/address/remove', {
    addressId
  })
}

// 设置默认收获地址
export const setDefaultAddress = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
}
