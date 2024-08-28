export const formattedDate = () => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  const today = new Date()
  return today.toLocaleTimeString('en-US', options)
}

/**
 * downloadErrorReport
 * params {blob} file blob
 * params {filename} name of the file
 * creates link with url to download file
 */
export const downloadErrorReport = (blob, filename) => {
  const url = window.URL.createObjectURL(blob)
  let a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

/**
 * getBlobFromApi
 * params {response} promise from api
 * return [blob, filename] to use by downloadErrorReport method
 */
export const getBlobFromApi = async (response) => {
  let filename = ''
  const header = response.headers.get('Content-Disposition')
  const parts = header.split(';')
  filename = parts[1].split('=')[1].replaceAll('"', '')
  const blob = await response.blob()
  return [blob, filename]
}
