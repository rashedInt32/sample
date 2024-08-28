import React from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const Header = ({ onClose, step, styles }) => {
  return (
    <>
      <Grid container justify="space-between" alignItems="flex-start">
        <Typography variant="h5" className={styles.heading}>
          Upload SCD Diagnosis File
        </Typography>
        <Button
          onClick={onClose}
          aria-label="Close"
          disableRipple={true}
          children={<Close />}
        />
      </Grid>

      {(step === 'template' || step === 'upload') && (
        <Grid container justify="center">
          <div className={styles.steps}>
            <Typography
              variant="body1"
              className={`${styles.step} ${
                step === 'template' ? styles.stepActive : ''
              }`}
            >
              <span>1</span>
              Download Template
            </Typography>
            <hr />
            <Typography
              variant="body1"
              className={`${styles.step} ${
                step === 'upload' ? styles.stepActive : ''
              }`}
            >
              <span>2</span>
              Upload File
            </Typography>
          </div>
        </Grid>
      )}
      <hr />
    </>
  )
}

export default Header
