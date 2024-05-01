import { request } from '@umijs/max';

export async function listBooking(
  params: { current?: number; pageSize?: number; },
  options?: { [key: string]: any },
  sort?: { [key: string]: any }
) { 
  return request<API.RuleList>('/v1/mng/photo/list-photo-booking', {
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

export async function addBooking(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/add-photo-booking', {
    method: 'POST',
    data: options || {},
  });
}

export async function updateBooking(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/update-photo-booking', {
    method: 'POST',
    data: options || {},
  });
}

export async function deleteBooking(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/delete-photo-booking', {
    method: 'POST',
    data: options || {},
  });
}

export async function detailBooking(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/detail-photo-booking', {
    method: 'GET',
    params: { ...options }
  });
}

export async function exportBooking(record: any, formRef: any, advanceSearch: any) {
  let searchFields = formRef.current?.getFieldsValue();
  return request<any>('/v1/mng/photo/export-photo-booking', {
    method: 'POST',
    data: { ...searchFields, data: { ...advanceSearch } },
    responseType: 'blob',
  });
}