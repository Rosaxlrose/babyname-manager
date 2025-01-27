import React from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import './App.css';
import NameManager from './components/NameManager';
import AdminAI from './components/AiAdmin';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<NameManager />} />
            <Route path="/admin-ai" element={<AdminAI />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
