import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");  //3001 Back단 서버포트

function Room({ location, history }) {
    const [roomid, setRoomId] = useState("");
    const [message, setMessage] = useState("");
    const [messageLog, setLog] = useState([]);

    useEffect(() => {
        setRoomId(location.room_id);
        socket.emit('enterRoom', location.room_id);
    }, [])

    useEffect(() => {
        socket.on('recept_message', (message, user) => {
            addMessage(user, message, 'other')
        });
    }, [])

    const addMessage = (name, message, target) => {
        let message_div = {
            "userName" : name,
            "message" : message,
            "type" : target
        }
        if(message_div.type == 'me') message_div.userName = 'me'
        setLog((currentArray) => [ ...currentArray,message_div])
    }

    const onInputMessage = (event) => setMessage(event.target.value);

    const doSend = (event) => {
        socket.emit('send', location.user_id ,message, roomid); // check 요청
        addMessage(location.user_id, message, 'me')
        setMessage("");
        event.preventDefault();
    }

    const goList = (event) => {
        history.push({
            pathname : '/roomList/' + location.user_id,
            user_id : location.user_id
        })
        event.preventDefault();
    }

    return <div>
        <div>
            대화내용
        </div>
        <div>
            <form onSubmit={doSend}>
                <div id="message_window">
                    {messageLog.map((message_div, index) => (
                        <div className={message_div.user} key={index}>{message_div.userName} : {message_div.message}</div>
                    ))
                    }
                </div>
                <div>
                    <input onChange={onInputMessage} type="text" value={message} id="user_message" placeholder="메시지를 입력하세요" /><br />
                </div>
                <div>
                    <button onClick={doSend} id="doSend">전송</button>
                </div>
            </form>
            <div>
            <button onClick={goList} id="goList">뒤로</button>
            </div>
        </div>
    </div>
}
export default Room