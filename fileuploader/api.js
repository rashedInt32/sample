import { APIBaseURL } from '../api'
import { downloadErrorReport, getBlobFromApi } from './utils'

const site = window.__SITE__.id
const request = (route, type, payload = null) => {
  return fetch(`${APIBaseURL}/${site}/${route}`, {
    method: type,
    ...(type === 'POST' && { body: payload }),
    ...(type === 'GET' && {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  })
}

/**
 * uploadFile
 * params {file} uploaded file
 * return response object
 */
export const uploadFile = async (file) => {
  const response = await request(`dx_submission`, 'POST', file)
  return await response.json()
}

/**
 * getUploadStatus
 * params {file} uploaded file
 * return response object
 */
export const getUploadStatus = async () => {
  const response = await request(`dx_submission/status`, 'GET')
  return await response.json()
}

/**
 * getUploadStatus
 * params {file} uploaded file
 * return response object
 */
export const getErrorReport = async (code) => {
  const response = await request(`dx_submission/download?code=${code}`, 'GET')
  // Generate blob and filename from response
  const [blob, filename] = await getBlobFromApi(response)
  if (blob != null) {
    // creates a downloadable link inside document
    downloadErrorReport(blob, filename)
  }
}
