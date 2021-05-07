import { request } from '@/utils';

export const getAlbum = (id) => request.get(`/album?id=${id}`);

export const getPlayList = (id) => request.get(`/playlist/detail?id=${id}`);

export const getCommentList = (id, limit = 20, offset = 0) =>
  request.get(`/comment/playlist?id=${id}&limit=${limit}&offseet=${offset}`);
