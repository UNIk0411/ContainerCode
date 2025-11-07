const express = require('express');
const router = express.Router();
const { executeCode } = require('../services/executionService');
const { v4: uuidv4 } = require('uuid');

router.post('/execute', async (req, res) => {
  const { code, language, timeout = 5, memory = 128 } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' });
  }

  const executionId = uuidv4();
  const io = req.app.get('io');

  // Start code execution
  executeCode({ executionId, code, language, timeout, memory, io });

  res.json({ executionId });
});

module.exports = router;
