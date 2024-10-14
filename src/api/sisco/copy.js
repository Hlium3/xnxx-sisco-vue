import request from '@/utils/request'

// 查询项目阶段管理列表
export function listCopy(query) {
  return request({
    url: '/sisco/copy/list',
    method: 'get',
    params: query
  })
}

// 查询项目阶段管理详细
export function getCopy(stageId) {
  return request({
    url: '/sisco/copy/' + stageId,
    method: 'get'
  })
}

// 新增项目阶段管理
export function addCopy(data) {
  return request({
    url: '/sisco/copy',
    method: 'post',
    data: data
  })
}

// 修改项目阶段管理
export function updateCopy(data) {
  return request({
    url: '/sisco/copy',
    method: 'put',
    data: data
  })
}

// 删除项目阶段管理
export function delCopy(stageId) {
  return request({
    url: '/sisco/copy/' + stageId,
    method: 'delete'
  })
}
