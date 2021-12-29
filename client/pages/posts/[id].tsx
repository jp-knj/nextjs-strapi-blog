import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch("http://localhost:1337/api/posts");
    const data = await response.json()
    const posts = await data.data;

    const paths = posts.map(post => {
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
    const response = await fetch(`http://localhost:1337/api/posts/${params.id}`);
    const data = await response.json()
    return {
        props: {
            data,
        },
    };
};

const PostDetailView = ({ data }: any) => {
    const router = useRouter();
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