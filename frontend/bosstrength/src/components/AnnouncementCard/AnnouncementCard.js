/** @format */

// A component that displays the contents of each announcement card
import React, { useState } from 'react';
import './AnnouncementCard.css';

function AnnouncementCard({ announcement, onDelete, onEdit }) {
  const isAdmin = localStorage.getItem('isAdmin');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(announcement.title);
  const [editContent, setEditContent] = useState(announcement.content);

  // A function to handle the saving of an announcement card after an admin adds or updates it
  const handleSave = () => {
    if (editTitle.trim() === '' || editContent.trim() === '') {
      alert('Title and content cannot be empty.');
      return;
    }
    onEdit(announcement._id, editTitle.trim(), editContent.trim());
    setIsEditing(false);
  };

  // Returns an announcement card's text only for normal users, and text with buttons to edit and delete for admins
  return (
    <div className='announcement-card'>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}></textarea>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{announcement.title}</h3>
          <p className='announcement-date'>
            {new Date(announcement.date).toLocaleString()}
          </p>
          <p>{announcement.content}</p>
          {isAdmin === 'true' ? (
            <div className='admin-actions'>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => onDelete(announcement._id)}>Delete</button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default AnnouncementCard;
