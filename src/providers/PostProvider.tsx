import { type ReactNode, useEffect, useState } from 'react';
import type { PostInfo } from '../types/post-dto.ts';
import { PostsContext } from '../context/PostsContext.tsx';
import { postService } from '../api/postService.ts';

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const data = await postService.getPosts();
      setPosts(data);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const addPost = (post: PostInfo) => setPosts((prev) => [post, ...prev]);

  const updatePost = (post: PostInfo) =>
    setPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));

  const removePost = (postId: number) =>
    setPosts((prev) => prev.filter((p) => p.id !== postId));

  return (
    <PostsContext.Provider
      value={{ posts, setPosts, addPost, updatePost, removePost, loadingPosts }}
    >
      {children}
    </PostsContext.Provider>
  );
};
