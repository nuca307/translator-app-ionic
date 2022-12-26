let GETTING_TIMEOUT = 5000;
//Zamanlama için kullanılır.
/*function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}*/


function fetchFunc(resource, method, options = {}, body) {
    const { timeout = GETTING_TIMEOUT } = options;
    const controller = new AbortController();
    const AbortTimer = setTimeout(() => controller.abort(), timeout);
    let headers = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        signal: controller.signal
    };
    if (method == "POST" || method == "PUT") {
        headers.body = JSON.stringify(body);
    }
    const response = new Promise((resolve, reject) => {
        fetch(resource, headers)
            .then(response => response.json())
            .then(data => {
                resolve(data);
            })
            .catch(() => {
                reject();
            })
            .finally(() => {
                clearTimeout(AbortTimer);
            });
    });
    return response;
}