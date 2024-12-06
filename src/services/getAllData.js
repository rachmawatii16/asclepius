const { Firestore } = require('@google-cloud/firestore');

async function getAllData() {
    const db = new Firestore();
    const predictCollection = db.collection('predictions');
    
    const snapshot = await predictCollection.get();
    const allData = [];
    
    snapshot.forEach(doc => {
        allData.push(doc.data());
    });
    
    return allData;
}

module.exports = getAllData;
