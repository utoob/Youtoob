export const PORT = process.env.PORT || 3000
export const WDS_PORT = 7000
export const SECRET = 'Ndmm3cVvxFdNaGPfL14gcoYzxqgcgI4R'
export const isTesting = process.env.NODE_ENV === 'test'
export const isProd = process.env.NODE_ENV === 'production'

export const PROTOCOL = process.env.PROTOCOL || 'http://'
export const HOSTNAME = process.env.HOSTNAME || 'localhost'
export const API_PORT = process.env.API_PORT || '3000'