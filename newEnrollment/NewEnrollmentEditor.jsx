import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { Divider, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import {
  createEnrollment,
  getCountriesOrStates as getStates,
} from '@ihp-smp/core/src/services'
import { Button } from '@ihp-smp/dls/src/components/button'
import { Notification } from '@ihp-smp/dls/src/components/notification'
import { Loader } from '@ihp-smp/dls/src/components/loader'
import { CheckIcon } from '@ihp-smp/dls/src/icons'
import { IconColor } from '@ihp-smp/dls/src/types'
import theme from '@ihp-smp/dls/src/theme'
import {
  API_DATE_FORMAT_SHORT,
  notificationMessages,
  PHONE_REGEX_US_CANADA,
  ZIP_CODE_REGEX_CANADA,
  ZIP_CODE_REGEX_US,
} from '@/src/constants'
import { translate } from '@ihp-smp/core/src/locale'
import { ROUTES } from '@/src/routes'
import {
  countries,
  sites,
  all,
  virtualSites,
  useSelectionOptions,
} from '@/src/hooks'
import {
  gender,
  sex_at_birth,
  ethnicity,
  race,
  marital_status,
} from '../participantDetails/dashboard/formUtils'
import { ALLFTD } from '@/src/store/participants/constants'
import newEnrollmentFormFields from './formUtils'
import { NewEnrollmentContainerType } from './types'

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .min(1, 'First Name must contain at least 1 character')
    .required('First Name is required'),
  lastName: Yup.string()
    .trim()
    .min(1, 'Last Name must contain at least 1 character')
    .required('Last Name is required'),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  zipCode: Yup.string()
    .required('ZIP code is required')
    .when('country', function (country, schema) {
      const value = country?.[0]?.id
      if (value === 'US') {
        return schema.matches(ZIP_CODE_REGEX_US, translate('zipCodeErrorUS'))
      }
      if (value === 'CA') {
        return schema.matches(
          ZIP_CODE_REGEX_CANADA,
          translate('zipCodeErrorCA')
        )
      }
      return schema
    }),
  noMiddleName: Yup.boolean(),
  middleName: Yup.string().when('noMiddleName', {
    is: true,
    then: () => Yup.string().notRequired(),
    otherwise: () =>
      Yup.string().required(
        "Please provide Middle Name or select the 'I do not have a middle name' option"
      ),
  }),
  state: Yup.object().required('State or province is required'),
  sexAtBirth: Yup.object().required('Sex at birth is required'),
  country: Yup.object().required('Country is required'),
  race: Yup.array().required('Race is required'),
  ethnicity: Yup.object().required('Ethnicity is required'),
  consentStatus: Yup.string().required(
    'Consent obtained from participant is required'
  ),
  phone: Yup.string()
    .matches(PHONE_REGEX_US_CANADA, 'Phone Number is not valid')
    .required('Mobile phone number is required'),
  enrollmentDate: Yup.string().required('Enrollment date is required'),
  siteId: Yup.object().required('Site is required'),
})

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  sexAtBirth: null,
  race: null,
  ethnicity: null,
  dateOfBirth: '',
  email: '',
  state: null,
  country: null,
  zipCode: '',
  phone: '',
  siteId: null,
  enrollmentDate: '',
  consentStatus: null,
  status: 'enrolled',
  personState: 'enrollment',
  noMiddleName: false,
}

export const AddParticipantEditorContainer = () => {
  const [showNotification, toggleNotification] = useState({
    isError: false,
    isSuccess: false,
    isInfo: false,
  })
  const [isLoading, setLoading] = useState(false)
  const [isInitialized, initialize] = useState(false)
  const [error, setError] = useState(null)
  const [radioValue, setRadioFieldValue] = useState({})
  const [defaultCountryCode, setDefaultCountryCode] = useState(false)
  const groupedKeys = Object.keys(newEnrollmentFormFields)
  const navigate = useNavigate()
  const containerRef = useRef()

  const {
    isLoadingContent: isLoadingSelectionOptions,
    error: selectionOptionsError,
    result: selectionOptions,
  } = useSelectionOptions({
    field: all,
    study: ALLFTD,
    fetchAllSites: false,
    fetchAllCountries: false,
    filterSitesBy: virtualSites,
  })

  function handleClose() {
    navigate(ROUTES.participants)
  }

  const onSubmit = async (values) => {
    setLoading(true)
    toggleNotification({
      isError: false,
      isSuccess: false,
      isInfo: false,
    })

    const isDateOfDeath = values?.dateOfDeath ?? null
    const dateOfBirthString = new Date(values?.dateOfBirth)
    let dateOfDeathString = null
    if (isDateOfDeath !== null) {
      dateOfDeathString = new Date(values?.dateOfDeath)
    }
    const enrollmentDateString = new Date(values?.enrollmentDate)
    const phone = values.phone.replace(/[-() ]/g, '')

    const formattedValues = () => {
      return {
        sexAtBirth: values?.sexAtBirth?.value,
        race: values?.race?.map((item) => item.value).join(', '),
        ethnicity: values?.ethnicity?.value,
        state: values?.state?.value,
        country: values?.country?.value,
        siteId: values?.siteId?.value,
        dateOfBirth: dayjs(dateOfBirthString).format(API_DATE_FORMAT_SHORT),
        enrollmentDate: dayjs(enrollmentDateString).format(
          API_DATE_FORMAT_SHORT
        ),
        phone,
        ...(isDateOfDeath !== null && {
          dateOfDeath: dayjs(dateOfDeathString).format(API_DATE_FORMAT_SHORT),
        }),
      }
    }
    const formValues = {
      ...values,
      ...formattedValues(),
    }
    try {
      await createEnrollment(formValues)
      toggleNotification((prev) => ({
        ...prev,
        isSuccess: true,
      }))
      setLoading(false)
    } catch (error) {
      setError(error?.response?.data?.message)
      toggleNotification((prev) => ({
        ...prev,
        isError: true,
      }))
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const {
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    submitCount,
  } = formik
  useEffect(() => {
    if (errors) {
      const firstErrorElement = containerRef.current.querySelector(
        '[aria-invalid]:not([aria-invalid="false"])'
      )
      const label =
        containerRef.current.querySelector(
          `[for="${firstErrorElement?.id}"]`
        ) ?? firstErrorElement
      label?.scrollIntoView()
    }
  }, [submitCount])

  useEffect(() => {
    if (!isLoadingSelectionOptions && !selectionOptionsError) {
      const activeSites = selectionOptions?.[sites].filter(
        (item) => item?.status === 'Active'
      )
      newEnrollmentFormFields['Study Information'].site.componentProps.options =
        activeSites
      newEnrollmentFormFields[
        'Birth Information'
      ].sexAtBirth.componentProps.options = selectionOptions?.[sex_at_birth]
      newEnrollmentFormFields['Birth Information'].race.componentProps.items =
        selectionOptions?.[race]
      newEnrollmentFormFields[
        'Birth Information'
      ].ethnicity.componentProps.options = selectionOptions?.[ethnicity]
      newEnrollmentFormFields['Address'].country.componentProps.options =
        selectionOptions?.[countries]
      initialize(true)
    }
    return () => initialize(false)
  }, [isLoadingSelectionOptions, selectionOptionsError])

  const setStatesList = (event) => {
    setFieldValue('state', null)
    setFieldValue('zipCode', '')
    getStates(event?.target?.value.value)
      .then((data) => {
        const parsedStates = data?.subdivisions?.map((item, index) => ({
          id: index,
          label: item.name,
          value: item.code,
        }))
        newEnrollmentFormFields['Address'].state.componentProps.options =
          parsedStates
      })
      .catch((error) => {
        setError(error?.response?.data?.message)
        toggleNotification((prev) => ({
          ...prev,
          isError: true,
        }))
      })
  }

  const handleOnFocus = (e) => {
    if (e.target.id === 'phone') {
      setFieldValue('phone', '+1')
      setDefaultCountryCode(true)
    }
  }

  const setRadioFieldValues = (event, name) => {
    const value = event[0]?.value
    setRadioFieldValue({ ...radioValue, [name]: event[0] })
    switch (value) {
      case 'yes':
        setFieldValue(name, true)
        break
      case 'no':
        setFieldValue(name, false)
        break
      default:
        setFieldValue(name, null)
    }
  }

  function onChangeHandler(event, type, name) {
    switch (type) {
      case 'text':
      case 'select':
        if (name === 'country') {
          setStatesList(event)
        }
        setFieldValue(name, event?.target?.value)
        break
      case 'checkbox': {
        if (name === 'noMiddleName' && event.length > 0)
          setFieldValue(name, true)
        else setFieldValue(name, false)

        if (name !== 'noMiddleName') setFieldValue(name, event, true)
        break
      }
      case 'date':
      case 'phone': {
        setFieldValue(name, event)
        break
      }
      case 'radio': {
        setRadioFieldValues(event, name)
        break
      }
      default:
        setFieldValue(name, event.target.value)
        break
    }
  }

  const isSubmitDisabled =
    values.firstName === '' ||
    values.lastName === '' ||
    values.emial === '' ||
    values.dateOfBirth === '' ||
    values.zipCode === '' ||
    values.state === null ||
    values.country === null ||
    values.sexAtBirth === null ||
    values.race === null ||
    values.ethnicity === null ||
    values.consentStatus === null ||
    values.siteId === null ||
    values.phone === '' ||
    values.enrollmentDate === '' ||
    (values.middleName === '' && values.noMiddleName === false) ||
    isLoading

  function renderNotification(showNotification) {
    if (showNotification.isSuccess) {
      return (
        <Notification
          isSuccess
          showNotification={showNotification.isSuccess}
          message={notificationMessages.createParticipantSuccess}
          onComplete={handleClose}
        />
      )
    }
    if (showNotification.isError) {
      return (
        <Notification
          isError
          showNotification={showNotification.isError}
          message={error ?? notificationMessages.error}
        />
      )
    }
    if (showNotification.isInfo) {
      return (
        <Notification
          isInfo
          showNotification={showNotification.isInfo}
          message={notificationMessages.updateInfo}
        />
      )
    }
  }

  useEffect(() => {
    if (values.noMiddleName && values.middleName) {
      setFieldValue('middleName', '')
    }
  }, [values])

  return (
    <>
      {(showNotification.isSuccess ||
        showNotification.isError ||
        showNotification.isInfo) &&
        renderNotification(showNotification)}
      <Box component="form" onSubmit={handleSubmit} ref={containerRef}>
        {groupedKeys.map((groupName) => (
          <Grid key={groupName}>
            <Typography
              variant="h5"
              paddingTop="20px"
              paddingBottom="10px"
              color={theme.paletteColors.primary.brown1}
            >
              {groupName}
            </Typography>
            <Grid display="flex" flexWrap="wrap">
              {Object.keys(newEnrollmentFormFields[groupName]).map((v, i) => {
                const Field = newEnrollmentFormFields[groupName][v].component
                const name =
                  newEnrollmentFormFields[groupName][v].componentProps.name
                const type =
                  newEnrollmentFormFields[groupName][v].componentProps.type

                const isDynamicField =
                  name === 'site' ||
                  name === 'sexAtBirth' ||
                  name === 'race' ||
                  name === 'ethnicity' ||
                  name === 'country'
                return (
                  <Grid
                    key={i}
                    {...newEnrollmentFormFields[groupName][v].containerStyles}
                  >
                    <Field
                      {...newEnrollmentFormFields[groupName][v].componentProps}
                      onChange={function (event) {
                        onChangeHandler(event, type, name)
                      }}
                      loading={isDynamicField ? !isInitialized : false}
                      value={values[name] ?? ''}
                      name={name}
                      disabled={newEnrollmentFormFields[groupName][v].disabled}
                      helperText={touched[name] && errors[name]}
                      error={touched[name] && errors[name]}
                      onBlur={handleBlur}
                      onFocus={handleOnFocus}
                      {...(type === 'radio'
                        ? { active: radioValue[name] }
                        : {})}
                      {...(type === 'phone' && defaultCountryCode
                        ? { disableCountryCode: false }
                        : { disableCountryCode: true })}
                    />
                  </Grid>
                )
              })}
            </Grid>
            <Divider sx={{ paddingTop: '15px' }} />
          </Grid>
        ))}

        <Grid
          conatiner
          display={'flex'}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          paddingLeft={'12px'}
          paddingTop={'25px'}
          paddingBottom={'80px'}
        >
          <Button variant="outlined" color="teritiary" onClick={handleClose}>
            {translate('cancel')}
          </Button>
          <Button
            disabled={isSubmitDisabled}
            type="submit"
            variant="contained"
            startIcon={
              isLoading ? (
                <Loader size={20} margin={'0 0 5px 0'} disabled />
              ) : (
                <CheckIcon
                  iconColor={
                    !isSubmitDisabled ? IconColor.white : IconColor.gray9
                  }
                />
              )
            }
          >
            {translate('save')}
          </Button>
        </Grid>
      </Box>
    </>
  )
}

AddParticipantEditorContainer.propTypes = NewEnrollmentContainerType

export const AddParticipantEditor = AddParticipantEditorContainer

export default AddParticipantEditor
