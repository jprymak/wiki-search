
function request(url, method = "get") {

    const config = {
        method,
        headers: {
            "content-type": "application/json",
        }

    }

    return fetch(url, config)
        .then(response => response.json())
};

function get(url) {
    return request(url);
}

const api =  {get};
export default api;