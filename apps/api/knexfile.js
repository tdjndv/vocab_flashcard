import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const config = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  pool: { min: 0, max: 10 },
  migrations: { directory: "./migrations" },
  seeds: { directory: "./seeds" },
};

export default config;
