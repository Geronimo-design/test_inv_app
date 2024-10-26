/** @format */

// This function allows normal users to read announcements, and admins to post announcements
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import ErrorPage from '../ErrorPage/ErrorPage';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';
import './Interact.css';

function Interact() {
  // Retrieves the token and user admin status from localStorage for authentication purposes
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  // State variables used to keep track of announcements and their content
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // The root URL that API calls will be made to
  const API_URL = 'http://localhost:8000/announcements';

  // Ensuring that the announcements are fetched only once when the component mounts
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Fetching all announcements from the backend.
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      alert('Failed to load announcements. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sends a POST request to the database to submit a new announcement
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both a title and content for your announcement.');
      return;
    }

    const newAnnouncement = {
      title: title.trim(),
      content: content.trim(),
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAnnouncement),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const createdAnnouncement = await response.json();
      setAnnouncements([createdAnnouncement, ...announcements]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Failed to create announcement. Please try again.');
    }
  };

  // Function for deleting an announcement. Sends an API call to the database to do this
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?'))
      return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },
      });

      // Throws an error if it went wrong
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Assuming the backend returns a message upon successful deletion
      const result = await response.json();
      console.log(result.message);

      setAnnouncements(
        announcements.filter((announcement) => announcement._id !== id)
      );
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Failed to delete announcement. Please try again.');
    }
  };

  // Handles the editing of an announcement via an API call
  const handleEdit = async (id, updatedTitle, updatedContent) => {
    const updatedAnnouncement = {
      title: updatedTitle,
      content: updatedContent,
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAnnouncement),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const updatedData = await response.json();

      // Re-renders the list of announcements
      setAnnouncements(
        announcements.map((announcement) =>
          announcement._id === id ? updatedData : announcement
        )
      );
    } catch (error) {
      console.error('Error updating announcement:', error);
      alert('Failed to update announcement. Please try again.');
    }
    window.location.reload();
  };

  return (
    <div data-testid='interact-component' className='interact-container'>
      {token ? (
        <div>
          <Header />
          <div>
            {isAdmin === 'true' ? (
              <div className='pane-container'>
                <div className='posting-pane'>
                  <h2>Make An Announcement</h2>
                  <form onSubmit={handleSubmit} className='announcement-form'>
                    <div className='form-group'>
                      <label htmlFor='title'>Title:</label>
                      <input
                        type='text'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Enter announcement title'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='content'>Content:</label>
                      <textarea
                        id='content'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='Enter announcement content'
                        required></textarea>
                    </div>
                    <button type='submit'>Post Announcement</button>
                  </form>
                </div>
                <div className='reading-pane'>
                  <h2>Announcements</h2>
                  {isLoading ? (
                    <p>Loading announcements...</p>
                  ) : announcements.length === 0 ? (
                    <p>No announcements available.</p>
                  ) : (
                    <div className='announcements-list'>
                      {announcements.map((announcement) => (
                        <AnnouncementCard
                          key={announcement._id}
                          announcement={announcement}
                          isAdmin={isAdmin}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='reading-pane'>
                <h2>Announcements</h2>
                {isLoading ? (
                  <p>Loading announcements...</p>
                ) : announcements.length === 0 ? (
                  <p>No announcements available.</p>
                ) : (
                  <div className='announcements-list'>
                    {announcements.map((announcement) => (
                      <AnnouncementCard
                        key={announcement._id}
                        announcement={announcement}
                        isAdmin={isAdmin}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <ErrorPage message='You must be signed in to view this page.' />
        </div>
      )}
    </div>
  );
}

export default Interact;
