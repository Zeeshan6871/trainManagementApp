const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

client.on("error", (err) => {
  console.error("Redis error:", err);
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cache = {
  get: async (key) => {
    try {
      const data = await getAsync(key);
      return JSON.parse(data);
    } catch (err) {
      console.error("Error getting cache:", err);
      return null;
    }
  },
  set: async (key, value, expirationInSeconds) => {
    try {
      await setAsync(key, JSON.stringify(value), "EX", expirationInSeconds);
    } catch (err) {
      console.error("Error setting cache:", err);
    }
  },
};

module.exports = cache;
