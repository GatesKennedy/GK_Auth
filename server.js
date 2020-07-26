//  Express
const express = require('express');
const cors = require('cors');
//  APIs
const user = require('./api_______/api/user');
// const test = require('./api_______/test');
//~~~~~~~~~~~~~~~~~~~~~~~
//  Init EXPRESS variable
const serv = express();
const PORT = process.env.PORT || 5000;
console.log('~~~~~ server.js ~~~~~');
serv.listen(PORT, () =>
  console.log(`(^=^)  GOOD: Server listening on port ${PORT}`)
);
//~~~~~~~~~~~~~~~~~~~~~~~
//  Init MIDDLEWARE

//  Express bodyParser
serv.use(express.json({ extended: false }));
serv.use(express.urlencoded({ extended: true }));
//  CORS
let whitelist = [
  process.env.CLIENT_ORIGIN_DEV,
  process.env.CLIENT_ORIGIN_STAGE,
  process.env.CLIENT_ORIGIN_GK,
  process.env.CLIENT_ORIGIN_CONOR,
];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
serv.options('/api/user', cors(corsOptions)); // include before other routes
serv.use(cors(corsOptions));

//~~~~~~~~~~~~~~~~~~~~~~~
//    API Routes
serv.use('/api/user', user);
// serv.use('/api/test', test);

// MIDDLEWARE   error handling
serv.use((err, req, res, next) => {
  res.json(err);
});

module.exports = serv;
