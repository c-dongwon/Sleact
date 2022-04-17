import React, { useCallback, useState } from 'react';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

const LogIn = () => {
    const {data, error, mutate} = useSWR("/api/users", fetcher);

    const [loginError, setLoginError] = useState('')
    const [email, onChangeEmail, setEmail] = useInput('');
    const [password, onChangePassword, setPassword] = useInput('');
    const navigate = useNavigate();

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post("/api/users/login",
        {
            email,
            password
        },{
            withCredentials: true,
        })
        .then((response) => {
            mutate(response.data, true)
        })
        .catch((error) => {
            setLoginError(error.response.data)
        })
    },[email, password]);


    if(data){
        navigate("/workspace/channel");
    }

    return (
        <div id="container">
            <Header>
                <img src="/dist/slack_logo.svg" alt="" width="250"/>
                <p> Clone Coding Made by 최동원<br/><img src="/dist/react-logo.svg" alt="" height="20"/>&nbsp;React &nbsp;&nbsp; <img src="/dist/typescript.svg" alt="" height="20"/>&nbsp;TypeScript</p>    
            </Header>
            <Form onSubmit={onSubmit}>
                <Label id="email-label">
                    <span>이메일</span>
                    <div>
                        <Input type="email" id="email" value={email} onChange={onChangeEmail}/>
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" value={password} onChange={onChangePassword}/>
                    </div>
                    {loginError && <Error>{loginError}</Error>}
                </Label>
                <Button>
                    로그인
                </Button>
            </Form>
            <LinkContainer>
                아직 회원이 아니신가요?&nbsp;
                <Link to="/signup">회원가입 하러가기</Link>
            </LinkContainer>
        </div>
    );
};

export default LogIn;