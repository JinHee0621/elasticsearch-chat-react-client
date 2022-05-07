import React from 'react';
import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");  //3001 Back단 서버포트

function Room({ location, history }) {
    const [roomid, setRoomId] = useState("");

    useEffect(() => {
        setRoomId(location.room_id);
        socket.emit('enterRoom', location.room_id); 
    }, [])

    useEffect(() => {
        socket.on('recept_message', (message) => {
            console.log("메세지 수신 : " + message )
        });
    }, [])

    const [message, setMessage] = useState("");
    const onInputMessage = (event) => setMessage(event.target.value);
    const doSend = (event) => {
        socket.emit('send', message, roomid); // check 요청
        setMessage("");
        event.preventDefault();
    }

    return <div>
        <div>
            대화내용
        </div>
        <div>
            <form onSubmit={doSend}>
                <div>
                    <input onChange={onInputMessage} type="text" value={message} id="user_message" placeholder="메시지를 입력하세요" /><br />
                </div>
                <div>
                    <button onClick={doSend} id="doSend">전송</button>
                </div>
            </form>
        </div>
    </div>
}
export default Room