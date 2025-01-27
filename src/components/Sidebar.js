import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">App Navigation</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="block text-lg hover:bg-gray-700 px-4 py-2 rounded"
          >
            Name Manager
          </Link>
        </li>
        <li>
          <Link
            to="/admin-ai"
            className="block text-lg hover:bg-gray-700 px-4 py-2 rounded"
          >
            Admin AI
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
