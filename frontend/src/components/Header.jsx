import React from "react";
import styled from "styled-components";

const Header = () => {
    return (
        <MainHeader>
            <img src="/images/logo.png" alt="Logo" className="logo"/>
        </MainHeader>
    );
};

export default Header;

const MainHeader = styled.header`
    padding : 20px 30px;
    font-family: sans-serif;
    font-size: 32px;`
