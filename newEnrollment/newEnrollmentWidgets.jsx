import React from 'react'
import Typography from '@mui/material/Typography'
import { ChevronLeftIcon } from '@ihp-smp/dls/src/icons'
import { IconColor, IconSize } from '@ihp-smp/dls/src/types'
import AddParticipantEditor from './NewEnrollmentEditor'

export const newEnrollmentWidgets = {
  renderTitleWidget: (titleProps) => {
    return (
      <Typography
        data-testid="title"
        variant="h1"
        color="primary.gray10"
        display="flex"
        alignItems="center"
        gap="10px"
        sx={{
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        <ChevronLeftIcon
          iconSize={IconSize.medium}
          iconColor={IconColor.gray10}
        />
        {titleProps?.title}
      </Typography>
    )
  },
  renderFormWidget: (
    formProps,
    { result, isSuccess, refetch, isFetching } = {}
  ) => {
    return (
      <AddParticipantEditor
        isFetching={isFetching}
        result={result}
        isSuccess={isSuccess}
        refetch={refetch}
      />
    )
  },
}

export default newEnrollmentWidgets
// [SMP TODO]: Should mimic the behavior of other renderers (users, participants) ...
