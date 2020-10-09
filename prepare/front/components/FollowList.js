import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';

const StList = styled(List)`
  margin-bottom: 20px;
`;

const StLoadMore = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const FollowList = ({ header, data }) => {
  return (
    <StList
      grid={{ gutter: 4, xs: 2, md: 3 }}
      header={<div>{header}</div>}
      size="small"
      loadMore={
        <StLoadMore>
          <Button>더 보기</Button>
        </StLoadMore>
      }
      bordered
      dataSource={data}
      renderItem={({ nickname }) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={nickname} />
          </Card>
        </List.Item>
      )}
    ></StList>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
