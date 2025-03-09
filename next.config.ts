import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.OPENAI_API_KEY);

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
