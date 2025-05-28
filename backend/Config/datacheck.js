const mongoose = require('mongoose');

async function updateIndex() {
  await mongoose.connect('mongodb+srv://harshrajput30411:IshumDatabasebyHarsh@ishum.tlzws.mongodb.net/?retryWrites=true&w=majority&appName=Ishum'); // apna connection string yahan

  const collection = mongoose.connection.collection('usermodels');

  // Drop index
  await collection.dropIndex('email_1');
  console.log('Dropped email_1 index');

  // Create sparse unique index
  await collection.createIndex({ email: 1 }, { unique: true, sparse: true });
  console.log('Created sparse unique index on email');

  await mongoose.disconnect();
}

updateIndex();

