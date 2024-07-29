import axios from "axios";

const api2 = axios.create({
    baseURL: "http://localhost:8080/v1/api/user",
    headers : {
        "Content-Type" : "application/json",
    },
});

export default api2;