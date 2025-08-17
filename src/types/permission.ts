export const Permission = {
  // Пользователи
  MANAGE_USERS: 'manage_users',

  // Посты
  CREATE_POST: 'create_post',
  EDIT_OWN_POST: 'edit_own_post',
  EDIT_ALL_POSTS: 'edit_all_posts',
  DELETE_OWN_POST: 'delete_own_post',
  DELETE_ALL_POSTS: 'delete_all_posts',
  VIEW_ALL_POSTS: 'view_all_posts',
  VIEW_OWN_POSTS: 'view_own_posts',
  SET_POST_PRIORITY: 'set_post_priority',

  // Комменты
  CREATE_COMMENT: 'create_comment',
  EDIT_OWN_COMMENT: 'edit_own_comment',
  EDIT_ALL_COMMENTS: 'edit_all_comments',
  DELETE_OWN_COMMENT: 'delete_own_comment',
  DELETE_ALL_COMMENTS: 'delete_all_comments',
  VIEW_COMMENTS: 'view_comments',

  // Взаимодействие с постами
  LIKE_POST: 'like_post',
  DISLIKE_POST: 'dislike_post',
  FAVORITE_POST: 'favorite_post',

  // Личный кабинет
  VIEW_PROFILE: 'view_profile',
  EDIT_PROFILE: 'edit_profile',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];
