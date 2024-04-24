/* eslint-disable jsx-a11y/anchor-is-valid */
import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';
import { useQuery} from 'react-query';
import AddEvent from './AddEvent';
import { useState } from 'react';
import { fetchevents } from '../API/api';


const Calendarbox = ({getuser}) => {
  const [User] = useState(getuser())
  const [EventMap,setEventMap]=useState(new Map())

  const { data: eventData } = useQuery(
    ['event'],
    () => fetchevents(),
    {
      keepPreviousData: true,
      onSuccess:(eventData)=>{
        const map=new Map();
        eventData.data.forEach((e)=>{
          let d=new Date(e.day);
          map.set(d.toDateString(),e.events);
        })
        setEventMap(map)
      }
    }
  );
  
  const getTodoList=(date)=> {
    if(EventMap.get(date.toDateString())){
      const events= EventMap.get(date.toDateString())
      const filtered_events=events.filter((e)=>{
        if(e.users.includes(User)){
          // console.log(e.users,User)
          return true
        }
        return false;
      })
      // console.log(filtered_events)
      return filtered_events;
    }
      return [];  
  }
  const renderCell=(date)=> {
    const list = getTodoList(date);
    // console.log(list)
    const displayList = list.filter((item, index) => index < 2);

    if (list.length) {
      const moreCount = list.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="click"
            speaker={
              <Popover>
                {list.map((item, index) => (
                  <p key={index}>
                    <b>{item.time}</b> - {item.title}
                  </p>
                ))}
              </Popover>
            }
          >
            <a>{moreCount} more</a>
          </Whisper>
        </li>
      );

      return (
        <ul className="calendar-todo-list">
          {displayList.map((item, index) => (
            <li key={index}>
              <Badge /> <b>{item.time}</b> - {item.title}
            </li>
          ))}
          {moreCount ? moreItem : null}
        </ul>
      );
    }

    return null;
  }

  return (
    <div>
      {!eventData && <p>loading</p>}
      {eventData && <div>

      <AddEvent/>
      <Calendar bordered renderCell={renderCell} />
        </div>
      }
    </div>
  );
};
export default Calendarbox;