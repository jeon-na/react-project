import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { FormOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import Router from 'next/router';
import useInput from '../hooks/useInput';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !import;
        margin-left: 0 !import;
    }

    .ant-col:first-child {
        padding-left: 0 !import;
    }

    .ant-col:last-child {
        padding-right: 0 !import; 
    }
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(()=> {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
          <Global />
          <Menu mode="horizontal">
              <Menu.Item>
              <img style={{width: '50px', height: '50px'}} src="https://velog.velcdn.com/images/onezerolee00/post/a43beec0-e69c-4da9-b98e-b0b13f982af0/image.png" />
              </Menu.Item>
              <Menu.Item>
                <SearchInput 
                enterButton
                value={searchInput}
                onChange={onChangeSearchInput}
                onSearch={onSearch} //엔터를 누르면 onSearch실행
                />
              </Menu.Item>
              <Menu.Item>
              <Link href="/signup"><a><FormOutlined key="sign up bar"/> Sign up</a></Link>
              </Menu.Item>
              <Menu.Item>
              <Link href="/profile"><a><UserOutlined key="profile bar"/> Profile</a></Link>
              </Menu.Item>
              <Menu.Item>
              <Link href="/"><a><HomeOutlined key="feed bar"/> Feed</a></Link>
              </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>{children}</Col>
            </Row>
        </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;