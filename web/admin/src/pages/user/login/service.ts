// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/v1/mng/core/current-edf-mng-user', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/v1/mng/core/login-out', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request</*API.LoginResult*/any>('/v1/mng/core/login-edf-mng-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: { "data": body },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
    params: {
      // query
      /** 手机号 */
      phone?: string;
    },
    options?: { [key: string]: any },
  ) {
    return request<API.FakeCaptcha>('/api/login/captcha', {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }