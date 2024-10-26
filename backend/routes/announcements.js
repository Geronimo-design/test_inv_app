/** @format */

const express = require('express');
const router = express.Router();

const {
  addAnnouncement,
  getAnnouncements,
  getAnnouncement,
  editAnnouncement,
  removeAnnouncement,
} = require('../controllers/announcementController');

// Adds a new announcement when an API call comes from the frontend
router.post('/', async (req, res) => {
  await addAnnouncement(req, res);
});

// Retrieves and shows all announcements on the frontend when an API call comes from the frontend
router.get('/', async (req, res) => {
  await getAnnouncements(req, res);
});

// Retrieves and shows a single announcement
router.get('/:id', getAnnouncement, async (req, res) => {
  await getAnnouncement(req, res);
});

// Updates an announcement based on its ID whn an API call comes from the frontend
router.put('/:id', async (req, res) => {
  await editAnnouncement(req, res);
});

// Deletes an announcement based on its ID whn an API call comes from the frontend
router.delete('/:id', async (req, res) => {
  await removeAnnouncement(req, res);
});

// Middleware to get an announcement by ID
// async function getAnnouncement(req, res, next) {
//   let announcement;
//   try {
//     announcement = await Announcement.findById(req.params.id);
//     if (announcement == null) {
//       return res.status(404).json({ message: 'Cannot find announcement' });
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }

//   res.announcement = announcement;
//   next();
// }

module.exports = router;
