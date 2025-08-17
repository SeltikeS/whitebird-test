import React from 'react';
import { usePosts } from '../providers/usePosts.tsx';
import { useParams } from 'react-router-dom';

const Post: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { posts } = usePosts();

  const post = posts.find((p) => p.id === Number(postId));
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
