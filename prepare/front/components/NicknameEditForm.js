import React from 'react';
import styled from 'styled-components';
import { Form, Input } from 'antd';

const StForm = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 10px;
`;

const NicknameEditForm = () => {
  return (
    <StForm>
      <Input.Search addonBefore="닉네임" enterButton="수정"></Input.Search>
    </StForm>
  );
};

export default NicknameEditForm;
