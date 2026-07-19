import "dotenv/config";
import createApp from "./app";
import connectDB from "./config/db";
import logger from "./utils/logger";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  // 1. Connect to MongoDB first — don't accept HTTP traffic until DB is ready
  await connectDB();

  // 2. Create the Express app
  const app = createApp();

  // 3. Start listening
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
  });
};

// Graceful unhandled rejection handling
process.on("unhandledRejection", (reason: unknown) => {
  logger.error("Unhandled Promise Rejection:", reason);
  process.exit(1);
});

startServer();
