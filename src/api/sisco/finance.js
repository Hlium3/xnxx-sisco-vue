import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listFinance(query) {
  return request({
    url: '/sisco/finance/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getFinance(id) {
  return request({
    url: '/sisco/finance/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addFinance(data) {
  return request({
    url: '/sisco/finance',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateFinance(data) {
  return request({
    url: '/sisco/finance',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delFinance(id) {
  return request({
    url: '/sisco/finance/' + id,
    method: 'delete'
  })
}
