import loadable from '@loadable/component';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const SignUp = loadable(() => import('@pages/SignUp'))
const LogIn = loadable(() => import('@pages/LogIn'))
const Channel = loadable(() => import('@pages/Channel'))
const DirectMessage = loadable(() => import('@pages/DirectMessage'))

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <LogIn/>}/>
      <Route path="/signup" element={ <SignUp/>}/>
      <Route path="/login" element={ <LogIn/>}/>
      <Route path="/workspace/channel" element={ <Channel/>}/>
      <Route path="/workspace/dm" element={ <DirectMessage/>}/>
    </Routes>
  );
};

export default App;