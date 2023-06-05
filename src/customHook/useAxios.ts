import { useState, useEffect } from 'react';
import axios from 'axios';




const useAxios = (url: string, data: object, method: string, token: string | null) => {
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios({
            url,
            method,
            data,
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then((res) => {
            setResponse(res.data);
        })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });


    };

    useEffect(() => {
        fetchData();
    }, []);

    // custom hook returns value
    return { response, error, loading };
};

export default useAxios;