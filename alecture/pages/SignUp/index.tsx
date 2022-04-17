import React, { useCallback, useState } from 'react';
import useInput from '@hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const SignUp = () => {
    const {data, error, revalidate} = useSWR("/api/users", fetcher)
    const [email, onChangeEmail, setEmail] = useInput('');
    const [nickname, onChangeNickname, setNickname] = useInput('');
    const [password, , setPassword] = useInput('');
    const [passwordCheck, , setPasswordCheck] = useInput('');
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const navigate = useNavigate();

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        setMismatchError(e.target.value !== passwordCheck);
    },[passwordCheck]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setMismatchError(e.target.value !== password);
    },[password]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setSignUpError('');
        setSignUpSuccess(false);

        if(!mismatchError && nickname){
           axios.post("/api/users",{
               email,
               nickname,
               password
           })
           .then((res) => {
                setSignUpSuccess(true);
                setEmail('');
                setNickname(' ');
                setPassword('');
                setPasswordCheck('');
                if(window.confirm('회원가입이 완료되었습니다. 로그인페이지로 이동합니다.')){
                    navigate('/login');
                }else{
                    return
                }
           })
           .catch((error) => {
              setSignUpError(error.response.data)
           })
        }
        
    },[email, nickname, password, passwordCheck, mismatchError, nickname]);

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
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}/>
                    </div>
                </Label>
                <Label id="nickname-label">
                    <span>닉네임</span>
                    <div>
                        <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}/>
                    </div>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword}/>
                    </div>
                </Label>
                <Label id="password-check-label">
                    <span>비밀번호 확인</span>
                    <div>
                        <Input type="password" id="password-check" name="password-check" 
                        value={passwordCheck} onChange={onChangePasswordCheck}/>
                    </div>
                    {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
                    {!nickname && <Error>닉네임을 입력해주세요.</Error>}
                    {signUpError && <Error>{signUpError}</Error>}
                    {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
                </Label>
                <Button type="submit">회원가입</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요?&nbsp;
                <Link to="/login">로그인 하러가기</Link>
            </LinkContainer>
        </div>
    );
};

export default SignUp;