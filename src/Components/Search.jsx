import React from 'react';
import EventFilter from './EventFilter';
import { useQuery } from 'react-query';
import { fetchevents } from '../API/api';
const Search = () => {
    const {data:eventData}=useQuery(
        ['event'],
        () => fetchevents(),
        {
          keepPreviousData: true,
        }
    );
    return (
        <div style={{height:"72vh"}}>
            <EventFilter data={eventData.data}/>
        </div>
    );
};

export default Search;