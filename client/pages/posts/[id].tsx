import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import {Post} from '../../models/Post'

type Props = {
    data: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axios.get("http://localhost:1337/api/posts");
    const posts = await response.data;

    const paths = posts.data.map((post) => {
        return {
            params: { id: String(post.id) },
        };
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { data } = await axios.get(`http://localhost:1337/api/posts/${params.id}`);

    return {
        props: {
            data,
        },
    };
};

const PostDetailView = ( {data} : any) => {
    const router = useRouter();

    if (!data) return <div>Loading...</div>
    return (
            <div>
                <button onClick={() => router.back()}>Back</button>
                <h2>{data.data.attributes.title}</h2>
                <p>{data.data.attributes.published_at}</p>
                <p>{data.data.attributes.content}</p>
            </div>
    );
};

export default PostDetailView;