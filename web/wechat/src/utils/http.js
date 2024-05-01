//const baseUrl = 'http://localhost:5002/v1/mng';
// const baseUrl = 'https://applet.fmmkt.com/small';
 const baseUrl = 'https://api.ots.lqbzao.com/v1/mng';
// const baseUrl = 'http://localhost:5002/v1/mng';

const getToken = () => {
  try {
    let token = wx.getStorageSync('skey');
    if (token) {
      console.log("the token is ", token);
      return { 'qn-token': token, 'qn-token-extral': 'ots-photography' };
    }
    return {};
  } catch (e) {
    return {};
  }
};

const Http = {
  /**
   * [HTTP GET 请求]
   * @param [第1种使用方法是URL不带参数。第2种使用方法是在请求URL后带参数，如：?id=1&name=ming]
   * 1. HTTP.get(url).then((data) => {}).catch((error) => {})
   * 2. HTTP.get({url: url, params: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  get: function (requestHandler) {
    if (typeof requestHandler === 'string') {
      requestHandler = {
        url: String(requestHandler),
        params: {},
      };
    }
    return this.Request('GET', requestHandler);
  },

  /**
   * [HTTP POST 请求]
   * @param [可自定义 headers，如需 Authorization 等，默认：'Content-Type': 'application/json']
   * HTTP.post({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  post: function (requestHandler) {
    return this.Request('POST', requestHandler);
  },

  /**
   * [HTTP PATCH 请求]
   * HTTP.patch({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  patch: function (requestHandler) {
    return this.Request('PATCH', requestHandler);
  },

  /**
   * [HTTP PUT 请求]
   * HTTP.put({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  put: function (requestHandler) {
    return this.Request('PUT', requestHandler);
  },

  /**
   * [HTTP DELETE 请求]
   * HTTP.delete({url: url, params: [JSON Object], headers: [JSON Object] }).then((data) => {}).catch((error) => {})
   */
  delete: function (requestHandler) {
    return this.Request('DELETE', requestHandler);
  },

  // request
  Request: function (method, requestHandler) {
    const { url, params, headers, mask, loading } = requestHandler;

    if (loading === undefined || loading) {
      wx.showLoading &&
        wx.showLoading({ title: '加载中...', mask: mask ? mask : false });
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        data: params,
        method:
          ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].indexOf(method) > -1
            ? method
            : 'GET',
        header: Object.assign(
          {
            'Content-Type': 'application/json',
            /*
          这里可以自定义全局的头信息，这是一个栗子
          'Authorization': 'Bearer ' + wx.getStorageSync('token'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded'
          */
          },
          headers,
          getToken()
        ),
        success: function (res) {
          const { data, statusCode } = res;
          // console.log('00000000000000000000000000000',res);

          /*
          // 处理数据
          if (statusCode === 1025) {
            console.log('------------------------------------',statusCode);
            wx.navigateTo({ url: 'auth' });
            reject(data, statusCode); 
          }
          else {
            statusCode === 200 ? resolve(data) : reject(data, statusCode);
          }
          */
          statusCode === 200 ? resolve(data) : reject(data, statusCode);
        },
        fail: function () {
          reject('Network request failed');
        },
        complete: function () {
          wx.hideLoading && wx.hideLoading();
        },
      });
    });
  },
};

module.exports = Http;
