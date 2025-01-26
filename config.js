module.exports = {
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
    jwtExpiration: "7d", // Token expiration time
  };
  