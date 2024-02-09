// You can also use CommonJS `require('@sentry/node')` instead of `import`
import * as Sentry from "@sentry/node";
// import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import 'dotenv/config';
import errorHandler from "./middleware/errorHandler.js";
import loginRouter from './routes/login.js'

import usersRouter from './routes/users.js'
import reviesRouter from './routes/reviews.js'
import propertiesRouter from './routes/properties.js'
import hostsRouter from './routes/hosts.js'
import bookingsRouter from './routes/bookings.js'
import amenitiesRouter from './routes/amenities.js'


const app = express();

Sentry.init({
  dsn: "https://4916c6fbca9c18c66372d01181189696@o4506082807906304.ingest.sentry.io/4506575677620224",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());


app.use("/users", usersRouter);
app.use("/reviews", reviesRouter);
app.use("/properties", propertiesRouter);
app.use("/hosts", hostsRouter);
app.use("/bookings", bookingsRouter);
app.use("/amenities", amenitiesRouter)

app.use("/login", loginRouter); 

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });



app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});



// // All your controllers should live here
// app.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);
// // Optional fallthrough error handler
// app.use(function onError(err, req, res, next) {
//   // The error id is attached to `res.sentry` to be returned
//   // and optionally displayed to the user for support.
//   res.statusCode = 500;
//   res.end(res.sentry + "\n");
// });

// app.listen(3000);