import React from 'react';
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "../css/Room_List.css";
const socket = io("http://localhost:3001/");  //3001 Back단 서버포트

function RoomList({location, history}) {
    
    const [room, setRoom] = useState([]);

    useEffect(()=>{
        socket.emit('loadRoom', location.user_id); 
    }, []);

    socket.on('renderlist', (room) => {
        setRoom(room);
    });


    const connect_room = (roomInfo) => {
        history.push({
            pathname : '/room/' + roomInfo.target.id,
            room_id : roomInfo.target.id,
            user_id : location.user_id
          })
    }

    return <div>
        <div id="roomList">
            {location.user_id}
        </div>
        <div className='room_container'>
            {
                room.map((ele) => 
                <div className="room_element" key={ele._source.room_id} id={ele._source.room_id} onClick={connect_room}>
                    {ele._source.room_name}
                </div>
                )
            }
        </div>
    </div>
}

export default RoomList