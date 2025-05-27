import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavB from './components/NavB';
import {ItemConsole} from './components/ItemConsole';
import {UserConsole} from './components/UserConsole';
import { RequestConsole } from './components/RequestConsole';

function App() {
  return (
    <>
    <NavB/>
    
    {/* <RequestConsole/> */}
    {/* <ItemConsole/> */}
    <UserConsole/>
    </>
  );
}

export default App;
