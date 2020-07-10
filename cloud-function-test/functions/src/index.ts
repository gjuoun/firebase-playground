import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
// functions.logger.info("Hello logs!", { structuredData: true });
// response.send("Hello from Firebase!");
// });
import admin from 'firebase-admin'
import express from 'express'
import { ApolloServer, gql } from "apollo-server-express";

admin.initializeApp();

export interface Hotdog {
  isKosher: boolean
  location: string
  name: string
  style: string
  website: string
}



const typeDefs = gql`
  type Hotdog {
    isKosher: Boolean
    location: String
    name: String
    style: String
    website: String
  }
  type Query {
    hotdogs: [Hotdog]
  }
`;

import { data } from './data'
const resolvers = {
  Query: {
    hotdogs: () => {
      return data.hotdogs
    }
  }
};


const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/", cors: true });
const graphql = functions.https.onRequest(app);

export { graphql }

