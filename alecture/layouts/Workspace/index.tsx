import React, { FC, useCallback, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    AddButton,
    Channels,
    Chats,
    Header,
    LogOutButton,
    MenuScroll,
    ProfileImg,
    ProfileModal,
    RightMenu,
    WorkspaceButton,
    WorkspaceModal,
    WorkspaceName,
    Workspaces,
    WorkspaceWrapper,
  } from '@layouts/Workspace/style';
import gravatar from 'gravatar';
import Menu from '@components/Menu';
import { IUser } from '@typings/db';

const Workspace: FC = ({children}) => {
    
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
        dedupingInterval: 2000, // 2초
      });
      if (!userData) return null;
    const navigate = useNavigate();

    const onLogout = useCallback(() => {
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

    const onClickCreateWorkspace = useCallback(() => {

    },[]);
    const onCloseModal = useCallback(() => {
        
    },[])
    if(!userData){
        navigate("/login");
    }

    return (
        <div>
            <Header>
            <RightMenu>
                <span onClick={onClickUserProfile}>
                    <ProfileImg src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} />
                    {showUserMenu && (
                    <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseModal}>
                        <ProfileModal>
                        <img src={gravatar.url(userData.nickname, { s: '36px', d: 'retro' })} alt={userData.nickname} />
                        <div>
                            <span id="profile-name">{userData.nickname}</span>
                            <span id="profile-active">Active</span>
                        </div>
                        </ProfileModal>
                        <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                    </Menu>
                    )}
                </span>
            </RightMenu>
            </Header>
            <WorkspaceWrapper>
                <Workspaces>{userData?.Workspaces.map((ws) => {
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
                    <MenuScroll>dd</MenuScroll>
                </Channels>
                <Chats> {children}</Chats>
            </WorkspaceWrapper>

        </div>
    );
};

export default Workspace;