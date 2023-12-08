// corsMiddleware.js
const handlePreflight = (req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'authorization,content-type');
      res.status(204).end();
    } else {
      next();
    }
  };
  
  module.exports = handlePreflight;