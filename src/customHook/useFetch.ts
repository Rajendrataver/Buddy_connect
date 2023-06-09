import { useState, useEffect } from 'react';
import axios from 'axios';
const useFetch = () => {
    const token = localStorage.getItem('token')
    const fetchData = async (url: string, method: string, token: string | null, data?: object) => {
        const response = await axios({
            url,
            method,
            data,
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        return response;
    };

    return fetchData;
};

export default useFetch;