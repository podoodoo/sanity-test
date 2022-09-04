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
    return <div className="container">{post.title}</div>
}

export default Post

export const getStaticPaths = async () => {
    const paths = await sanityClient.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({
            params: { slug }
        })),
        fallback: false
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
