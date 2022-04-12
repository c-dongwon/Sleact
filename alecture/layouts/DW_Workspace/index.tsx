import React, { useCallback, FC, useState } from 'react';
import useSWR from 'swr';
import dw_fetcher from '@utils/dw_fetcher';
import axios from 'axios';
import {Switch, Route, Redirect } from 'react-router';
import { Channels, Header, ProfileImg, RightMenu, WorkspaceWrapper, Workspaces, Chats, WorkspaceName, MenuScroll, ProfileModal, LogOutButton } from './styles';
import gravatar from "gravatar"
import loadable from '@loadable/component';
import Menu from '@components/DW_Menu';

const Channel = loadable(() => import('@pages/DW_Channel'));
const DirectMessage = loadable(() => import('@pages/DW_DirectMessage'));

const Workspace: FC= () => {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const {data, error, revalidate, mutate} = useSWR("http://localhost:3095/api/users", dw_fetcher);

    const logout = useCallback(() =>{
        axios.post("http://localhost:3095/api/users/logout",null, {
            withCredentials:true
        })
        .then(() =>{
            mutate(false, false)
        })
    },[]);
    
    const onClickUserProfile = useCallback(() => {
        setShowUserMenu((prev) => !prev)
    },[]);

    if(!data){
        return <Redirect to="/login"/>
    }
    return (
        <div>
            <Header>
                <RightMenu onClick={onClickUserProfile}>
                    <span>
                        <ProfileImg src={gravatar.url(data.email, {s:"28px", d:"retro"})} alt={data.email}/>
                        {showUserMenu && 
                            <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <img src={gravatar.url(data.email, {s:"36px", d:"retro"})} alt={data.email}/>
                                    <div>
                                        <span id="profile-name">{data.email}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={logout}>로그아웃</LogOutButton>
                            </Menu>}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>test</Workspaces>
                <Channels>
                    <WorkspaceName>Sleact</WorkspaceName>
                    <MenuScroll>menu</MenuScroll>
                </Channels>
                <Chats>
                <Switch>
                    <Route path="/Workspace/Channel" component={Channel} />
                    <Route path="/Workspace/dm" component={DirectMessage} />
                </Switch>
                </Chats>
            </WorkspaceWrapper>
         
        </div>
    );
};

export default Workspace;