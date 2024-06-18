const session = require('express-session');
const config = require('../infra/configs/global_config');
const { db } = require('./store')

class FirestoreStore extends session.Store {
  constructor(options = {}) {
    super();
    this.collection = db.collection(options.collection || 'express');
  }
  async get(sid, callback) {
    try {
      const doc = await this.collection.doc(sid).get();
      if (!doc.exists) {
        return callback(null, null);
      }
      const session = JSON.parse(doc.data().data);
      callback(null, session);
    } catch (error) {
      callback(error);
    }
  }
  
  async set(sid, session, callback) {
    try {
      const sessionData = JSON.stringify(session);
      await this.collection.doc(sid).set({ data: sessionData });
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
  
  async destroy(sid, callback = () => {}) {
    try {
      await this.collection.doc(sid).delete();
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}

const sessionStore = new FirestoreStore({
  collection: 'express-sessions',
});


const sessionMiddleware = session({
  store: sessionStore,
  secret: config.get('/session/private_key_session'), 
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000, // cookie expire in 24 hours
    signed: false,
  } 
});

module.exports = sessionMiddleware;