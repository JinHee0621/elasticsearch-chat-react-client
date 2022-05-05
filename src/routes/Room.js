import React from 'react';
import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");  //3001 Back단 서버포트

function Room({location, history}) {
    return <div>
        채팅방
    </div>
}
export default Room