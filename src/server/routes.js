const postPredictHandler = require('./handler');

// const generateMaxBytes = (megaBytesSize) => {
//   return megaBytesSize * 1024 * 1024;
// };

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data', 
        multipart: true, 
        maxBytes:1000000 
      },
    },
  },
];

module.exports = routes;