import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { SuccessIcon } from '../icons/SuccessIcon'
import { formattedDate } from '../utils'

const Success = ({ styles, returnToPortal, uploadNewFile, apiResponse }) => {
  return (
    <>
      <Typography variant="h6" className={styles.subTitle}>
        Import completed
      </Typography>
      <div className={`${styles.contentBody} ${styles.textCenter}`}>
        <SuccessIcon />

        <p className={`${styles.infoText} ${styles.muted}`}>
          {formattedDate()}
        </p>

        <Typography
          variant="body2"
          className={`${styles.subTitle} ${styles.mb30}`}
        >
          Successfully updated SCD diagnoses for{' '}
          {apiResponse.status === 'success' && apiResponse.participants_count}{' '}
          participants.
        </Typography>

        <p className={`${styles.infoText} ${styles.mw450}`}>
          Updated diagnoses will be available in your site portal following your
          next EHR data submission.
        </p>

        <Button
          variant="contained"
          onClick={returnToPortal}
          className={`${styles.button} ${styles.uploadTemplateButton}`}
          disableRipple={true}
        >
          Return to portal
        </Button>

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

export default Success
