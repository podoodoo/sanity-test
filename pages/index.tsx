import React from "react"
import { sanityClient, urlFor } from "./api/sanity"
import { Post } from "../typings"
import Image from "next/future/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { groq } from "next-sanity"

type Props = {
    posts: [Post]
}

export default function Projects({ posts }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 object-cover">
            {posts.map((post, i) => (
                <Link key={post._id} href={`/projects/${post.slug.current}`}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="border space-y-5 cursor-pointer h-full w-full hover:scale-105 ease-in-out transition-transform duration-200 p-5"
                    >
                        <Image
                            src={urlFor(post.mainImage).url()}
                            height="400"
                            width="640"
                            className="w-full h-2/3 object-scale-down"
                            sizes="(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw"
                            alt="post img"
                        />
                        <div className="p-5">
                            <h3 className="text-lg">{post.title}</h3>
                            <span
                                className="text-xs"
                                suppressHydrationWarning={true}
                            >
                                {new Date(post._createdAt).toDateString()}
                            </span>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    )
}

export const getServerSideProps = async () => {
    const query = groq`*[_type == 'post' && category[0]._ref in *[_type == 'category' && title == "Project"]._id]`
    const posts = await sanityClient.fetch(query)
    return {
        props: {
            posts
        }
    }
}
