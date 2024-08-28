import React from 'react'
import { LinearProgress, Typography, CircularProgress } from '@material-ui/core'

const Progress = ({ styles, progress }) => {
  return (
    <>
      <Typography variant="h6" className={styles.subTitle}>
        Importing file...
      </Typography>
      <div className={`${styles.contentBody} ${styles.textCenter}`}>
        <Typography
          variant="h6"
          className={`${styles.subTitle} ${styles.muted}`}
        >
          {progress} %
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          className={styles.progressbar}
        />
        <div className={`${styles.progressInfo}`}>
          <CircularProgress
            variant="indeterminate"
            disableShrink
            size={20}
            thickness={4}
            className={styles.circularProgress}
          />
          <Typography variant="body1" className={`${styles.muted}`}>
            Processing, please wait...
          </Typography>
        </div>
      </div>
    </>
  )
}

export default Progress
