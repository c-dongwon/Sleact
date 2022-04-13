import React, { useCallback, FC, useState } from 'react';
import useSWR from 'swr';
import dw_fetcher from '@utils/dw_fetcher';
import axios from 'axios';
import {Switch, Route, Redirect } from 'react-router';
import { Channels, Header, ProfileImg, RightMenu, WorkspaceWrapper, Workspaces, Chats, WorkspaceName, MenuScroll, ProfileModal, LogOutButton, WorkspaceButton, AddButton } from './styles';
import gravatar from "gravatar"
import loadable from '@loadable/component';
import Menu from '@components/DW_Menu';
import { Link } from 'react-router-dom';
import { IUser } from '@typings/db';
import { Button, Input, Label } from '@pages/SignUp/styles';
import useInput from 'hooks/useInput';
import Modal from '@components/DW_Modal';

const Channel = loadable(() => import('@pages/DW_Channel'));
const DirectMessage = loadable(() => import('@pages/DW_DirectMessage'));

const Workspace: FC= () => {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false)

    const {data:userData, error, revalidate, mutate} = useSWR<IUser | false>("http://localhost:3095/api/users", dw_fetcher);

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
    
    const onClickCreateWorkspace = useCallback(() =>{
        setShowCreateWorkspaceModal(true)
    },[])

    const onCreateWorkspace = useCallback(() => {},[])

    const onCloseModal = useCallback(() => {},[])
    if(!userData){
        return <Redirect to="/login"/>
    }
    return (
        <div>
            <Header>
                <RightMenu onClick={onClickUserProfile}>
                    <span>
                        <ProfileImg src={gravatar.url(userData.email, {s:"28px", d:"retro"})} alt={userData.email}/>
                        {showUserMenu && 
                            <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <img src={gravatar.url(userData.email, {s:"36px", d:"retro"})} alt={userData.email}/>
                                    <div>
                                        <span id="profile-name">{userData.email}</span>
                                        <span id="profile-active">Active</span>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={logout}>로그아웃</LogOutButton>
                            </Menu>}
                    </span>
                </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>
                    {userData?.Workspaces.map((ws) => {
                        return(
                            <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                            </Link>
                        )
                    })}
                    <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
                </Workspaces>
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