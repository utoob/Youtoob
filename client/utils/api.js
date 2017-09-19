import axios from 'axios'

const ENDPOINT = `${PROTOCOL}${HOST}:${PORT}/api`

export const instance = (options = {}) => {
  const user = retrieveUserState()
  const config = Object.assign(
    { baseURL: options.baseURL || ENDPOINT },
    user && { headers: { authorization: `Token ${user.token}` } }
  )
  return axios.create(config)
}

export const USER_CHANGE_EVENT = 'USER_CHANGE_EVENT'

/* Set & retrieve user state using these methods */

export const saveUserState = (user) => {
  const event = new CustomEvent(USER_CHANGE_EVENT, { detail: user })
  localStorage.setItem('user', JSON.stringify(user))
  dispatchEvent(event)
  return user
}

export const retrieveUserState = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    return null
  }
}

export const logout = () => {
  const event = new CustomEvent(USER_CHANGE_EVENT, { detail: null })
  localStorage.removeItem('user')
  dispatchEvent(event)
}

export const extractData = (response) => response.data

/* Server related API */

export const login = ({ username, password }) => {
  const user = { username: username, password: password }
  return instance()
    .post('/login', user)
    .then(extractData)
    .then(saveUserState)
}

// 1. Register function
// Complete this register function
export const register = ({ username, password }) => {
  const user = { username: username, password: password }
  return instance()
    .post('/register', user)
    .then(extractData)
    .then(saveUserState)
}

export const uploadVideo = (params, onUploadProgress) => {
  const data = new FormData()
  for (const key in params) {
    data.append(key, params[key])
  }
  const config = { onUploadProgress: onUploadProgress }
  return instance()
    .post('/videos', data, config)
    .then(extractData)
}

export const getVideo = (id) => {
  return instance()
    .get(`/videos/${id}`)
    .then(extractData)
}

export const getVideos = (q) => {
  return instance()
    .get('/videos', { params: { q } })
    .then(extractData)
}

export const watchVideoUrl = (video) => {
  return `${ENDPOINT}/videos/${video._id}/watch`
}