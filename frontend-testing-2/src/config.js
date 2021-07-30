export const baseApiUrl =
  process.env.NODE_ENV === 'test'
    ? 'https://api.backend.dev'
    : process.env.REACT_APP_API_BASE_URL
