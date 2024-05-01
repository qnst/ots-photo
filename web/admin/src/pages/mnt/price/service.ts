import { request } from '@umijs/max';

export async function listPrice(
  params: { current?: number; pageSize?: number; },
  options?: { [key: string]: any },
  sort?: { [key: string]: any }
) { 
  return request<API.RuleList>('/v1/mng/photo/list-photo-price', {
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

export async function addPrice(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/add-photo-price', {
    method: 'POST',
    data: options || {},
  });
}

export async function updatePrice(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/update-photo-price', {
    method: 'POST',
    data: options || {},
  });
}

export async function deletePrice(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/delete-photo-price', {
    method: 'POST',
    data: options || {},
  });
}

export async function detailPrice(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/detail-photo-price', {
    method: 'GET',
    params: { ...options }
  });
}

export async function exportPrice(record: any, formRef: any, advanceSearch: any) {
  let searchFields = formRef.current?.getFieldsValue();
  return request<any>('/v1/mng/photo/export-photo-price', {
    method: 'POST',
    data: { ...searchFields, data: { ...advanceSearch } },
    responseType: 'blob',
  });
}