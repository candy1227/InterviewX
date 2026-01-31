import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
    throw new Error("Stream credentials are required");
}

let chatClient;
let streamClient;

try {
    chatClient = StreamChat.getInstance(apiKey, apiSecret); // will be used for chat features
    streamClient = new StreamClient(apiKey, apiSecret); // will be used for video calls
} catch (error) {
    console.error("Failed to initialize Stream clients:", error);
    throw error;
}

export { chatClient, streamClient };

export const upsetStreamUser = async (userData) => {
    try {
        if (!userData.id || !userData.name) {
            console.error("Missing required user data for Stream upsert", userData);
            return;
        }

        // 1. Sync with Chat SDK
        await chatClient.upsertUser(userData);

        // 2. Sync with Video SDK (StreamClient)
        // Video SDK uses upsertUsers with an object containing users array
        await streamClient.upsertUsers({
            users: {
                [userData.id]: userData
            }
        });

        console.log("Stream user upserted successfully to both SDKs:", userData.id);
    } catch (error) {
        console.error("Error upserting Stream user:", error.message);
        // Throw the error so the controller can catch it and return 500
        throw error;
    }
};

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    } catch (error) {
        console.error("Error deleting Stream user:", error);
    }
};

// todo: add another method to generateToken

