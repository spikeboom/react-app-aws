import React, { useEffect, useState, useContext } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

const Users = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (auth.token) {
          const responseData = await sendRequest(
            'https://f6swfi14e8.execute-api.us-east-1.amazonaws.com/dev/users',
            'GET',
            null,
            {
              'Content-Type': 'application/json',
              Authorization: auth.token
            }
          );
          setLoadedUsers(responseData.users);
        }      
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, auth]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
