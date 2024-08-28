import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { Cancel } from '@material-ui/icons'
import { ExcelIcon } from '../icons/Icons'

const Upload = ({ styles, onCancelFile, onUploadFile, fileError }) => {
  const [file, setFile] = useState(null)

  /**
   * handleChange: trigger when file input change
   * It populate file state with file details
   * and pass onUploadFile props to parent with files
   */
  const handleChange = (e) => {
    setFile(e.target.files[0])
    onUploadFile(e.target.files[0])
  }

  /**
   * handleCancel: when user click to cancle uploaded file
   * It set file state to null
   * and send onCancelFile props to parent
   */
  const handleCancel = () => {
    setFile(null)
    onCancelFile()
  }

  return (
    <>
      <Typography variant="h6" className={styles.subTitle}>
        Upload File
      </Typography>
      <div className={styles.contentBody}>
        <p className={`${styles.infoText} ${styles.textLeft}`}>
          {!file
            ? 'Please upload the completed template file'
            : 'This SCD diagnosis file will be uploaded when you click "Import" below:'}
        </p>

        {/* File Uploader */}
        {file === null && (
          <div className={styles.fileInput}>
            <Typography variant="h6" className={styles.subTitle}>
              Drag and drop your file here
            </Typography>
            <p className={`${styles.infoText} ${styles.muted}`}>
              or <span>select it from your computer</span>
            </p>
            <input type="file" onChange={handleChange} />
          </div>
        )}

        {/* Shows when has file */}
        {file !== null && (
          <div
            className={`${styles.fileDetails} ${
              fileError !== '' ? styles.fileError : ''
            }`}
          >
            <ExcelIcon />
            <Typography variant="h6" className={styles.subTitle}>
              {file['name']}
            </Typography>
            <div className={styles.cancelFileIcon} onClick={handleCancel}>
              <Cancel />
            </div>
            <Typography variant="body1" className={styles.errorText}>
              {fileError}
            </Typography>
          </div>
        )}

        {/* Notes */}
        <p className={styles.infoText}>
          <strong>Note:</strong> Diagnoses that are uploaded will overwrite any
          existing diagnoses for each participant.
        </p>
      </div>
    </>
  )
}

export default Upload
