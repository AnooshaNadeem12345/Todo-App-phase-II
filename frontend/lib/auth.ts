import { auth } from 'better-auth/react';

/**
 * Better Auth client-side helpers
 */

// Initialize the Better Auth client
const betterAuthClient = auth({
  baseURL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  fetchOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

/**
 * Get the current user session
 */
export const getSession = async () => {
  try {
    const session = await betterAuthClient.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
};

/**
 * Sign in a user
 */
export const signIn = async (email: string, password: string) => {
  try {
    const response = await betterAuthClient.signIn.email({
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign up a new user
 */
export const signUp = async (email: string, name: string, password: string) => {
  try {
    const response = await betterAuthClient.signUp.email({
      email,
      name,
      password,
    });
    return response;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    await betterAuthClient.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};