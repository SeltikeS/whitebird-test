import { type ReactNode, useCallback, useEffect, useState } from 'react';
import type { PostInfo } from '../types/post-dto.ts';
import { PostsContext } from '../context/PostsContext.tsx';
import { postService } from '../api/postService.ts';
import type { CommentInfo } from '../types/comment-dto.ts';

export const PostDirection = {
  Up: 'Up',
  Down: 'Down',
} as const;
export type PostDirection = (typeof PostDirection)[keyof typeof PostDirection];

export const PostsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<PostInfo[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const loadPosts = async () => {
    setLoadingPosts(true);
    try {
      const data = await postService.getPosts();
      setPosts(
        (data ?? []).map((p, index) => ({
          ...p,
          likedByUserIds: [],
          dislikedByUserIds: [],
          comments: [],
          isFavourite: false,
          priority: data.length - index,
        }))
      );
    } catch (err) {
      console.error('Failed to load posts', err);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const addPost = useCallback(
    (post: PostInfo) => {
      const maxPriority = posts.reduce(
        (max, p) => Math.max(max, p.priority),
        0
      );
      const newPost = { ...post, priority: maxPriority + 1 };
      setPosts((prev) => [newPost, ...prev]);
    },
    [posts]
  );

  const updatePost = useCallback((post: PostInfo) => {
    setPosts((prev) => prev.map((p) => (p.id === post.id ? post : p)));
  }, []);

  const removePost = useCallback((postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  const movePost = useCallback((postId: number, direction: PostDirection) => {
    setPosts((prev) => {
      // создаём копию массива
      const postsCopy = [...prev];

      // находим индекс текущего поста
      const idx = postsCopy.findIndex((p) => p.id === postId);
      if (idx === -1) return prev;

      let swapIdx: number | undefined;

      if (direction === PostDirection.Up && idx > 0) swapIdx = idx - 1;
      if (direction === PostDirection.Down && idx < postsCopy.length - 1)
        swapIdx = idx + 1;

      if (swapIdx === undefined) return prev;

      // свапаем priority
      const temp = postsCopy[idx].priority;
      postsCopy[idx] = {
        ...postsCopy[idx],
        priority: postsCopy[swapIdx].priority,
      };
      postsCopy[swapIdx] = { ...postsCopy[swapIdx], priority: temp };

      // сортируем по priority, чтобы UI отражал порядок
      return postsCopy.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    });
  }, []);

  const movePostToTop = useCallback((postId: number) => {
    setPosts((prev) => {
      const postsCopy = [...prev];
      const idx = postsCopy.findIndex((p) => p.id === postId);
      if (idx === -1) return prev;

      // Находим максимальный priority среди всех постов
      const maxPriority = Math.max(...postsCopy.map((p) => p.priority ?? 0));

      // Обновляем priority текущего поста, чтобы он был выше всех
      postsCopy[idx] = { ...postsCopy[idx], priority: maxPriority + 1 };

      // Сортируем массив по приоритету
      return postsCopy.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    });
  }, []);

  const likePost = useCallback((postId: number, userId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const isLiked = post.likedByUserIds.includes(userId);
        const isDisliked = post.dislikedByUserIds.includes(userId);

        return {
          ...post,
          likedByUserIds: isLiked
            ? post.likedByUserIds.filter((id) => id !== userId)
            : [...post.likedByUserIds, userId],
          dislikedByUserIds: isDisliked
            ? post.dislikedByUserIds.filter((id) => id !== userId)
            : post.dislikedByUserIds,
        };
      })
    );
  }, []);

  const dislikePost = useCallback((postId: number, userId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const isDisliked = post.dislikedByUserIds.includes(userId);
        const isLiked = post.likedByUserIds.includes(userId);

        return {
          ...post,
          dislikedByUserIds: isDisliked
            ? post.dislikedByUserIds.filter((id) => id !== userId)
            : [...post.dislikedByUserIds, userId],
          likedByUserIds: isLiked
            ? post.likedByUserIds.filter((id) => id !== userId)
            : post.likedByUserIds,
        };
      })
    );
  }, []);

  const toggleFavourite = useCallback((postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id !== postId ? post : { ...post, isFavourite: !post.isFavourite }
      )
    );
  }, []);

  const updatePostComments = useCallback(
    (postId: number, updater: (comments: CommentInfo[]) => CommentInfo[]) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: updater(post.comments) }
            : post
        )
      );
    },
    []
  );

  const setPostComments = useCallback(
    (postId: number, comments: CommentInfo[]) => {
      updatePostComments(postId, () => comments);
    },
    [updatePostComments]
  );

  const addComment = useCallback(
    (postId: number, comment: CommentInfo) => {
      updatePostComments(postId, (comments) => [comment, ...comments]);
    },
    [updatePostComments]
  );

  const updateComment = useCallback(
    (
      postId: number,
      commentId: number,
      updater: (comment: CommentInfo) => CommentInfo
    ) => {
      updatePostComments(postId, (comments) =>
        comments.map((c) => (c.id === commentId ? updater(c) : c))
      );
    },
    [updatePostComments]
  );

  const editComment = useCallback(
    (postId: number, commentId: number, newComment: Partial<CommentInfo>) => {
      updateComment(postId, commentId, (c) => ({ ...c, ...newComment }));
    },
    [updateComment]
  );

  const deleteComment = useCallback(
    (postId: number, commentId: number) => {
      updatePostComments(postId, (comments: CommentInfo[]) =>
        comments.filter((c) => c.id !== commentId)
      );
    },
    [updatePostComments]
  );

  const likeComment = useCallback(
    (postId: number, commentId: number, userId: number) => {
      updateComment(postId, commentId, (c) => {
        const isLiked = c.likedByUserIds.includes(userId);
        const isDisliked = c.dislikedByUserIds.includes(userId);
        return {
          ...c,
          likedByUserIds: isLiked
            ? c.likedByUserIds.filter((id) => id !== userId)
            : [...c.likedByUserIds, userId],
          dislikedByUserIds: isDisliked
            ? c.dislikedByUserIds.filter((id) => id !== userId)
            : c.dislikedByUserIds,
        };
      });
    },
    [updateComment]
  );

  const dislikeComment = useCallback(
    (postId: number, commentId: number, userId: number) => {
      updateComment(postId, commentId, (c) => {
        const isDisliked = c.dislikedByUserIds.includes(userId);
        const isLiked = c.likedByUserIds.includes(userId);
        return {
          ...c,
          dislikedByUserIds: isDisliked
            ? c.dislikedByUserIds.filter((id) => id !== userId)
            : [...c.dislikedByUserIds, userId],
          likedByUserIds: isLiked
            ? c.likedByUserIds.filter((id) => id !== userId)
            : c.likedByUserIds,
        };
      });
    },
    [updateComment]
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        updatePost,
        removePost,
        movePost,
        movePostToTop,
        loadingPosts,
        likePost,
        dislikePost,
        toggleFavourite,
        setPostComments,
        addComment,
        editComment,
        deleteComment,
        likeComment,
        dislikeComment,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
