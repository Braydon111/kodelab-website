import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID ?? "",
  dataset: process.env.SANITY_DATASET ?? "",
});

export const urlForImage = (source: any) =>
  builder.image(source).auto("format").fit("max");
