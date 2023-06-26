
import axios from 'axios';
const useFetch = () => {

    const token = localStorage.getItem('token')
    

    const fetchData = async (url: string, method: string, data?: object) => {
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