import { LOGIN, REGISTER } from "../apiConfig";
import axios from "axios";

function userLoginModel(email, password) {
  return axios.post(LOGIN, {
    email: email,
    password: password,
  });
}

function userRegisterModel(email, password, nickname, avatar) {
  return axios.post(REGISTER, {
    email: email,
    password: password,
    name: nickname,
    avatar: avatar
  })
}

export { userLoginModel, userRegisterModel }