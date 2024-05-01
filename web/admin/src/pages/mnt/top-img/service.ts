import { request } from '@umijs/max';

export async function listTopImg(
  params: { current?: number; pageSize?: number; },
  options?: { [key: string]: any },
  sort?: { [key: string]: any }
) { 

  // console.log("theeeeeeeeeeee")
  // console.log(options);
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

export async function addTopImg(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/add-photo-img', {
    method: 'POST',
    data: options || {},
  });
}

export async function updateTopImg(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/v1/mng/photo/update-photo-img', {
    method: 'POST',
    data: options || {},
  });
}

export async function deleteTopImg(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/delete-photo-img', {
    method: 'POST',
    data: options || {},
  });
}

export async function detailTopImg(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/photo/detail-photo-img', {
    method: 'GET',
    params: { ...options }
  });
}

export async function exportTopImg(record: any, formRef: any, advanceSearch: any) {
  let searchFields = formRef.current?.getFieldsValue();
  return request<any>('/v1/mng/photo/export-photo-img', {
    method: 'POST',
    data: { ...searchFields, data: { ...advanceSearch } },
    responseType: 'blob',
  });
}