import { Client, Account } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);
  
const account = new Account(client);

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const sessionId = authHeader ? authHeader.replace('Bearer ', '') : null;
  
  if (!sessionId) {
    return res.status(401).json({ message: 'Unauthorized, sessionId missing' });
  }

  try {
    const session = await account.getSession(sessionId);

    if (!session) {
      return res.status(401).json({ message: 'Invalid or expired session' });
    }

    req.user = session;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};