import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import markdownToHtml from "../../libs/markdownToHtml";

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
    const content = await markdownToHtml(data.data.attributes.content)

    return {
        props: {
            post: {
               ...data.data,
                content
            }
        },
    };
};

const PostDetailView = ( {post} : any) => {
    const router = useRouter();

    if (!post) return <div>Loading...</div>
    return (
            <div>
                <button onClick={() => router.back()}>Back</button>
                <h2>{post.attributes.title}</h2>
                <p>{post.attributes.publishedAt}</p>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
    );
};

export default PostDetailView;