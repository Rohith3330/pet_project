import React, {useState}from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/Login';
import Nomatch from './Components/Nomatch';
import Analytics from './Components/Analytics';
import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import {BarChartOutlined,UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Button, Flex} from 'antd';
import Calendarbox from './Components/Calendar_box';
const { Header, Content, Footer, Sider } = Layout;

const App = () => {
const navigate=useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    UserOutlined,
    BarChartOutlined,
  ].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label:index===0?'Home':'Analytics',
    onClick:index===0?()=>navigate('/home'):()=>{navigate('/analytics')}
  }));
  const [User, setUser] = useState(null);
  const handleLogin=(user)=>{
    setUser(user);
  }
  const handleLogout=()=>{
    setUser(null);
  }
  const ProtectedRoute = ({ children }) => {
    return User ? children : <Navigate to="/" replace />;
  };
  const getUser=()=>{
    return User
  }
 
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
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']} 
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
        <Flex gap='medium'>
        {User && <Button type="primary" 
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
            <Routes>
        <Route path="/home" element={<ProtectedRoute><Calendarbox getuser={getUser}/></ProtectedRoute>}/>
        <Route path='/analytics' element={<ProtectedRoute> <Analytics/></ProtectedRoute>}/>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path='*' element={<Nomatch/>}/>
      </Routes>
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Beautiful code ©{new Date().getFullYear()} Created by Ro
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
