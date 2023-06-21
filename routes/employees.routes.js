const express = require('express');
const router = express.Router();
//const ObjectId = require('mongodb').ObjectId;
const employee = require('../models/employee.model');

router.get('/employees', async (req, res) => {
  try {
    res.json(await employee.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/random', async (req, res) => {

  try {
    const count = await employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await employee.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.get('/employees/:id', async (req, res) => {

  try {
    const dep = await employee.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});
router.post('/employees', async (req, res) => {

  try {

    const { name } = req.body;
    const newemployee = new employee({ name: name });
    await newemployee.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }

});

router.put('/employees/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await employee.findById(req.params.id);
    if (dep) {
      await employee.updateOne({ _id: req.params.id }, { $set: { name: name } });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/employees/:id', async (req, res) => {

  try {
    const dep = await employee.findById(req.params.id);
    if (dep) {
      await employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;