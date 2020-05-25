import axios from "axios";

export default class Proxy {
  constructor(endpoint = '', parameters = {}) {
    this.endpoint = endpoint;
    this.parameters = parameters;
  }

  getParameterString(obj, prefix) {
    var str = [], p;
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
        str.push((v !== null && typeof v === "object") ? this.getParameterString(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  };

  submit(method, url, data = null) {
    return new Promise((resolve, reject) => {
      let str = this.getParameterString(this.parameters);
      axios[method](`${this.endpoint}${url}${str !== '' ? '?' + str : ''}`, data).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(err.response);
      })
    })
  }
}