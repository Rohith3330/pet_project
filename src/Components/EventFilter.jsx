import React, { useState } from 'react';
import { DatePicker, List, Divider, Space } from 'antd';

const EventFilter = ({ data }) => {
  const [, setSelectedDate] = useState('');
  const [Noevents, setNoevents] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState([]);
    // console.log(data)
  const handleDateChange = (date) => {
    if(!date){
        setNoevents(false);
        setFilteredEvents([])
        return ;
    };
    setSelectedDate(date.format('YYYY-MM-DD'));
    const filtered = data.filter((entry) => {
        const entryDate = new Date(entry.day).toISOString().slice(0, 10);
        console.log(date.format('YYYY-MM-DD'),entryDate)
      return entryDate === date.format('YYYY-MM-DD');
    });
    setFilteredEvents(filtered);
    if(filtered.length===0){
        setNoevents(true)
    }
    else {
        setNoevents(false);
    }
  };

  return (
    <div>
        <>
            <p>Filter Events by Date</p>
        </>
      <Space direction="vertical">
        <DatePicker onChange={handleDateChange} />
      </Space>
      {filteredEvents.length > 0 && (
        <List
          itemLayout="vertical"
          dataSource={filteredEvents}
          renderItem={(event) => (
            <List.Item>
              <List.Item.Meta
                title={`Events on ${new Date(event.day).toLocaleDateString()}`}
              />
              <Divider plain />
              {event.events.map((event) => (
                <List.Item>
                  <List.Item.Meta
                    title={event.title}
                    description={`${event.time} - Attendees: ${event.users.join(', ')}`}
                  />
                </List.Item>
              ))}
            </List.Item>
          )}
        />
      )}
      {
        Noevents && <h2>No events found on this Date</h2>
      }
    </div>
  );
};

export default EventFilter;
