import request from '@/utils/request'

// 查询项目阶段管理列表
export function listStage(query) {
  return request({
    url: '/sisco/stage/list',
    method: 'get',
    params: query
  })
}

// 查询项目阶段管理详细
export function getStage(stageId) {
  return request({
    url: '/sisco/stage/' + stageId,
    method: 'get'
  })
}

// 新增项目阶段管理
export function addStage(data) {
  return request({
    url: '/sisco/stage',
    method: 'post',
    data: data
  })
}

// 修改项目阶段管理
export function updateStage(data) {
  return request({
    url: '/sisco/stage',
    method: 'put',
    data: data
  })
}

// 删除项目阶段管理
export function delStage(stageId) {
  return request({
    url: '/sisco/stage/' + stageId,
    method: 'delete'
  })
}
