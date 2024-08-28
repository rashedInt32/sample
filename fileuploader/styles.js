import { makeStyles } from '@material-ui/styles'

const colors = {
  red: '#B62B30',
  green: '#789D5C',
  darkGreen: '#7095AA',
  text: '#26363E',
  link: '#7095AA',
  border: 'rgba(38, 54, 62, 0.15)',
}

// Trigger button styles
export const triggerButtonStyles = makeStyles((theme) => ({
  buttonContent: {
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    letterSpacing: 2,
    color: colors.red,
    textTransform: 'uppercase',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    cursor: 'pointer',
    '& > span': {
      paddingLeft: 10,
    },
  },
  infoText: {
    color: colors.red,
    fontSize: 14,
    textAlign: 'right',
    paddingBottom: 15,
    fontStyle: 'italic',
  },
  errorText: {
    position: 'relative',
    transform: 'translateX(145px)',
    transition: 'transform .3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    animation: `transformLeft 2s linear`,
    '& svg': {
      marginRight: 10,
    },
  },
  animation: {
    transform: 'translateX(0px)',
  },
}))

// Dialog custom styles
export const uploadDialogStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 60,
    '& hr': {
      width: '100%',
      height: 1,
      backgroundColor: 'rgba(38, 54, 62, 0.2)',
      border: 0,
      marginTop: 30,
      marginBottom: 30,
    },
  },

  // header
  heading: {
    fontWeight: '600',
    marginBottom: 30,
  },

  // Header steps
  steps: {
    display: 'flex',
    alignItems: 'center',
    '& hr': {
      width: 30,
      height: 1,
      backgroundColor: 'rgba(38, 54, 62, 0.12)',
      border: 0,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 0,
      marginBottom: 0,
    },
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    color: colors.text,
    opacity: '0.8',
    '& span': {
      width: 24,
      height: 24,
      borderRadius: '50%',
      border: `2px solid ${colors.border}`,
      color: colors.text,
      marginRight: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
  },
  stepActive: {
    opacity: '1',
    fontWeight: 'bold',
    '& span': {
      backgroundColor: colors.green,
      color: '#fff',
      borderColor: colors.green,
    },
  },

  // Dialog button
  button: {
    backgroundColor: colors.red,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 4,
    boxShadow: 'none',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#fff',
    '&:hover': {
      backgroundColor: colors.red,
      opacity: '0.9',
    },
    '&:disabled': {
      backgroundColor: colors.red,
      opacity: '0.4',
      color: '#fff',
    },
  },
  backButton: {
    background: 'none',
    color: colors.text,
    marginRight: 30,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.08)',
      opacity: '0.9',
    },
  },

  returnToUpload: {
    color: colors.darkGreen,
    marginRight: 0,
  },
  uploadTemplateButton: {
    backgroundColor: colors.darkGreen,
    marginBottom: 20,
    '&:hover': {
      backgroundColor: colors.darkGreen,
    },
  },

  linkButton: {
    textDecoration: 'none',
    marginBottom: 20,
    display: 'inline-block',
  },

  // Upload content
  content: {
    paddingTop: 10,
    paddingBottom: 30,
    minHeight: 430,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    '& svg': {
      marginBottom: 20,
      marginTop: 20,
    },
  },
  contentBody: {
    paddingTop: 20,
  },

  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 25,
    marginTop: 0,
    '& strong': {
      color: colors.red,
    },
    '& a': {
      fontWeight: 'bold',
      color: colors.link,
      textDecoration: 'none',
      borderBottom: `2px solid ${colors.link}`,
      '&:hover': {
        opacity: '0.7',
      },
    },
  },
  muted: {
    color: 'rgba(38, 54, 62, 0.7)',
    '& span': {
      borderBottom: `1px solid rgba(38, 54, 62, 0.6)`,
    },
  },
  mw420: { maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' },
  mw450: { maxWidth: 450, marginLeft: 'auto', marginRight: 'auto' },
  mb30: { marginBottom: 30 },
  textCenter: { textAlign: 'center' },

  // File Input
  fileInput: {
    position: 'relative',
    width: '100%',
    minHeight: 130,
    padding: 20,
    border: `2px dashed ${colors.border}`,
    borderRadius: 4,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    '& input': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: '0',
    },
  },
  // File name and close icon
  fileDetails: {
    position: 'relative',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 70,
    marginBottom: 30,
    border: `1px solid ${colors.border}`,
    borderRadius: 4,
    backgroundColor: '#F8F9F9',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      margin: 0,
      marginRight: 10,
    },
    '& h6': {
      opacity: '0.7',
    },
  },
  fileError: {
    borderColor: colors.red,
  },
  errorText: {
    color: colors.red,
    position: 'absolute',
    bottom: -20,
    left: 0,
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  cancelFileIcon: {
    position: 'absolute',
    right: 10,
    opacity: '0.5',
    cursor: 'pointer',
    '& svg': {
      color: colors.text,
      fontSize: 30,
    },
  },
  progressbar: {
    backgroundColor: '#DEE1E2',
    borderRadius: 6,
    marginTop: 10,
    '& div': {
      backgroundColor: '#88AF6C',
      borderRadius: 6,
    },
  },
  progressInfo: {
    position: 'relative',
    textAlign: 'left',
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    '& p': {
      fontSize: 14,
      paddingLeft: 15,
      fontStyle: 'italic',
    },

    '& svg': {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  circularProgress: {
    color: colors.darkGreen,
  },
}))
