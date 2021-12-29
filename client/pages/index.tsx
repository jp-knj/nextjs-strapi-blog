import {GetStaticProps} from "next";
import { useRouter } from "next/router";

import { PostCard } from "../components/PostCard";

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch("http://localhost:1337/api/posts", {
        headers: {
            Accept: "application/json",
        },
    });
    const dataJson = await response.json()
    const data = await dataJson.data;
    return {
        props: {
            data,
        },
    };
};

const Home = ({data}) => {
    const router = useRouter();
    const makeUrl = (id: number) => router.push(`/posts/${id}`);

    const posts = data.map((post) => (
        <PostCard
            key={post.id}
            title={post.attributes.title}
            publishedAt={post.attributes.published_at}
            onClick={() => makeUrl(post.id)}
        />
    ));

    if (!data) return <div>loading...</div>
    return (
            <div>
                <h1>My Blog</h1>
                <div>{posts}</div>
            </div>
    );
};

export default Home


