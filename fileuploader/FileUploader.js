import React, { useState } from 'react'
import UploadDialog from './UploadDialog'
import UploadTriggerButton from './UploadTriggerButton'
import { uploadFile, getUploadStatus, getErrorReport } from './api'

const FileUploader = () => {
  // This state needed to show file upload process on the dashboard
  // when user close modal while api request still happens
  const initialProgressState = {
    value: 0,
    isRunning: false,
    isError: false,
    processDone: false,
  }

  const [openDialog, setOpenDialog] = useState(false)

  const [uploadState, setUploadState] = useState('template') // template, upload, progress, error, success
  const [uploadedFile, setUploadeedFile] = useState(null)
  const [progress, setProgress] = useState({ ...initialProgressState })
  const [apiResponse, setApiResponse] = useState({})

  /**
   * HandleImport
   * params formData as uploadedFile
   * first upload file via uploadFile method
   * then get status via getUploadStatus method
   * set response to state
   * if status success show success view screen and set progress state
   * if status fail show error view screen and set progress state
   */
  const handleImport = async () => {
    // Update uploadState
    setUploadState('progress')
    setProgress({ ...progress, value: 70, isRunning: true, isError: false })

    // POST file
    const formData = new FormData()
    formData.append('attachment', uploadedFile)
    const postResponse = await uploadFile(formData)
    if (postResponse.error) {
      setApiResponse(postResponse)
      setProgress({
        ...progress,
        value: 100,
        isError: true,
        processDone: true,
        isRunning: false,
      })
      setTimeout(() => {
        setUploadState('error')
      }, 500)
      return
    }

    // GET status
    const resp = await getUploadStatus()
    setApiResponse(resp)

    if (resp.status === 'success') {
      setProgress({
        ...progress,
        value: 100,
        isError: false,
        processDone: true,
        isRunning: false,
      })
      setTimeout(() => {
        setUploadState('success')
      }, 500)
      return
    }

    setProgress({
      ...progress,
      value: 100,
      isError: true,
      processDone: true,
      isRunning: false,
    })
    setTimeout(() => {
      setUploadState('error')
    }, 500)
  }

  /**
   * handleReturnToPortral()
   * trigger from Success view
   */
  const handleReturnToPortal = () => {
    setOpenDialog(false)
    setTimeout(() => {
      setUploadState('template')
    }, 300)
  }

  /**
   * handleUploadNewFile()
   * trigger from Success view and Error view
   */
  const handleUploadNewFile = () => {
    setApiResponse({})
    setUploadState('upload')
  }

  /**
   * handleCloseDialog()
   * when click close icon from dialog
   */
  const handleCloseDialog = () => {
    if (uploadState !== 'progress') {
      setUploadState('template')
      setProgress(initialProgressState)
    }
    setOpenDialog(false)
  }

  /**
   * handleDownloadErrorReport
   * when theres error and click download error report
   * button, it trigger and api call to download file
   * with appropiate error
   * trigger from Error view
   */
  const handleDownloadErrorReport = async () => {
    await getErrorReport(apiResponse['report'])
  }

  return (
    <>
      <UploadTriggerButton
        onClick={() => setOpenDialog(true)}
        isRunning={progress.isRunning}
        isError={progress.isError}
        isProcessDone={progress.processDone}
      />
      <UploadDialog
        isOpen={openDialog}
        uploadState={uploadState}
        onClose={handleCloseDialog}
        onBack={() => setUploadState('template')}
        onNext={() => setUploadState('upload')}
        onImport={handleImport}
        onFileUploaded={(file) => setUploadeedFile(file)}
        onReturnToPortal={handleReturnToPortal}
        onUploadNewFile={handleUploadNewFile}
        requestProgress={progress.value}
        apiResponse={apiResponse}
        onDownloadErrorReport={handleDownloadErrorReport}
      />
    </>
  )
}

export default FileUploader
