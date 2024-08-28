import React from 'react'
import Typography from '@material-ui/core/Typography'
import { DownloadIcon, AlertError } from './icons/Icons'
import { triggerButtonStyles } from './styles'

const UploadTriggerButton = ({
  onClick,
  isRunning,
  isError,
  isProcessDone,
}) => {
  const styles = triggerButtonStyles()

  return (
    <div className={styles.buttonContent}>
      <Typography
        variant="body2"
        onClick={onClick}
        color="inherit"
        className={styles.text}
      >
        <DownloadIcon />
        <span>Upload SCD Diagnosis File</span>
      </Typography>

      {isRunning && (
        <Typography variant="h6" className={styles.infoText} color="inherit">
          SCD Diagnosis File Processing...
        </Typography>
      )}
      {isError && (
        <Typography
          variant="h6"
          className={`${styles.infoText} ${styles.errorText} ${
            isProcessDone ? styles.animation : ''
          }`}
          color="inherit"
        >
          <AlertError /> SCD Diagnosis File Processing Failed - Click Here For
          Details
        </Typography>
      )}
    </div>
  )
}

export default UploadTriggerButton
