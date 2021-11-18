import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import useMe from './hooks/useMe';
import Particles from 'react-tsparticles';

import Frontpage from './pages/Frontpage';
import ReadLogs from './pages/Logs/Logs';
import AppBar from './components/AppBar';
import LoggedUserProvider from './components/LoggedUserProvider';
import Stats from './pages/Stats/Stats';
import UploadCsv from './components/UploadCsv';
import Settings from './pages/Settings/Settings';
import Competitions from './pages/Competitions/Competitions';

function App() {
  return (
    <LoggedUserProvider>
      <AppBar />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/upload" element={<UploadCsv />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logs" element={<ReadLogs />} />
      </Routes>
      <Particles
        options={{
          particles: {
            color: {
              value: '#5f5f5f',
            },
            size: {
              random: true,
              value: 3,
            },
            move: {
              enable: true,
            },
            zIndex: 10000,
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'attract',
              },
            },
          },
        }}
      />
    </LoggedUserProvider>
  );
}

export default App;
