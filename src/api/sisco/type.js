import request from '@/utils/request'

// 查询项目阶段类型列表
export function listType(query) {
  return request({
    url: '/sisco/type/list',
    method: 'get',
    params: query
  })
}

// 查询项目阶段类型详细
export function getType(stageTypeId) {
  return request({
    url: '/sisco/type/' + stageTypeId,
    method: 'get'
  })
}

// 新增项目阶段类型
export function addType(data) {
  return request({
    url: '/sisco/type',
    method: 'post',
    data: data
  })
}

// 修改项目阶段类型
export function updateType(data) {
  return request({
    url: '/sisco/type',
    method: 'put',
    data: data
  })
}

// 删除项目阶段类型
export function delType(stageTypeId) {
  return request({
    url: '/sisco/type/' + stageTypeId,
    method: 'delete'
  })
}
