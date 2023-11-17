import React, { useState } from 'react';

const AccountCreation = ({ onAccountCreation, existingUsernames }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [missingField, setMissingField] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const generateRandomPhoneNumber = () => {
    const digits = Math.random().toString().slice(2, 11);
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();

    // Check if username is entered
    if (!username) {
      setMissingField('Please enter a username.');
      return;
    }

    // Check if password is entered when username is present
    if (!password && username) {
      setMissingField('Please enter a password.');
      return;
    }

    // Check if the username is already taken
    if (existingUsernames.includes(username)) {
      setUsernameTaken(true);
      return;
    }

    // Create a new account object with a random phone number
    const newAccount = {
      username: username,
      password: password,
      email: `${username}@gmail.com`,
      phone: generateRandomPhoneNumber(),
      creation_date: new Date().toISOString().split('T')[0],
    };

    // Call the callback to update user details
    onAccountCreation(newAccount);

    // Set accountCreated to true
    setAccountCreated(true);

    // Show the modal
    setShowModal(true);

    // Reset form fields
    setUsername('');
    setPassword('');
    setMissingField('');
    setUsernameTaken(false);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setAccountCreated(false);
  };

  return (
    <div className="account-creation-container">
      <form onSubmit={handleCreateAccount} className="account-creation-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {missingField && <p>{missingField}</p>}
        {usernameTaken && <p>Username is already taken. Please choose another one.</p>}
        <button type="submit">Create Account</button>
      </form>

      {/* Modal content */}
      {accountCreated && (
        <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>Account created successfully!</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountCreation;
