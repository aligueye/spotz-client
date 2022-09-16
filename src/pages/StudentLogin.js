import React, { useState } from "react";

import { encode } from "base-64";

const loginStudent = async ({ email, password}) => {
    return fetch('http://127.0.0.1:5000/student-login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: "Basic " + encode(email + ":" + password)
        },
    })
        .then(data => data.json())
}

const StudentLogin = ({ setToken }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = async e => {
        e.preventDefault()
        const token = await loginStudent({
            email,
            password
        })
        console.log(token)
        setToken(token)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="email" onChange={e => setEmail(e.target.value)}/><br/>
                <input type='text' placeholder="password" onChange={e => setPassword(e.target.value)}/><br/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default StudentLogin