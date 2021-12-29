import { GetServerSideProps, GetStaticProps } from "next";
import axios from "axios";

import { Post, PostJsonResponse } from "../models/Post";

const Home = ({ data }: PostJsonResponse) => {
    return (
            <div>
                <h1>My Blog</h1>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
    );
};

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const response = await axios.get("http://localhost:1337/api/posts/1", {
        headers: {
            Accept: "application/json",
        },
    });
    const data: Post[] = response.data;

    return {
        props: {
            data,
        },
    };
};
