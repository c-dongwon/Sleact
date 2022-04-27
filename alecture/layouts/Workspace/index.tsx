import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './style';
import gravatar from 'gravatar';
import Menu from '@components/Menu';

const Workspace: FC = ({children}) => {
    const [showUserMenu, setShowUserMenu] = useState(false)
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

    const onClickUserProfile = useCallback(() =>{
        setShowUserMenu((prev) => !prev)
    },[])

    if(!data){
        navigate("/login");
    }

    return (
        <div>
            <Header>
                <RightMenu>
                    <span onClick={onClickUserProfile}>
                        {data && <ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.email}/>}
                        {showUserMenu &&  (
                            <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile} closeButton={false}>
                                <ProfileModal>
                                    <img src={gravatar.url(data.email,{s:"36px",d:"retro"})} alt={data.email} />
                                    <div>
                                        <span id="profile-name">{data.nickname}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                    </ProfileModal>
                                <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
                            </Menu>
                        )}
                    
                    </span>
                </RightMenu>
            </Header>
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