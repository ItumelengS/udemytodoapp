var admin = require("firebase-admin");

var serviceAccount = require("./secret.json");

export const verifyIdToken =  async (token) => { 
    if (!admin.apps.length){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
    }
    try {
        return await admin.auth().verifyIdToken(token);
    } catch (err) {
        throw err;
    }
}
