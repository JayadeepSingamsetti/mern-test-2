import express from 'express';
import mongoose from 'mongoose';
import Ticket from './models/Ticket.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Nodejs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Endpoints
app.post('/api/tickets', async (req, res) => {
  const { title, description } = req.body;
  const newTicket = new Ticket({ title, description, status: 'open', createdAt: new Date() });
  
  try {
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
});


app.get('/api/tickets', async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

app.get('/api/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).send('Ticket not found');
  res.json(ticket);
});

app.put('/api/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!ticket) return res.status(404).send('Ticket not found');
  res.json(ticket);
});

app.delete('/api/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findByIdAndDelete(req.params.id);
  if (!ticket) return res.status(404).send('Ticket not found');
  res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
