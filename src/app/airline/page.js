'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AirlinePage () {
    const [airlines, setAirlines] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAccessToken = async () => {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
        params.append('client_id', 'D11110201-f8f017df-5c2d-4448');
        params.append('client_secret', 'e23f1b02-7927-402e-b556-b4ec75a28bc2');
    
        const response = await axios.post(
            'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
            params
        );
        console.log(response);
    
        return response.data.access_token;
    }
    
    const fetchAirlines = async () => {
        try {
            const token = await getAccessToken();
    
            const response = await axios.get(
                'https://tdx.transportdata.tw/api/basic/v2/Air/Airline',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        $top: 30,
                        $format: 'JSON',
                    }
                }
            );
    
            console.log(response.data);
            setAirlines(response.data);
        }
        catch (err) {
            console.error(err)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAirlines();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Airlines</h1>

            {loading? (
                <p>loading</p>
            ) : (
                <ul className="list-disc pl-6 space-y-2">
                    {airlines.map((airline) => (
                        <li key={airline.AirlineID}>
                            {airline.AirlineName.Zh_tw || airline.AirlineName.En}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

