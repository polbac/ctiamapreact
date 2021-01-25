import express from 'express';
import wordpress from './wordpress';
import forms from './forms';

const api = express.Router();

api.use('/wordpress', wordpress);
api.use('/forms', forms);

// 404 handler for API, we don't want it to go to the app's 404 handler
api.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default api;
