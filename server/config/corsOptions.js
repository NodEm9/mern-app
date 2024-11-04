import allowedOrigins from "./allowedOrigins.js";

const corsOptions = (origin, callback) => {
  /**
   * @description Check if the origin of the request is in the list of allowed origins
   * @param {string} origin - The origin of the request
   * @param {function} callback - The callback function
   */
  if (allowedOrigins.indexOf(origin) === -1) {
    callback(null, true);
  } else {
    const msg = "This site is not an allowed origin";
    callback(new Error(msg), false);
  } 
};

export default corsOptions;