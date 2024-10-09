import { Client, Account, Databases, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)

const account = new Account(client);
export const databases = new Databases(client);

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Get the Authorization header

    if (!authHeader) {
      console.log("Authorization header missing");
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const userId = authHeader.split(" ")[1];

    if (!userId) {
      console.log("Session ID is missing");
      return res.status(401).json({ message: "Session ID missing" });
    }

    try {
      // const session = await account.getSession(sessionId);
      // console.log("Session valid:", session);

      const currentUser = await databases.listDocuments(
        "66fe7582002029276abb",
        "66fe758c003de9e63bfb",
        [Query.equal("accountId", userId)]
      );

      if (!currentUser) {
        return res.status(404).json({ message: "User is missing!" });
      }

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
      .json({ message: "Internal server error", error: error.message });
  }
};
