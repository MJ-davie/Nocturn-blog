import React, { useState, useEffect, use } from "react";
import style from "styled-components";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('isAdmin') === 'true');
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();

        fetch('api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id: ID,
                password: Password
            }),
            credentials: 'include',
        })
        .then((res) => {
            if (res.ok) {
                localStorage.setItem('isAdmin', 'true');
                setIsLoggedIn(true);
                navigate('/GalleryPage');
            } else {
                alert('Login failed!');
            }
        })
        .catch((err) => {
            console.error(err);
            alert('Login error!');
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
    };

    return (
        <LoginContainer>
            {isLoggedIn ? (
                <>
                    <h2>Welcome, Admin!</h2>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <h2>Admin Login</h2>
                    <form onSubmit={handleLogin}>
                        <input type="text" placeholder="ID" value={ID} onChange={(e)=> setID(e.target.value)}/>
                        <input type="password" placeholder="Password" value={Password} onChange={(e)=> setPassword(e.target.value)}/>
                        <button type="submit">Login</button>
                    </form>
                </>
            )}
        </LoginContainer>
    );
};

export default AdminLogin;

const LoginContainer = style.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  & input {
    width: 200px;
    padding: 10px;
    margin: 10px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
    & button {
        width: 220px;
        padding: 10px;
        background-color: #0059A1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;
