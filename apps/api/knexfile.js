import "./src/env.js"

const config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 10 },
  migrations: { directory: "./migrations" },
  seeds: { directory: "./seeds" },
};

export default config;
