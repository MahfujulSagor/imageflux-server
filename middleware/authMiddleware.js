import { Client } from 'appwrite';
import { Account } from 'appwrite';

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66fe733e000e7494a932");

export const authenticate = async (req, res, next) => {
  const sessionId = req.headers['Authorization']; // Extract token from the header

  if (!sessionId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const account = new Account(client);
    const session = await account.getSession(sessionId);

    if (!session) {
      return res.status(401).json({ message: 'Invalid session' });
    }

    req.user = session;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};