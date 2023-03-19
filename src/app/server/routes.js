const express = require('express')
const router = express.Router();

// Define your API endpoints here
router.get('/api/materials', (req, res) => {
  // Return some data as a JSON response
  res.json({ message: 'Here are some materials' });
});

module.exports = router;