import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/v1/api/user",
    headers : {
        "Content-Type" : "application/json",
    },
});

export default api;