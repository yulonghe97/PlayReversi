import { CREATE_ROOM, createHeader } from "../apiConfig";
import axios from "axios";

function createRoomModel() {
  return axios.get(CREATE_ROOM, createHeader());
}

export { createRoomModel }