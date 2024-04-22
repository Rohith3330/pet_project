import React from 'react';
import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../API/api'
import { useQuery} from 'react-query';


const LoginPage = ({ onLogin }) => {
  const navigate=useNavigate();
  const [Creds, setCreds] = useState(true);
  const { data: userData, isLoading, isError } = useQuery(
    ['Users' ],
    () => fetchUsers(),
    {
      keepPreviousData: true,
    }
  );
  const OnFinish = async (values) => {
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    if(userData){
      userData.data.forEach(element => {
        if(element.username===values.username && element.password===values.password){
          onLogin(element.name)
          navigate('/home')
          setCreds(true)
        }
        else{
          setCreds(false);
        }
      });
    }
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return(
  <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '100vh' ,backgroundColor:'lightblue'}}>
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={OnFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" >
        Submit
      </Button>
    </Form.Item>
  </Form>
  {!Creds && <div>Username or Password is incorrect</div>}
  </div>
);
}
export default LoginPage;