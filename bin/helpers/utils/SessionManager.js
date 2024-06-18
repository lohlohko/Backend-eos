const { MongoClient } = require('mongodb')
const config = require('../../infra/configs/global_config');
const databaseUrl = (config.get('/mongoDbUrl'))

class SessionManager {
  constructor() {
    this.databaseUrl = databaseUrl;
    this.collectionName = 'sessions';
}
  async insertOrUpdateSession(sessionId, accessToken, refreshToken, expiryDate) {
    const client = new MongoClient(this.databaseUrl);

    try {
      await client.connect();

      const database = client.db();
      const collection = database.collection(this.collectionName);

      const existingSession = await collection.findOne({ sessionId });

      if (existingSession) {
        // Update existing session
        await collection.updateOne(
          { sessionId },
          { $set: { accessToken, refreshToken, expiryDate } }
        );
      } else {
        // Insert new session
        await collection.insertOne({
          sessionId,
          accessToken,
          refreshToken,
          expiryDate
        });
      }
    } finally {
      await client.close();
    }
  }

  async getSession(sessionId) {
    const client = new MongoClient(this.databaseUrl);

    try {
      await client.connect();

      const database = client.db();
      const collection = database.collection(this.collectionName);

      return await collection.findOne({ sessionId });
    } finally {
      await client.close();
    }
  }
}

module.exports = SessionManager;