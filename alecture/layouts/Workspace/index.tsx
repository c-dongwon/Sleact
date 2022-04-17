import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Workspace: FC = ({children}) => {
    const {data, error, mutate} = useSWR("/api/users", fetcher, 
    {
       // dedupingInterval:20000 //20초
    })
    const navigate = useNavigate();

    const onLogOut = useCallback(() => {
        axios.post("/api/users/logout",null, {
            withCredentials:true
        })
        .then(() => {
            mutate(false, true);
        })
    },[]);

    if(!data){
        navigate("/login");
    }

    return (
        <div>
            <button onClick={onLogOut}>로그아웃</button>
            {children}
        </div>
    );
};

export default Workspace;