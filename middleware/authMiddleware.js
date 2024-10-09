import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);

const account = new Account(client);

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Get the Authorization header

    if (!authHeader) {
      console.log("Authorization header missing");
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const sessionId = authHeader.split(" ")[1];

    if (!sessionId) {
      console.log("Session ID is missing");
      return res.status(401).json({ message: "Session ID missing" });
    }

    try {
      const session = await account.getSession(sessionId); // Validate the session
      console.log("Session valid:", session);

      next();
    } catch (error) {
      console.error("Invalid session ID", error.message);
      return res
        .status(403)
        .json({ message: "Invalid session ID", error: error.message });
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message, sessionId });
  }
};
