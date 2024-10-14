import request from '@/utils/request'

// 查询成功案例和资讯动态列表
export function listDynamics(query) {
  return request({
    url: '/sisco/dynamics/list',
    method: 'get',
    params: query
  })
}

// 查询成功案例和资讯动态详细
export function getDynamics(cdId) {
  return request({
    url: '/sisco/dynamics/' + cdId,
    method: 'get'
  })
}

// 新增成功案例和资讯动态
export function addDynamics(data) {
  return request({
    url: '/sisco/dynamics',
    method: 'post',
    data: data
  })
}

// 修改成功案例和资讯动态
export function updateDynamics(data) {
  return request({
    url: '/sisco/dynamics',
    method: 'put',
    data: data
  })
}

// 删除成功案例和资讯动态
export function delDynamics(cdId) {
  return request({
    url: '/sisco/dynamics/' + cdId,
    method: 'delete'
  })
}
