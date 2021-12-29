type PostCardProps = {
    title: string;
    publishedAt: string;
    onClick: () => void
};

export const PostCard = ({ title, publishedAt, onClick }: PostCardProps) => {
    return (
            <div onClick={onClick}>
                <div>
                    <h2>
                        {title}
                    </h2>
                    <button>read</button>
                </div>
                <p>Published at {new Date(publishedAt).toLocaleDateString()}</p>
            </div>
    );
};
