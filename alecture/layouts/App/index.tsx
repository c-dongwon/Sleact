import loadable from '@loadable/component';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const SignUp = loadable(() => import('@pages/SignUp'))
const LogIn = loadable(() => import('@pages/LogIn'))
const Channel = loadable(() => import('@pages/Channel'))

const App = () => {
  return (
    <Routes>
      <Route path="/" element={ <LogIn/>}/>
      <Route path="/signup" element={ <SignUp/>}/>
      <Route path="/login" element={ <LogIn/>}/>
      <Route path="/workspace/channel" element={ <Channel/>}/>
    </Routes>
  );
};

export default App;