import axios from "axios";

const apiUrl = `https://api.coingecko.com/api/v3`;

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

api.interceptors.response.use(undefined, (err) => {
    const customError = {
        name: "Api Error",
        message: err.response && err.response.status >= 500 ? "System error, try later" : err.response.data.msg !== undefined ? err.response.data.msg : 'Falha na requisição, verifique os campos e tente novamente',
        data: err.response ? err.response.data : null
    };
    // document.body.scrollTop = 0
    // document.documentElement.scrollTop = 0
    return Promise.reject(customError)
})

export default api;