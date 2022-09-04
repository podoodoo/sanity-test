import { createClient } from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"

export const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "oq0fvbyf",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "v2022-08-31",
    useCdn: true
})

export const urlFor = (source) =>
    createImageUrlBuilder(sanityClient).image(source)
