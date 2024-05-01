import { request } from '@umijs/max';

export async function listCategory(params: { current?: number; pageSize?: number; }, options?: { [key: string]: any }, sort?: { [key: string]: any }) {
  return request<any>('/v1/mng/photo/list-photo-category', {
    method: 'POST',
    data: { ...params, data: { ...options }, "sort": sort }
  });
}

export async function addCategory(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/add-photo-category', {
    method: 'POST',
    data: options || {},
  });
}

export async function updateCategory(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/update-photo-category', {
    method: 'POST',
    data: options || {},
  });
}

export async function deleteCategory(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/delete-photo-category', {
    method: 'POST',
    data: options || {},
  });
}

export async function detailCategory(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/detail-photo-category', {
    method: 'GET',
    params: { ...options }
  });
}

export async function exportCategory(record: any, formRef: any, advanceSearch: any) {
  let searchFields = formRef.current?.getFieldsValue();
  return request<any>('/v1/mng/photo/export-photo-category', {
    method: 'POST',
    data: { ...searchFields, data: { ...advanceSearch } },
    responseType: 'blob',
  });
}