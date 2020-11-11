import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { changeNickname } from '../reducers/user';

const StForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 10px;
`;

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, setNickname, onChangeNickname] = useInput(
    me?.nickname || ''
  );
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    console.log('nickname: ', nickname);
    dispatch(changeNickname(nickname));
  }, [nickname]);

  return (
    <StForm>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </StForm>
  );
};

export default NicknameEditForm;
