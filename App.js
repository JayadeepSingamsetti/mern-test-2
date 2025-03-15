import React, { useEffect, useState } from 'react';
import './App.css';
import TicketForm from './components/TicketForm.js';
import TicketList from './components/TicketList.js';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await fetch('/api/tickets');
    const data = await response.json();
    setTickets(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ticket Raising Platform</h1>
        <TicketForm fetchTickets={fetchTickets} />
        <TicketList tickets={tickets} />
      </header>
    </div>
  );
}

export default App;
