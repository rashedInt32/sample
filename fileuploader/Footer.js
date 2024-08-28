import React from 'react'
import { Grid, Button } from '@material-ui/core'

const Footer = ({
  uploadState,
  styles,
  onBack,
  onNext,
  onImport,
  disabledImportButton,
}) => {
  // Render button based on uploadState
  const renderButtons = () => {
    switch (uploadState) {
      case 'template':
        return (
          <Button
            onClick={onNext}
            variant="contained"
            className={styles.button}
            disableRipple={true}
          >
            Next
          </Button>
        )
      case 'upload':
        return (
          <>
            <Button
              onClick={onBack}
              className={`${styles.button} ${styles.backButton}`}
              disableRipple={true}
            >
              Back
            </Button>
            <Button
              onClick={onImport}
              disabled={!disabledImportButton}
              variant="contained"
              className={styles.button}
              disableRipple={true}
            >
              Import
            </Button>
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <hr />
      <Grid container justify="flex-end">
        {renderButtons()}
      </Grid>
    </>
  )
}

export default Footer
