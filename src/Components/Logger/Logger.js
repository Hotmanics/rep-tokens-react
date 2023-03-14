import React, { useState } from 'react';
import "./Logger.css";

const Logger = (props)=> {

    let msg = props.boastMessage === '' ? "Logz" : props.boastMessage;

    return <div className="logger">
        <p>{msg}</p>
        </div>
}

export default Logger;