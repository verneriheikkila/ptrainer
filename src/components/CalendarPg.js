import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GETTAPI_URL } from '../constants';

export default function CalendarPg() {
    const [events, setEvents] = useState([]);
    const localizer = momentLocalizer(moment);

    useEffect(() => getTrainings());

    const getTrainings = () => {
        fetch(GETTAPI_URL)
            .then((response) => response.json())
            .then((data) => setEvents(eventConverter(data)))
            .catch((err) => console.error(err));
    };

    const eventConverter = (list) => {
        const newList = list.map((event) => {
            return {
                start: moment(event.date).toDate(),
                end: moment(event.date).add(event.duration, 'm').toDate(),
                title: `${event.activity} / 
                    ${event.customer?.firstname.slice(0, 1)}. 
                    ${event.customer?.lastname}`,
            };
        });
        return newList;
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{
                    height: 600,
                    width: '90%',
                    display: 'inline-block',
                    maxWidth: 1250,
                    margin: 15,
                }}
            />
        </div>
    );
}
