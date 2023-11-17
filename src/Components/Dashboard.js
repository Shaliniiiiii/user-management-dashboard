import React, { useState } from 'react';
import AccountCreation from './AccountCreation';
import UserDetailsTable from './UserDetailsTable';

const Dashboard = () => {
  const [showAccountCreation, setShowAccountCreation] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [existingUsernames, setExistingUsernames] = useState([]);

  const handleToggleAccountCreation = () => {
    setShowAccountCreation(!showAccountCreation);
    setShowUserDetails(false);
  };

  const handleToggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
    setShowAccountCreation(false);
  };

  const handleAccountCreation = (newAccount) => {
    setUserDetails((prevUserDetails) => [...prevUserDetails, newAccount]);
    setExistingUsernames((prevUsernames) => [...prevUsernames, newAccount.username]);
  };

  const handleGoBack = () => {
    // Reset to the initial state
    setShowAccountCreation(false);
    setShowUserDetails(false);
  };

  return (
    <div>
      <div className="container">
        {(showAccountCreation || showUserDetails) ? null : (
          <div className="dashboard-description">
            <p>
              This dashboard provides functionality for managing user accounts and viewing user details.
              Users can create new accounts, and the dashboard keeps track of existing usernames.
              Additionally, users can view a table displaying details of created accounts.
            </p>
          </div>
        )}
        <div className="dashboard-buttons">
          {!showAccountCreation && !showUserDetails && (
            <div className="button-container">
              <button className="dashboard-button" onClick={handleToggleAccountCreation}>
                Account Creation
              </button>
              <p className="button-descriptions">
                Click this button to create a new user account.
              </p>
            </div>
          )}
          {!showAccountCreation && !showUserDetails && (
            <div className="button-container">
              <button className="dashboard-button" onClick={handleToggleUserDetails}>
                User Details
              </button>
              <p className="button-descriptions">
                Click this button to view details of existing user accounts.
              </p>
            </div>
          )}
          {(showAccountCreation || showUserDetails) ? (
            <button className="dashboard-goBack-button" onClick={handleGoBack}>
              Go Back
            </button>
          ) : null}
        </div>

        {showAccountCreation && (
          <AccountCreation onAccountCreation={handleAccountCreation} existingUsernames={existingUsernames} />
        )}
        {showUserDetails && <UserDetailsTable userDetails={userDetails} />}
      </div>
    </div>
  );
};

export default Dashboard;
