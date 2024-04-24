import React, { useState } from 'react';

const EventFilter = ({ data }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        const filtered = data.filter(entry => {
            const entryDate = new Date(entry.day).toISOString().slice(0, 10);
            return entryDate === e.target.value;
        });
        setFilteredEvents(filtered);
    };

    return (
        <div>
            <label htmlFor="date">Select Date:</label>
            <input type="date" id="date" value={selectedDate} onChange={handleDateChange} />
            {filteredEvents.length > 0 && (
                <div>
                    <h2>Events on {selectedDate}:</h2>
                    <ul>
                        {filteredEvents.map(entry => (
                            <li key={entry.id}>
                                <h3>{new Date(entry.day).toLocaleDateString()}</h3>
                                <ul>
                                    {entry.events.map(event => (
                                        <li key={event.title}>
                                            <p>{event.title} - {event.time}</p>
                                            <p>Users: {event.users.join(', ')}</p>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EventFilter;
