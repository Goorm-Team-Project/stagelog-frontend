import httpService from './httpService'

export const UploadService = {
  presign(filename: string, contentType: string) {
    return httpService.post('/uploads/presign', {
      filename,
      content_type: contentType,
    })
  },
}
