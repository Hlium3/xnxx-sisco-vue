import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listMaintenance(query) {
  return request({
    url: '/sisco/maintenance/list',
    method: 'get',
    params: query
  })
}

// 查询【请填写功能名称】详细
export function getMaintenance(id) {
  return request({
    url: '/sisco/maintenance/' + id,
    method: 'get'
  })
}

// 新增【请填写功能名称】
export function addMaintenance(data) {
  return request({
    url: '/sisco/maintenance',
    method: 'post',
    data: data
  })
}

// 修改【请填写功能名称】
export function updateMaintenance(data) {
  return request({
    url: '/sisco/maintenance',
    method: 'put',
    data: data
  })
}

// 删除【请填写功能名称】
export function delMaintenance(id) {
  return request({
    url: '/sisco/maintenance/' + id,
    method: 'delete'
  })
}
