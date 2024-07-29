import axios from "axios";

const api3 = axios.create({
    baseURL: "http://localhost:8080/v1/api/store",
    headers : {
        "Content-Type" : "multipart/form-data",
    },
});

export default api3;