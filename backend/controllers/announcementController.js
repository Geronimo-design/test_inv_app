/** @format */

const Announcement = require('../models/Announcement');

// Function for adding announcements
const addAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newAnnouncement = new Announcement({ title, content });
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function for retrieving announcements
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ date: -1 });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function for retrieving a single announcement
const getAnnouncement = async (req, res) => {
  res.json(res.announcement);
};

// Function for editing an announcement
const editAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const { title, content } = req.body;

    const editedAnnouncement = await Announcement.findByIdAndUpdate(id, {
      title: title,
      content: content,
    });

    await editedAnnouncement.save();

    res.json(editedAnnouncement);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Function for removing an announcement
const removeAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    await Announcement.findByIdAndDelete(id);

    res.json({ message: 'Deleted Announcement' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addAnnouncement,
  getAnnouncements,
  getAnnouncement,
  editAnnouncement,
  removeAnnouncement,
};
