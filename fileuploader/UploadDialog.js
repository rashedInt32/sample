import React, { useState } from 'react'
import { Slide, Dialog, Grid } from '@material-ui/core'
import { uploadDialogStyles } from './styles'
import Header from './Header'
import Footer from './Footer'
import DownloadTemplate from './views/DownloadTemplate'
import Upload from './views/Upload'
import Success from './views/Success'
import Error from './views/Error'
import Progress from './views/Progress'

const Transition = (props) => <Slide direction="up" {...props} timeout={300} />

const UploadDialog = ({
  isOpen,
  onClose,
  uploadState,
  onBack,
  onNext,
  onImport,
  onFileUploaded,
  onReturnToPortal,
  onUploadNewFile,
  requestProgress,
  apiResponse,
  onDownloadErrorReport,
}) => {
  const styles = uploadDialogStyles()

  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [fileError, setFileError] = useState('')
  // Updates setIsFileUploaded value
  const handleCancelFile = () => {
    setIsFileUploaded(false)
    setFileError('')
  }

  /**
   * handleUploadFile
   * Updates isFileUploaded value
   * pass onFileUploaded prors to parent along with files
   */
  const handleUploadFile = (file) => {
    const fileExtension = file.name.split('.').pop()
    if (fileExtension !== 'xlsx') {
      setFileError('Only accepts Excel Workbook(.xlsx) file.')
      return
    }

    setIsFileUploaded(true)
    onFileUploaded(file)
  }

  const handleUploadNewFile = () => {
    setIsFileUploaded(false)
    onUploadNewFile()
  }

  const hanleReturnToPortal = () => {
    setIsFileUploaded(false)
    onReturnToPortal()
  }

  const handleCloseDialog = () => {
    setIsFileUploaded(false)
    onClose()
  }

  const renderFooter = () => {
    if (uploadState === 'template' || uploadState === 'upload')
      return (
        <Footer
          uploadState={uploadState}
          styles={styles}
          onBack={onBack}
          onNext={onNext}
          onImport={onImport}
          disabledImportButton={isFileUploaded}
        />
      )
    return null
  }

  // Dialog views base on uploadstate
  const renderViews = () => {
    switch (uploadState) {
      case 'template':
        return <DownloadTemplate styles={styles} />
      case 'upload':
        return (
          <Upload
            styles={styles}
            onCancelFile={handleCancelFile}
            onUploadFile={(file) => handleUploadFile(file)}
            fileError={fileError}
          />
        )
      case 'success':
        return (
          <Success
            styles={styles}
            returnToPortal={hanleReturnToPortal}
            uploadNewFile={handleUploadNewFile}
            apiResponse={apiResponse}
          />
        )
      case 'error':
        return (
          <Error
            styles={styles}
            uploadNewFile={handleUploadNewFile}
            apiResponse={apiResponse}
            downloadErrorReport={onDownloadErrorReport}
          />
        )

      case 'progress':
        return <Progress styles={styles} progress={requestProgress} />
      default:
        return <DownloadTemplate styles={styles} />
    }
  }

  return (
    <Dialog fullScreen open={isOpen} TransitionComponent={Transition}>
      <Grid container className={styles.container} justify="center">
        <Grid item xs={9}>
          <Header
            onClose={handleCloseDialog}
            step={uploadState}
            styles={styles}
          />
          <div className={styles.content}>{renderViews()}</div>
          {renderFooter()}
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default UploadDialog
