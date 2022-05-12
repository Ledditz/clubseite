import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>
        Test 123
      </h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/home">Invoices</Link>
        <Link to="/friends">Expenses</Link>
      </nav>
    </div>
  );
}

export default App;
