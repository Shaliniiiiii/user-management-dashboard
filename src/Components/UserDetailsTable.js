import React, { useState } from 'react';

const UserDetailsTable = ({ userDetails, onGenerateReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedUser, setHighlightedUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportContent, setReportContent] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const TIMEOUT_DURATION = 2000; // Set the timeout duration as a constant

  const filteredUserDetails = userDetails.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // If no username is entered, set userNotFound and emptySearch to true
      setUserNotFound(true);
      setEmptySearch(true);
      setHighlightedUser(null);
      // Set a timeout to hide the message after a specified duration
      setTimeout(() => {
        setUserNotFound(false);
        setEmptySearch(false);
      }, TIMEOUT_DURATION);
      return;
    }

    const user = userDetails.find((user) =>
      user.username.toLowerCase() === searchTerm.toLowerCase()
    );

    if (user) {
      setHighlightedUser(user.username);
      setUserNotFound(false);
      setEmptySearch(false);
    } else {
      // If the username is not found, set userNotFound to true
      setUserNotFound(true);
      setHighlightedUser(null);
      setEmptySearch(false);
      // Set a timeout to hide the message after a specified duration
      setTimeout(() => {
        setUserNotFound(false);
      }, TIMEOUT_DURATION);
    }
  };

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReportContent(null);
    setSelectedUserId(null);
  };

  const generateReport = () => {
    const user = userDetails[selectedUserId];

    if (user) {
      const report = `ID: ${selectedUserId}\nUsername: ${user.username}\nPhone number: ${user.phone}\nCreation Date: ${user.creation_date}`;
      setReportContent(report);
    }
  };

  return (
    <div className="user-details-table">
      <h2>User Details Table</h2>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter Username"
          className="search-input"
        />
        <button type="button" onClick={handleSearch} className="search-button">
          Search User
        </button>
      </div>

      
      {filteredUserDetails.length === 0 && userNotFound  && (
        <p className="not-found-message">No entries found.</p>
      )}

      {filteredUserDetails.length !== 0 && emptySearch && (
        <p className="not-found-message">Please enter a username.</p>
      )}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUserDetails.map((user, index) => (
            <tr
              key={index}
              className={`user-row ${highlightedUser === user.username ? 'highlightedRow' : ''}`}
            >
              <td>{index}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.creation_date}</td>
              <td>
                <button onClick={() => openModal(index)}>Generate Report</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Generate Report</h2>
            {reportContent ? (
              <div className="modal-content">
                <p className="report-text">{reportContent}</p>
                <div className="report-buttons">
                  <button onClick={closeModal}>Close</button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={generateReport}>Generate Report</button>
                <button onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsTable;
