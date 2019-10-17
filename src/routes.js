const express = require('express');
const cuid    = require('cuid');

const router = express.Router();

router.get('/appointments', (req, res, next) => {

  const appointments = req.app.get('appointments');

  res.status(200).json(appointments);
});

router.post('/appointments', express.json(), (req, res, next) => {

  // TODO if invalid input, 400

  const appointments = req.app.get('appointments');

  const newAppointment = {
    id          : cuid(),
    hour        : req.body.hour,
    name        : req.body.name,
    phoneNumber : req.body.phoneNumber
  };

  appointments.push(newAppointment);

  res.status(201).json(newAppointment);
});

router.put('/appointments/:id', express.json(), (req, res, next) => {

  // TODO if invalid input, 400

  const appointments = req.app.get('appointments');

  const target = appointments.find(a => { return a.id === req.params.id });

  if (target === undefined) {
    return res.status(404).json({ error: `Appointment ${req.params.id} not found` });
  }

  target.name        = req.body.name;
  target.phoneNumber = req.body.phoneNumber;

  res.status(200).json(target);
});

router.delete('/appointments/:id', (req, res, next) => {

  const appointments = req.app.get('appointments');

  const target = appointments.find(a => { return a.id === req.params.id });

  if (target === undefined) {
    return res.status(404).json({ error: `Appointment ${req.params.id} not found` });
  }

  req.app.set('appointments', appointments.filter(a => a.id !== req.params.id));

  res.status(204).end();
});

module.exports = router;
