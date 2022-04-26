import React, { FC, useCallback } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './style';
import gravatar from 'gravatar';
const Workspace: FC = ({children}) => {
    const {data, error, mutate} = useSWR("/api/users", fetcher, 
    {
       //dedupingInterval:20000 //20초
    })
    const navigate = useNavigate();

    const onLogOut = useCallback(() => {
        axios.post("/api/users/logout",null, {
            withCredentials:true
        })
        .then(() => {
            mutate(false, false);
        })
    },[]);

    if(!data){
        navigate("/login");
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span>
                        <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.email}/>
                    </span>
                </RightMenu>
            </Header>
            <button onClick={onLogOut}>로그아웃</button>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>dd</MenuScroll>
                </Channels>
                <Chats> {children}</Chats>
            </WorkspaceWrapper>

        </div>
    );
};

export default Workspace;