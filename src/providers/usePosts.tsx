import {
  PostsContext,
  type PostsContextValue,
} from '../context/PostsContext.tsx';
import { useContext } from 'react';

export const usePosts = (): PostsContextValue => {
  const context = useContext(PostsContext);
  if (!context) throw new Error('usePosts must be used within a PostsProvider');
  return context;
};
