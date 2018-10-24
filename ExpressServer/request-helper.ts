import * as request from 'request';

const requestWrapper = (uri: string, options?: request.CoreOptions) => {
    return new Promise<request.Response>((resolve, reject) => {
        request(uri, options, (err, response) => {
            if (err) {
                reject(err);
            } else {
                resolve(response);
            }
        });
    });
}

export {requestWrapper as request}