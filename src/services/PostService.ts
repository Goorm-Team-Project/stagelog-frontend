import httpService from "./httpService"

export const PostService = {
    // 전체 게시글 목록 조회
    getPostList({category, search, sort, page, size}: {category?: string, search?: string, sort?: string, page?: number, size?: number}) {
        return httpService.get('/posts', {
            params: {
                category,
                search,
                sort,
                page,
                size
            }
        });
    },

    // 공연별 게시글 목록 조회
    getConcertPostList({id, category, search, sort, page}: {id: number, category?: string, search?: string, sort?: string, page?: number}) {
        return httpService.get(`/events/${id}/posts`, {
            params: {
                category,
                search,
                sort,
                page
            }
        });
    },

    // 게시글 상세 조회 
    getPostDetail(id: number) {
        return httpService.get(`/posts/${id}`);
    },

    // 게시글 작성
    createPost({id, category, title, content, image_url}: {id: number, category: string, title: string, content: string, image_url?: string | null}) {
        return httpService.post(`/events/${id}/posts`, { title, content, category, image_url });
    },

    // 게시글 좋아요
    likePost(id: number) {
        return httpService.post(`/posts/${id}/reactions/like`);
    },

    // 게시글 싫어요
    dislikePost(id: number) {
        return httpService.post(`/posts/${id}/reactions/dislike`);
    }
}