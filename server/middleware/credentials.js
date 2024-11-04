import allowedOrigins from "../config/allowedOrigins.js";

const credentials = (req, res, next) => {
  /**
   * @description Set the Access-Control-Allow-Credentials header to true.
   * define the allowed origins and set the Access-Control-Allow-Origin header to the origin of the request
   */
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
    /**
     * Uncomment line below and update to match the domain you will make the request from,
     */
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
};

export default credentials;