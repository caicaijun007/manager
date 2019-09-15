import axios from 'axios';
import Qs from 'qs';
import { Modal } from 'antd';

export default class Axios {
    static ajax(options) {
        let config = {
            url: options.url,
            baseURL: 'http://localhost/manager_api',
            method: options.method ? options.method : 'get',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            params: options.method ? '' : ((options.data && options.data.params) || ''),
            data: options.method && ((options.data && options.data.params) || ''),
            timeout: 3000
        }

        return new Promise((resolve, reject) => {
            axios(config).then((response) => {
                let res = response.data;
                if (response.status === 200) {
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '请求提示',
                            content: res.message
                        })
                    }
                } else {
                    reject(res);
                }
            })
        })
    }
}