const { request } = require('@/utils');

export const getAllRelated = (id) => request.get(`/related/allvideo?id=${id}`);
// mv
export const getMVDetail = (id) => request.get(`/mv/detail?mvid=${id}`);

export const getMVURL = (id) => request.get(`/mv/url?id=${id}`);

export const getMVComments = (id) => request.get(`/comment/mv?id=${id}`);

export const getMVAll = (
  offset = 0,
  limit = 39,
  area = '全部',
  type = '全部',
  order = '最热'
) =>
  request.get(
    `/mv/all?offset=${offset}&limit=${limit}&area=${area}&type=${type}&order=${order}`
  );

// video
export const getVideoDetail = (id) => request.get(`/video/detail?id=${id}`);

export const getVideoURL = (id) => request.get(`/video/url?id=${id}`);

export const getVideoComments = (id) => request.get(`/comment/video?id=${id}`);
