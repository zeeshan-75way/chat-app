// import express, { type Express, type Request, type Response } from "express";
// import bodyParser from "body-parser";
// import morgan from "morgan";
// import http from "http";
// import { initDB } from "./src/common/services/database.service";
// import errorHandler from "./src/common/middleware/error-handler.middleware";
// import routes from "./src/routes";
// import { config } from "dotenv";
// import cookieParser = require("cookie-parser");
// import { IUser } from "./src/users/user.dto";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./src/swagger/swagger";
// import cors from "cors";
// import { limiter } from "./src/common/helper/rate-limiter";
// import { ApolloServer } from "apollo-server-express";
// import typeDefs from "./src/graphql/schema";
// import { resolvers } from "./src/graphql/resolvers";
// config();
// const port = Number(process.env.PORT) ?? 5000;

// const app: Express = express();

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// declare global {
//   namespace Express {
//     interface User extends Omit<IUser, "password"> {}
//     interface Request {
//       user?: User;
//     }
//   }
// }
// declare global {
//   namespace Express {
//     interface Request {
//       file?: Multer.File;
//     }
//   }
// }

// const initApp = async (): Promise<void> => {
//   // init mongodb
//   await initDB();
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   server.applyMiddleware({ app});

//   // error handler
//   app.use(errorHandler);
//   app.listen(port, () => {
//     console.log("Server is running on port", port);
//   });
//   await server.start();
// };

// void initApp();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/graphql/schema";
import { resolvers } from "./src/graphql/resolvers";
import { initDB } from "./src/common/services/database.service";
import { config } from "dotenv";
import { makeExecutableSchema } from "@graphql-tools/schema";

config();

const startServer = async () => {
  await initDB();
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const app: Application = express();


  const server = new ApolloServer({ schema });

  await server.start();
  server.applyMiddleware({ app });
  // const server = new ApolloServer({
  //   typeDefs,
  //   resolvers,
  // });
  // Apply the GraphQL server middleware to the Express app
  // await server.start();
  // server.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
};
startServer();
