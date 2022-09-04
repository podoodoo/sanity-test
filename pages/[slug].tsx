import { GetStaticProps } from "next"
import React from "react"
import Image from "next/image"
import { sanityClient, urlFor } from "./api/sanity"
import { Post } from "../typings"
import { PortableText } from "@portabletext/react"
import { ParsedUrlQuery } from "querystring"
import { groq } from "next-sanity"

interface Params extends ParsedUrlQuery {
    slug: string
}

type Props = {
    post?: Post
}

function Post({ post }: Props) {
    const {
        title = "title",
        mainImage = null,
        technology = "technology",
        body = []
    } = post! as Post
    return (
        <div className="w-full h-full flex flex-col md:flex-row md:space-x-20 space-y-10">
            <div className="md:w-2/3 space-y-5 -z-20">
                <h2 className="text-2xl">{title}</h2>
                <PortableText value={body} />
                <p>Technologies used: {technology}</p>
            </div>
            <div className="relative h-60 md:h-auto md:w-1/3 -z-20">
                <Image
                    src={urlFor(mainImage).url()}
                    layout="fill"
                    objectFit="contain"
                    alt="post img"
                />
            </div>
        </div>
    )
}

export default Post

export const getStaticPaths = async () => {
    const paths = await sanityClient.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
    context
) => {
    const { slug = "" } = context.params! as Params
    const query = groq`*[_type == 'post' && slug.current == $slug][0]`
    const post = await sanityClient.fetch(query, { slug })
    return {
        props: {
            post
        }
    }
}
