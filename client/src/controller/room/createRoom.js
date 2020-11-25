import { createRoomModel } from "../../model/room";

async function createRoom(){
    try{
        const res = await createRoomModel();
        return { success: true, data: res.data };
    }catch(e){
        return { success: false, message: e.message }
    }
}

export default createRoom;