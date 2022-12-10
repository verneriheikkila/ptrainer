// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { groupBy, sumBy } from 'lodash';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Label,
    ResponsiveContainer,
} from 'recharts';
import { GETTAPI_URL } from '../constants';

export default function Statistics() {
    const [trainings, setTrainings] = useState([]);

    const getTrainings = () => {
        fetch(GETTAPI_URL)
            .then((response) => response.json())
            .then((data) => setTrainings(data))
            .catch((err) => console.error(err));
    };

    useEffect(() => getTrainings(), []);

    const grouped = groupBy(trainings, 'activity');

    let data = [];

    for (const activity in grouped) {
        data.push({
            activity: activity,
            duration: sumBy(grouped[activity], 'duration'),
        });
    }

    return (
        <div
            style={{
                width: '90%',
                height: '50vh',
                display: 'inline-block',
                maxWidth: '1250px',
            }}
        >
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 15,
                        right: 15,
                        left: 15,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid strokeDasharray="0 0" />
                    <XAxis dataKey="activity">
                        <Label
                            value="Total duration of each activity (min)"
                            offset={0}
                            position="bottom"
                        />
                    </XAxis>
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#1976D2" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
