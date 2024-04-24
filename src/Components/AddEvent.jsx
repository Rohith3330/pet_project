/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from 'react';
import { Button, Modal,TimePicker,DatePicker,Form,Input,Select} from 'antd';
import { useMutation,useQuery,useQueryClient} from 'react-query';
import { fetchUsers } from '../API/api';
import axios from 'axios';
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
const AddEvent = () => {
  const queryClient=useQueryClient();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [options, setOptions] = useState([])
  const [form] = Form.useForm();
  const { data: userData, isLoading, isError } = useQuery(
    ['Users' ],
    () => fetchUsers(),
    {
      keepPreviousData: true,
      onSuccess: () => {
        queryClient.invalidateQueries(['event']);
      },
    }
  );
  useEffect(() => {
    if (userData && !isLoading && !isError) {
      // console.log(userData)
      const list=[]
      userData.data.forEach(e=>{
        const x={ 
          label: e.name, 
          value: e.name 
        }
        list.push(x);
      })
      setOptions([...options, ...list]);
    }
  }, [userData]);
  const showModal = () => {
    setOpen(true);
  };
  const deletePostMutation = useMutation(
    postId =>
      axios.delete(`http://localhost:4000/Events/${postId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['event']);
      },
    })
  const addPostMutation = useMutation(
    newPostData =>addEvent(newPostData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('event');
      },
    }
  );
  const addEvent=async(newEventData)=>{
    const data={...newEventData}
    let date=data.Date
    date=new Date(date)
    let time=data.time
    time=new Date(time)
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';hours = hours % 12;hours = hours ? hours : 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = hours + ':' + formattedMinutes + ' ' + ampm;
    const postdata={day:date,events:[{title:data.title,time:timeString,users:data.Users}]}
    const  db  = await axios.get('http://localhost:4000/Events');
    const eventIndex = db.data.filter(event => {
      const day=new Date(event.day)
      return day.toDateString() === date.toDateString()
  });
    // db.data.evn
    console.log(db.data,eventIndex)
    if(eventIndex[0]){
      postdata.events=[...postdata.events,...eventIndex[0].events];
      deletePostMutation.mutateAsync(eventIndex[0].id)
    }
    const response= await axios.post(`http://localhost:4000/Events`, postdata)
    console.log(response)
    return response

  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        addPostMutation.mutate(values);
        console.log(values)
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish=(values)=>{
    console.log(values)
}

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Event
      </Button>
      <Modal
        title="Add event"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ><Form form={form}
      {...formItemLayout}
      variant="filled"
      style={{
        maxWidth: 600,
      }}
  
      onFinish={onFinish}
    >
      <Form.Item
        label="Event Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <Input />
      </Form.Item>   
      <Form.Item
        label="Date"
        name="Date"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
  
      <Form.Item
        label="Time"
        name="time"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <TimePicker use12Hours format="h:mm a" />
      </Form.Item>
     
     <Form.Item
     label="Invite Users"
     name="Users"
     rules={[
       {
         required: true,
         message: 'Please input!',
       },
     ]}
     >
     
    <Select
      mode="multiple"
      label="Add Users"
      allowClear
      style={{
        width: '100%',
      }}
      placeholder="Please select"
      defaultValue={[]}
      options={options}
      />
      </Form.Item> 
    </Form>
      </Modal>
    </>
  );
};
export default AddEvent;