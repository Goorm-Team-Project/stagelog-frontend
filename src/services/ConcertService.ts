import httpService from "./httpService";

interface GetConcertListParams {
  search?: string
  sort?: string
  page?: number
  size?: number
}


export const ConcertService = {
    // 공연 목록 조회
    getConcertList(params: GetConcertListParams) {
    const { search, sort, page, size } = params

    return httpService.get('/events', {
      params: {
        ...(search && { search }),
        ...(sort && { sort }),
        page,
        size,
      },
    })
  },

  // 공연 상세 조회
  getConcertDetail(id: number) {
    return httpService.get(`/events/${id}`)
  },

  // 공연 즐겨찾기 추가/해제
  toggleFavoriteConcert(id: number) {
    return httpService.post(`/bookmarks/${id}`)
  }

}
