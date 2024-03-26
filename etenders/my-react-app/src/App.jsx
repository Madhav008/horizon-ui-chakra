import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom
import DataTable from './dataTable';
import TenderDetailPage from './TendersDetails';
// Import TenderDetailPage if you have it
// import TenderDetailPage from './TenderDetailPage';

function App() {
  const [count, setCount] = useState(0); // This state might be a leftover from a template and can be removed if not used

  return (
    <BrowserRouter>
      <div>
        <h1>All Tenders Data</h1>
        <Routes>
          <Route path="/" element={<DataTable />} />
          {/* Define other routes as needed, for example, a route for tender details */}
          <Route path="/tender/:tenderId" element={<TenderDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
