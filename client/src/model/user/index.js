import { LOGIN, REGISTER, GET_USER_INFO, createHeader, LOGOUT } from "../apiConfig";
import axios from "axios";

function userLoginModel(email, password) {
  return axios.post(LOGIN, {
    email: email,
    password: password,
  });
}

function userLogoutModel(){
  return axios.get(LOGOUT, createHeader());
}

function userRegisterModel(email, password, nickname, avatar) {
  return axios.post(REGISTER, {
    email: email,
    password: password,
    name: nickname,
    avatar: avatar
  })
}

function getUserInfoModel(id) {
  return axios.get(`${GET_USER_INFO}/${id}`, createHeader())
}


export { userLoginModel, userLogoutModel, userRegisterModel, getUserInfoModel }