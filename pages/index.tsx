import React, { useState } from "react"
import { sanityClient, urlFor } from "./api/sanity"
import { Post } from "../typings"
import { groq } from "next-sanity"
import type { NextPage } from "next"

type Props = {
    posts?: [Post]
}

const Home: NextPage<Props> = ({ posts }) => {
    const [projectPosts, setProjectPosts] = useState<Post[]>(posts)
    return (
        <div className="container flex flex-col">
            {projectPosts.map((post, i) => (
                <div
                    key={projectPosts[i].slug.current}
                    className="w-40 h-40 text-lg"
                >
                    {projectPosts[i].title}
                </div>
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

export default Home
