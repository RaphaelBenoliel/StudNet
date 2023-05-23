/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { createUser, getUsers } from '../TableActions/UserActions.js';

export const requestSuccess = (data) => ({ success: true, data });

export const requestFailure = (data) => ({ success: false, data });

export const createAuth = async (requestObject) => {
  console.log(`-> GOT CREATE AUTH REQUEST\n\t${requestObject.email}`);
  try {
    const user = await getUsers({ email: requestObject.email, userName: requestObject.userName });
    if (user.success) return requestFailure({ message: 'The email or username alredy registered.' });
    const newUser = await createUser(requestObject);
    if (!newUser) return requestFailure({ message: 'Error creating user' });
    console.log(`\t${newUser.email} is now registered!`);
    return requestSuccess({ newUser });
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const checkAuth = async (requestObject) => {
  console.log(`[GOT AUTH REQUEST]\n\t${requestObject.email}`);
  try {
    const userResponse = await getUsers({ email: requestObject.email, password: requestObject.password });
    if (!userResponse.success && userResponse.message === 'user not found') return requestFailure({ message: 'You must register before log in.' });
    if (!userResponse.success) return requestFailure({ message: 'The password does not match.' });
    const user = userResponse.data[0];
    console.log(`\t${user.email} is now logged in!`);
    return requestSuccess({ user });
  } catch (error) {
    console.error('Error finding user:', error);
    return { status: 500, json: { message: 'Internal server error' } };
  }
};

export const allUsers = async () => {
  try {
    const users = await getUsers();
    if (!users) return requestFailure({ message: 'Error getting users' });
    return requestSuccess({ users });
  } catch (error) {
    console.error('Error finding user:', error);
    return { status: 500, json: { message: 'Internal server error' } };
  }
};
