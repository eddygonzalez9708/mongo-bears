const router = require('express').Router();

const Bear = require('./bearModel');

router
  .route('/')
  .get((req, res) => {
    Bear.find()
      .then(bears => {
        res.status(200).json(bears);
      })
      .catch(err => res.status(500).json({ error: 'Error fetching bears.' }))
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear.save()
      .then(savedBear => {
        console.log(savedBear);
        res.status(201).json(savedBear);
      })
      .catch(err => {
        res.status(422).json({ error: err });
      })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Bear.findById(id) // find a specific resource in a collection by ID
      .then(foundBear => {
        res.status(200).json(foundBear);
      })
      .catch(err => {
        res.status(404).json({ error: 'No bear by that id in DB.' })
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    Bear.findByIdAndRemove(id)
      .then(removeBear => {
        if (removeBear === null) {
          res.status(404).json({ error: 'No Bear by that Id found in DB.' });
          return;
        }
        res.json({ success: 'Bear removed successfully.', resource: removeBear });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      })
  })

  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
    const { id } = req.params;
    const updates = ({ species, latinName } = req.body);
    console.log('Updates', updates);
    Bear.findByIdAndUpdate(id, updates, { new: true })
      .then(updatedBear => {
        if (updatedBear === null) {
          res.status(404).json({ error: 'No Bear by that ID found in DB.' });
        }
        res.json({ success: 'Bear updated.', resource: updatedBear })
      })
      .catch(err => res.status(500).json({ error: err }))
  });

module.exports = router;
