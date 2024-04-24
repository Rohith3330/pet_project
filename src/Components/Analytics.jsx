import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';
import BasicPie from './PieChart';
import BarsDataset from './BarGraph';

const Analytics = () => {
    const [PieData, setPieData] = useState([])
    const [users, setusers] = useState([])
    const [Dataset, setDataset] = useState([])
    const fetchevents = async () => {
        const response = await axios.get(`http://localhost:4000/Events`);
        return {
          data: response.data
        };
      };
      useQuery(
        ['event'],
        () => fetchevents(),
        {
          keepPreviousData: true,
          onSuccess:(eventData)=>{
            const map=new Map();
            eventData.data.forEach((e)=>{
                e.events.forEach((ele)=>{
                    ele.users.forEach((elem)=>{
                        map.set(elem,map.has(elem)?map.get(elem)+1:1)
                    })
                })
            })
            setusers(map.keys())
            let arr=[];
            map.forEach((values, keys) => {
                arr.push({id:keys,value:values,label:keys})
            });
            const generateUserCountByMonth=(data)=> {
                const userCountByMonth = {};
            
                data.forEach(entry => {
                    const month = new Date(entry.day).toLocaleString('default', { month: 'short' });
                    const events = entry.events;
                    events.forEach(event => {
                        event.users.forEach(user => {
                            if (!userCountByMonth[month]) {
                                userCountByMonth[month] = {};
                            }
                            if (!userCountByMonth[month][user]) {
                                userCountByMonth[month][user] = 1;
                            } else {
                                userCountByMonth[month][user]++;
                            }
                        });
                    });
                });
            
                const result = Object.keys(userCountByMonth).map(month => {
                    const userCounts = userCountByMonth[month];
                    const monthData = { month };
                    Object.keys(userCounts).forEach(user => {
                        monthData[user] = userCounts[user];
                    });
                    return monthData;
                });
            
                return result;
            }
            setDataset(generateUserCountByMonth(eventData.data))              
            setPieData(arr)
          }
        }
      );
    return (
        <div>
            <BasicPie params={PieData}/>
            <BarsDataset users={users} params={Dataset}/>
        </div>
    );
};

export default Analytics;