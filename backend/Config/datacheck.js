const mongoose = require('mongoose');

async function checkIndexes() {


   const indexes = await mongoose.connection.collection('usermodels').indexes();
  console.log(indexes);

  await mongoose.disconnect();
}

checkIndexes();


