import React, { useCallback, useState } from 'react';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/useInput';
import { Link, Navigate, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

const LogIn = () => {
    const {data, error, mutate} = useSWR("/api/users", fetcher); // 로그인 데이터 전역관리 SWR
    const [loginError, setLoginError] = useState('') //로그인 에러 문구
    const [email, onChangeEmail, setEmail] = useInput(''); // email input이벤트 커스텀훅
    const [password, onChangePassword, setPassword] = useInput(''); // password input이벤트 커스텀훅
    const navigate = useNavigate();

    const onSubmit = useCallback((e) => {
        e.preventDefault(); // 새로고침 방지
        axios.post("/api/users/login", // 서버로 post 요청
        {
            email,
            password
        },{
            withCredentials: true,// 서버와 클라이언트 통신을 위한 옵션
        })
        .then((response) => {
            mutate(response.data, false) // 성공시 서버 응답받지않고 로컬데이터로 업데이트
        })
        .catch((error) => {
            setLoginError(error.response.data) // 실패시 에러문구 화면 출력
        })
    },[email, password]);

    if(data === undefined){
        //데이터를 받아오는 중
        <div>로딩중..</div>
    }

    if(data){
        //데이터 있으면 채널로 이동
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