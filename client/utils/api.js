import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const extractData = (response) => response.data

export const login = ({ username, password }) => {}

export const register = ({ username, password }) => {}

export const uploadVideo = (params, onUploadProgress) => {
  const data = new FormData()
  for (const key in params) {
    data.append(key, params[key])
  }
  const config = { 
    onUploadProgress: onUploadProgress 
  }
  return instance
    .post('/videos', data, config)
    .then(extractData)
}

export const getVideo = (id) => {
  return instance
    .get(`/videos/${id}`)
    .then(extractData)
}

export const getVideos = (q) => {
  return instance
    .get('/videos', { params: { q } })
    .then(extractData)
}

export const watchVideoUrl = (video) => {
  return `http://localhost:3000/api/videos/${video._id}/watch`
}