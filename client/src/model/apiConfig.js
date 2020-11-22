const BASE_URL = "http://localhost:8000";
const createAPI = (endpoint) => `${BASE_URL}${endpoint}`;

const LOGIN = createAPI("/api/user/login");
const REGISTER = createAPI("/api/user/register");

export { LOGIN, REGISTER };
