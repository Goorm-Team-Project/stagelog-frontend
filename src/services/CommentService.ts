import httpService from "./httpService";

export const CommentService = {
  // 댓글 작성
  createComment(id: number, content: string) {
    return httpService.post(`/posts/${id}/comments`, { content })
  },

  // 댓글 목록 조회
  getComments(id: number, params: { page: number; }) {
    return httpService.get(`/posts/${id}/comments`, { params })
  },

}
