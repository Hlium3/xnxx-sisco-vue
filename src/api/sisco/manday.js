import request from '@/utils/request'

// 查询月标准工时列表
export function listManday(query) {
  return request({
    url: '/sisco/manday/list',
    method: 'get',
    params: query
  })
}

// 查询月标准工时详细
export function getManday(mandayId) {
  return request({
    url: '/sisco/manday/' + mandayId,
    method: 'get'
  })
}

// 新增月标准工时
export function addManday(data) {
  return request({
    url: '/sisco/manday',
    method: 'post',
    data: data
  })
}

// 修改月标准工时
export function updateManday(data) {
  return request({
    url: '/sisco/manday',
    method: 'put',
    data: data
  })
}

// 删除月标准工时
export function delManday(mandayId) {
  return request({
    url: '/sisco/manday/' + mandayId,
    method: 'delete'
  })
}
