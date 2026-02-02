import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // optional but often helpful:
    // charset: "utf8mb4",
  },
  pool: { min: 0, max: 10 },
  migrations: { directory: "./migrations" },
  seeds: { directory: "./seeds" },
};

export default config;
