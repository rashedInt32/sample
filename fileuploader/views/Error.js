import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { ErrorIcon } from '../icons/ErrorIcon'
import { formattedDate } from '../utils'

const Error = ({ styles, downloadErrorReport, apiResponse, uploadNewFile }) => {
  const renderDownloadButton = () => {
    if (apiResponse.error) return null
    return (
      <Button
        variant="contained"
        onClick={downloadErrorReport}
        className={`${styles.button} ${styles.uploadTemplateButton}`}
        disableRipple={true}
      >
        Download Error Report
      </Button>
    )
  }

  return (
    <>
      <Typography variant="h6" className={styles.subTitle}>
        Incomplete import
      </Typography>
      <div className={`${styles.contentBody} ${styles.textCenter}`}>
        <ErrorIcon />
        <p className={`${styles.infoText} ${styles.muted}`}>
          {formattedDate()}
        </p>
        <Typography
          variant="body2"
          className={`${styles.subTitle} ${styles.mb30}`}
        >
          Unable to load SCD diagnosis file.
          <br />
          {apiResponse.error
            ? apiResponse.error
            : "To review the file's errors, please download the report."}
        </Typography>

        {renderDownloadButton()}
        <div>
          <Button
            onClick={uploadNewFile}
            className={`${styles.button} ${styles.backButton} ${styles.returnToUpload}`}
            disableRipple={true}
          >
            Upload new file
          </Button>
        </div>
      </div>
    </>
  )
}

export default Error
