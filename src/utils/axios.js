import axios from 'axios';
import { Modal } from 'antd';

export default class Axios {
    static ajax(options) {
        let baseApi = 'http://localhost/manager_api';

        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                baseURL: baseApi,
                method: options.method ? options.method : 'get',
                params: (options.data && options.data.params) || '',
                timeout: 5000
            }).then((response) => {
                if (response.status === 200) {
                    let res = response.data;
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.message
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        })
    }
}