import { request } from '@umijs/max';

export async function listImg(
  params: { current?: number; pageSize?: number; },
  options?: { [key: string]: any },
  sort?: { [key: string]: any }
) { 
  return request<API.RuleList>('/v1/mng/photo/list-photo-img', {
    method: 'POST', 
    data: { ...params, data: { ...options }, "sort": sort }
  }).then((rsp) => {
    return {
      data: rsp.data.data,
      success: rsp.data.success,
      total: rsp.data.total,
    }
  });
}

export async function addImg(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/add-photo-img', {
    method: 'POST',
    data: options || {},
  });
}

export async function updateImg(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/update-photo-img', {
    method: 'POST',
    data: options || {},
  });
}

export async function deleteImg(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/delete-photo-img', {
    method: 'POST',
    data: options || {},
  });
}

export async function detailImg(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/detail-photo-img', {
    method: 'GET',
    params: { ...options }
  });
}

export async function exportImg(record: any, formRef: any, advanceSearch: any) {
  let searchFields = formRef.current?.getFieldsValue();
  return request<any>('/v1/mng/photo/export-photo-img', {
    method: 'POST',
    data: { ...searchFields, data: { ...advanceSearch } },
    responseType: 'blob',
  });
}