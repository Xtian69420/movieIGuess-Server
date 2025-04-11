const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://chris123:123123ch@cluster0.tu4ahzz.mongodb.net/movieIguess?retryWrites=true&w=majority";

async function createAndInsertData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("movieIguess");

    const collection = db.collection("RoomData");

    const result = await collection.insertOne({
      roomId: 1,  
      type: 'movie', 
      videoId: 'https://example.com/video-link',
      finish: false,
      currentTime: 0,
      createdAt: new Date() 
    });

    console.log("🎉 Data inserted into RoomData collection", result.insertedId);

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await client.close();
  }
}

createAndInsertData();