import { Client, Account } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66fe733e000e7494a932");
  
const account = new Account(client);

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const sessionId = authHeader ? authHeader.replace('Bearer ', '') : null;
  const userId = req.headers['x-user-id'];
  
  if (!sessionId || !userId) {
    return res.status(401).json({ message: 'Unauthorized, sessionId or userId missing' });
  }

  try {
    const session = await account.getSession(userId, sessionId);

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