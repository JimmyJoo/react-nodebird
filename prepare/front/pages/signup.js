import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP } from '../reducers/user';

const StSignupForm = styled(Form)`
  padding: 10px;
`;

const StFormItemWrapper = styled.div`
  margin-bottom: 10px;
`;

const StErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone } = useSelector((state) => state.user);

  const [email, setEmail, onChangeEmail] = useInput('');
  const [nickname, setNickname, onChangeNickname] = useInput('');
  const [password, setPassword, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(password !== e.target.value);
    },
    [passwordCheck, password]
  );

  const [term, setTerm] = useState('');
  const onChangeTerm = useCallback(
    (e) => {
      setTerm(e.target.checked);
      setTermError(false);
    },
    [term]
  );
  const [termError, setTermError] = useState(false);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, term]);

  useEffect(() => {
    if (signUpDone) {
      setEmail('');
      setPassword('');
      setNickname('');
    }
  }, [signUpDone]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <StSignupForm onFinish={onSubmit}>
        <StFormItemWrapper>
          <label>이메일</label>
          <br />
          <Input
            id="signup-email"
            name="signup-email"
            value={email}
            type="email"
            required
            onChange={onChangeEmail}
          />
        </StFormItemWrapper>
        <StFormItemWrapper>
          <label>닉네임</label>
          <br />
          <Input
            id="signup-nickname"
            name="signup-nickname"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </StFormItemWrapper>
        <StFormItemWrapper>
          <label>비밀번호</label>
          <br />
          <Input
            id="signup-password"
            name="signup-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </StFormItemWrapper>
        <StFormItemWrapper>
          <label>비밀번호 확인</label>
          <br />
          <Input
            id="signup-passwordCheck"
            name="signup-passwordCheck"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <StErrorMessage>비밀번호가 다릅니다.</StErrorMessage>
          )}
        </StFormItemWrapper>
        <StFormItemWrapper>
          <Checkbox name="signup-term" checked={term} onChange={onChangeTerm}>
            동의하십니까?
          </Checkbox>
          {termError && <StErrorMessage>동의하기를 눌러주세요.</StErrorMessage>}
        </StFormItemWrapper>
        <StFormItemWrapper>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </StFormItemWrapper>
      </StSignupForm>
    </AppLayout>
  );
};

export default Signup;
