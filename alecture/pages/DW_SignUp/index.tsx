import useInput from '@hooks/dw_useInput';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import dw_fetcher from '@utils/dw_fetcher';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './styles';
import { Redirect } from 'react-router';

const SignUp = () => {
  const {data, error, revalidate} = useSWR("http://localhost:3095/api/users", dw_fetcher);


    const [email, onChangeEmail] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, , setPassword] = useInput("");
    const [passwordCheck, , setPasswordCheck] = useInput("")
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState("");
    const [signUpSuccess, setSignUpSuccess] = useState(false);


    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
        setMismatchError(e.target.value !== passwordCheck);
        console.log(mismatchError)
    },[passwordCheck]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setMismatchError(e.target.value !== password);
        console.log(mismatchError)
    },[password]);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setSignUpError("")
        setSignUpSuccess(false)
        if(!mismatchError && nickname){
            axios.post("http://localhost:3095/api/users",{
                email,
                nickname,
                password
            })
            .then((res) => {
                console.log(res)
                setSignUpSuccess(true)
            })
            .catch((error) => {
                console.log(error.response)
                setSignUpError(error.response.data)
            })
        }
    },[email, nickname, password, passwordCheck, mismatchError])

    if (data === undefined) {
      return <div>로딩중...</div>;
    }
  
    if (data) {
      return <Redirect to="/Workspace" />;
    
    }
    return (
        <div id="container">
        <Header>Sleact</Header>
        <Form onSubmit={onSubmit}>
          <Label id="email-label">
            <span>이메일 주소</span>
            <div>
              <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
            </div>
          </Label>
          <Label id="nickname-label">
            <span>닉네임</span>
            <div>
              <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
            </div>
          </Label>
          <Label id="password-label">
            <span>비밀번호</span>
            <div>
              <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
            </div>
          </Label>
          <Label id="password-check-label">
            <span>비밀번호 확인</span>
            <div>
              <Input
                type="password"
                id="password-check"
                name="password-check"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
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