import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import useMe from './hooks/useMe';
import Frontpage from './components/Frontpage';
import ReadLogs from './components/ReadLogs';
import AppBar from './components/AppBar';
import LoggedUserProvider from './components/LoggedUserProvider';
import MyStats from './components/MyStats';
import UploadCsv from './components/UploadCsv';
import Settings from './components/Settings';
import Competitions from './components/Competitions';

function App() {
  return (
    <LoggedUserProvider>
      <AppBar />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/stats" element={<MyStats />} />
        <Route path="/upload" element={<UploadCsv />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logs" element={<ReadLogs />} />
      </Routes>
    </LoggedUserProvider>
  );
}

export default App;
