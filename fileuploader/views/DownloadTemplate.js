import React from 'react'
import { Typography } from '@material-ui/core'

import { UploadTemplateIcon } from '../icons/UploadTemplate'

import xlfile from '../docs/SCD Diagnosis Upload v2.xlsx'
import pdfFile from '../docs/SCD Diagnosis Upload User Guide v2.0.pdf'

// TODO: Add download links for Upload Template and Guide
const DownloadTemplate = ({ styles }) => {
  return (
    <>
      <Typography variant="h6" className={styles.subTitle}>
        Use a Template for Importing
      </Typography>
      <div className={`${styles.contentBody} ${styles.textCenter}`}>
        <UploadTemplateIcon />
        <p className={`${styles.infoText} ${styles.mw420}`}>
          To update your participant diagnoses, upload a file using this
          spreadsheet template:
        </p>
        <a
          href={xlfile}
          type="button"
          variant="contained"
          className={`${styles.button} ${styles.uploadTemplateButton} ${styles.linkButton}`}
          download="SCD Diagnosis Upload.xlsx"
        >
          SCD Diagnosis Upload Template
        </a>
        <p className={styles.infoText}>
          Please see the{' '}
          <a href={pdfFile} download="SCD Diagnosis Upload User Guide v2.0.pdf">
            SCD Diagnosis Upload Guide
          </a>{' '}
          for further information regarding the format and instructions for
          completing the template.
        </p>
      </div>
    </>
  )
}

export default DownloadTemplate
