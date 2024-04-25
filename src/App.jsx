import React from 'react';
import './App.css';
import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import {BarChartOutlined,UserOutlined,FileSearchOutlined} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Flex} from 'antd';
import Routeslist from './Components/Routes_list';
import { User } from './user_States/Atoms';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config';
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
const navigate=useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    UserOutlined,
    BarChartOutlined,
    FileSearchOutlined
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label:index===0?'Home':index===1?'Analytics':'Search',
    onClick:index===0?()=>navigate('/home'):index===1?()=>{navigate('/analytics')}:()=>{navigate('/Search')}
  }));
  const [username, setUser] = useRecoilState(User);
  const handleLogout=()=>{
    setUser(null);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (username) {
        setUser(user.displayName);
        navigate('/home')
      } else setUser(null);
    });
    return () => {
      unsubscribe();
    };
  });
 
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" >
            <img src={logo} alt='LOGO'/>
        </div>
        <Menu theme="dark" mode="inline" />

      </Sider>
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding:0
        }}
      >
        <div className="demo-logo" />
        {username && <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']} 
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />}
        <Flex gap='medium'>
        {username && <Button type="primary" 
        onClick={()=>{
          handleLogout();
          navigate('/')
        }}>Logout</Button>}
        </Flex>
      </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {username && <h2>Welcome {username} !</h2>}
            <Routeslist/>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Beautiful code ©{new Date().getFullYear()} Created by Rohith
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
