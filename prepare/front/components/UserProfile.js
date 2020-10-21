import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../reducers/user';
import { Card, Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

const UserProfile = () => {
  const dispatch = useDispatch();

  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="followers">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me && me.nickname[0]}</Avatar>}
        title={me && me.nickname}
      />
      <Button onClick={onLogout} loading={isLoggingOut}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
