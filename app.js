async function createAndInsertData() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      console.log("✅ Connected to MongoDB");
  
      const db = client.db("movieIguess");
      const collection = db.collection("RoomData");
  
      // Get the next roomId
      const counterCollection = db.collection("RoomCounters");
      const counter = await counterCollection.findOneAndUpdate(
        { _id: "roomId" }, 
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' }
      );
  
      const nextRoomId = counter.value.seq;
  
      // Insert data
      const result = await collection.insertOne({
        roomId: nextRoomId,
        type: 'movie',  // or 'tv'
        videoId: 'https://example.com/video-link',
        finish: false,
        currentTime: 0,
        createdAt: new Date()  // Current timestamp
      });
  
      console.log("🎉 Data inserted into RoomData collection", result.insertedId);
  
    } catch (err) {
      console.error("❌ Error:", err.message);
    } finally {
      await client.close();
    }
  }
  
  createAndInsertData();
  