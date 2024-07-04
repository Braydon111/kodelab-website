import { createClient } from "next-sanity";

export const client = createClient({
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  apiVersion: "2022-03-07",
});
