import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");  //3001 Back단 서버포트

function RoomList({location, history}) {
    useEffect(()=>{
        socket.emit('loadRoom', location.user_id); 
    }, []);
    socket.on('renderlist', (room) => {
        setRoom(room);
    });
    const [room, setRoom] = useState([]);

    return <div>
        <div id="roomList">
            {location.user_id}
        </div>
        <div>
            {
                room.map((ele) => 
                    <div key={ele._source.room_id}>
                         <Link to={`/room/${ele._source.room_id}`}>{ele._source.room_name}</Link>
                    </div>
                )
            }
        </div>
    </div>
}

export default RoomList