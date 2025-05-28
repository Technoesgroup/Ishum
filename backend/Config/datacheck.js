const mongoose = require('mongoose');

async function checkIndexes() {
  await mongoose.connect('mongodb+srv://harshrajput30411:IshumDatabasebyHarsh@ishum.tlzws.mongodb.net/?retryWrites=true&w=majority&appName=Ishum'); // apna connection string daalo

   const indexes = await mongoose.connection.collection('usermodels').indexes();
  console.log(indexes);

  await mongoose.disconnect();
}

checkIndexes();


