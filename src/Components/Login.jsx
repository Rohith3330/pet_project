import React from 'react';
import { useState } from 'react';
import { Button,Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../API/api'
import { useQuery,useQueryClient,useMutation} from 'react-query';
import {auth,provider}from '../config'
import {signInWithPopup} from 'firebase/auth'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { User } from '../user_States/Atoms';
import {GoogleOutlined} from '@ant-design/icons'

const LoginPage = ({ onLogin }) => {
  const navigate=useNavigate();
  const [user,]=useRecoilState(User)
  const queryClient=useQueryClient();
  const [Creds, setCreds] = useState(true);
  const { data: userData, isLoading, isError } = useQuery(
    ['Users' ],
    () => fetchUsers(),
    {
      keepPreviousData: true,
    }
  );
  const addUserMutation = useMutation(
    newPostData =>
      axios.post('http://localhost:4000/Users', newPostData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('Users');
      },
    }
  );

  const OnFinish = async (values) => {
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;
    if(userData){
      const matchedUser = userData.data.find(element => {
        return element.username === values.username && element.password === values.password;
      });
      
        if(matchedUser){
          onLogin(matchedUser.name)
          navigate('/home')
          setCreds(true)
        }
        else{
          setCreds(false);
        }
    }
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleclick=()=>{
      signInWithPopup(auth,provider).then((data)=>{
        // console.log(data.user)
        onLogin(data.user.displayName)
        if(userData){
          const matchedUser = userData.data.find(element => {
            return element.name === data.user.displayName;
          });
          // console.log(matchedUser)
          if(!matchedUser){
            addUserMutation.mutate({username:data.user.email,name:data.user.displayName})
            navigate('/home')
            setCreds(true)
          }
          onLogin(data.user.displayName)
          navigate('/home')
          setCreds(true);
        }
      }).catch(err=>console.log(err))
  }
  
  return(
    <div>
  <div style={{display: 'flex', justifyContent:'center', alignItems:'center', height: '79vh' ,backgroundColor:'lightblue'}}>
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
    <Form.Item>
      {user &&
      <h2 style={{paddingLeft:'70px',width:"500px"}}>Login as different User</h2>
      }
      {!user &&
        <h2 style={{paddingLeft:'160px'}}>Login</h2>

      }
    </Form.Item>
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
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" >
        Login
      </Button>
    </Form.Item>
    <Form.Item
     wrapperCol={{
      offset: 8,
      span: 16,
    }}
    >
    <Button onClick={handleclick}><GoogleOutlined/>Sign in with Google </Button>
    </Form.Item>
  </Form>
  {!Creds && <div>Username or Password is incorrect</div>}
  
  </div>
  </div>
);
}
export default LoginPage;