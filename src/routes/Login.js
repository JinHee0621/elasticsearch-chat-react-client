import React from 'react';
import { useState } from "react";
import image from "../image/titleImage.png";
import "../css/Login.css";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");  //3001 Back단 서버포트

function Login({history}) {
    socket.on('checkLogin', (user) => {
        history.push({
          pathname : '/roomList/' + user,
          user_id : user
        })
    })

    const [id, setId] = useState("");
    const [password, setPass] = useState("");

    const onChangeID = (event) => setId(event.target.value);
    const onChangePass = (event) => setPass(event.target.value);

    const doSubmit = (event) => {
        event.preventDefault();
        if (id === '' || password === '' || id === undefined || password === undefined) {
            alert("아이디 또는 패스워드를 입력해주세요")
        } else {
            socket.emit('login', id, password); // check 요청
        }
    }

    const doJoin = (event) => {
        event.preventDefault();
        if (id === '' || password === '' || id === undefined || password === undefined) {
            alert("아이디 또는 패스워드를 입력해주세요")
        } else {
            socket.emit('join', id, password); // 가입 요청      
        }
    }

    return <div>
        <div id="main">
            <img src={image} id="title"></img><br />
            <form onSubmit={doSubmit} className="loginForm">
                <div className="loginDiv">
                    <input onChange={onChangeID} type="text" value={id} id="userId" placeholder="ID" /><br />
                    <input onChange={onChangePass} type="password" value={password} id="userPassword" placeholder="PASSWORD" />
                </div>
                <div className="loginDiv">
                    <button onClick={doSubmit} id="doLogin">login</button>
                </div>
            </form>
            <form className="joinBtn">
                <button id="doJoin" onClick={doJoin} >join</button>
            </form>
        </div>
    </div>
}

export default Login;