import { readCookie } from "../utils/cookie";

const BASE_URL = "http://localhost:8000";
const createAPI = (endpoint) => `${BASE_URL}${endpoint}`;

const LOGIN = createAPI("/api/user/login");
const REGISTER = createAPI("/api/user/register");

const GET_USER_INFO = createAPI("/api/userinfo");


const createHeader = () => {
    return {headers: {
        "auth-token": readCookie("_token"),
    }}
}

export { LOGIN, REGISTER, GET_USER_INFO, createHeader };
