import { Client, Databases, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)

export const databases = new Databases(client);

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("Authorization header missing");
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const userId = authHeader.split(" ")[1];

    if (!userId) {
      console.log("Session ID is missing");
      return res.status(401).json({ message: "User ID missing" });
    }

    try {
      const currentUser = await databases.listDocuments(
        process.env.APPWRITE_DATABASE_ID,
        process.env.APPWRITE_USER_COLLECTION_ID,
        [Query.equal("accountId", userId)]
      );

      if (!currentUser) {
        return res.status(404).json({ message: "User is missing!" });
      }

      next();
    } catch (error) {
      console.error("Invalid user ID", error.message);
      return res
        .status(403)
        .json({ message: "Invalid user ID", error: error.message });
    }
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
