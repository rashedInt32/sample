import React from 'react'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/src/routes'
import useNewEnrollment from './useNewEnrollment'
import addParticipantWidgets from './newEnrollmentWidgets'

export const withNewEnrollment = (Component) => {
  return function WrappedComponent(props) {
    const { result, isSuccess, refetch, isFetching } = useNewEnrollment()
    const navigate = useNavigate()

    const { renderTitleWidget, renderFormWidget } = addParticipantWidgets

    const handleBackToParticipants = () => navigate(ROUTES.participants)

    const renderTitle = (titleProps = {}) => renderTitleWidget(titleProps)

    const renderForm = (formProps = {}) =>
      renderFormWidget(formProps, {
        result,
        isSuccess,
        refetch,
        isFetching,
      })

    const componentProps = {
      renderTitle,
      renderForm,
      handleBackToParticipants,
      ...props,
    }
    return <Component {...componentProps} />
  }
}

export default withNewEnrollment
