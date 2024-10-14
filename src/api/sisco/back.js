import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listBack(query) {
  return request({
    url: '/sisco/back/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getBack(id) {
  return request({
    url: '/sisco/back/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addBack(data) {
  return request({
    url: '/sisco/back',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateBack(data) {
  return request({
    url: '/sisco/back',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delBack(id) {
  return request({
    url: '/sisco/back/' + id,
    method: 'delete'
  })
}
