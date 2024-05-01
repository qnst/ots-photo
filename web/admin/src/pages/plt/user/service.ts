import { request } from '@umijs/max';

export async function listEdfApp(
  params: { current?: number; pageSize?: number; },
  options?: { [key: string]: any },
  sort?: { [key: string]: any }
) { 
  return request<API.RuleList>('/v1/mng/core/list-edf-mng-user', {
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

export async function addEdfApp(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/core/add-edf-mng-user', {
    method: 'POST',
    data: options || {},
  });
}

export async function updateEdfApp(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/core/update-edf-mng-user', {
    method: 'POST',
    data: options || {},
  });
}

export async function deleteEdfApp(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/core/delete-edf-mng-user', {
    method: 'POST',
    data: options || {},
  });
}

export async function detailEdfApp(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/core/detail-edf-mng-user', {
    method: 'GET',
    params: { ...options }
  });
}

export async function exportEdfApp(record: any, formRef: any, advanceSearch: any) {
  let searchFields = formRef.current?.getFieldsValue();
  return request<any>('/v1/mng/core/export-edf-mng-user', {
    method: 'POST',
    data: { ...searchFields, data: { ...advanceSearch } },
    responseType: 'blob',
  });
}