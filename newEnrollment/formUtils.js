import React from 'react'
import { InputAdornment } from '@mui/material'
import theme from '@ihp-smp/dls/src/theme'
import { TextField } from '@ihp-smp/dls/src/components/textfield'
import { CheckboxList as CustomCheckbox } from '@ihp-smp/dls/src/components/checkboxlist'
import { PhoneField } from '@ihp-smp/dls/src/components/phonefield'
import { CheckIcon, EnvelopIcon, HomeIcon } from '@ihp-smp/dls/src/icons'
import { IconColor, IconSize } from '@ihp-smp/dls/src/types'
import { DatePicker } from '@ihp-smp/dls/src/components/datepicker'
import { Dropdown } from '@ihp-smp/dls/src/components/dropdown'
import { dlsColor } from '@ihp-smp/dls/src/theme/theme'
import dayjs from 'dayjs'
import RadioInput from '@/src/components/RadioInput'
import MultiSelect from '@/src/components/MultiSelect'

const containerStyles = (width, padding = '0px') => ({
  display: 'flex',
  direction: 'column',
  width: width,
  padding: `0 ${padding} 0 0`,
  marginBottom: '10px',
})

const dropDownComponentProps = (options, placeholder, required = true) => ({
  options: options,
  placeholder: placeholder,
  required: required,
})

const fieldLabelNameType = (label, name, type) => ({
  label,
  name,
  type,
})

const labelStyles = {
  position: 'relative',
  transform: 'none',
}

const sx = {
  background: dlsColor('white'),
  margin: '10px 0 0',
}

const StyledDropdown = ({ ...rest }) => (
  <Dropdown
    showPlaceholder
    size="small"
    formStyles={{ m: '10px 0px' }}
    labelStyles={{
      transform: 'none',
      position: 'relative',
      marginBottom: '10px',
    }}
    inputStyles={{
      m: '0px 0px',
      p: '3px 0px',
      background: theme.paletteColors.primary.white,
    }}
    optionStyles={{ fontSize: '15px' }}
    helperStyles={{ m: '0px 0px' }}
    {...rest}
  />
)

const newEnrollmentFormFields = {
  Name: {
    firstName: {
      component: TextField,
      containerStyles: containerStyles('33.33%', '20px'),
      componentProps: {
        ...fieldLabelNameType('First name', 'firstName', 'text'),
        required: true,
        labelStyles,
        InputProps: {
          placeholder: 'Enter first name',
          margin: '0px',
        },
        sx,
      },
    },

    middleName: {
      component: TextField,
      containerStyles: containerStyles('33.33%', '20px'),
      componentProps: {
        ...fieldLabelNameType('Middle name', 'middleName', 'text'),
        labelStyles,
        InputProps: {
          placeholder: 'Enter middle name',
        },
        sx,
      },
    },

    lastName: {
      component: TextField,
      containerStyles: containerStyles('33.33%'),
      componentProps: {
        ...fieldLabelNameType('Last name', 'lastName', 'text'),
        required: true,
        labelStyles,
        InputProps: {
          placeholder: 'Enter last name',
        },
        sx,
      },
    },

    noMiddleName: {
      component: CustomCheckbox,
      componentProps: {
        items: [
          {
            id: 10,
            label: 'I do not have a middle name',
            value: 'I do not have a middle name',
            state: 'inactive',
            type: 'checkbox',
            isVisible: true,
          },
        ],
        name: 'noMiddleName',
        type: 'checkbox',
        iconSize: IconSize.medium,
        sx: {
          marginTop: '0',
          marginBottom: '0',
        },
      },

      containerStyles: {
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        paddingRight: '0px',
        paddingLeft: '0px',
        marginBottom: '10px',
      },
    },

    email: {
      component: TextField,
      containerStyles: containerStyles('100%'),
      componentProps: {
        ...fieldLabelNameType('Email', 'email', 'text'),
        required: true,
        labelStyles,
        InputProps: {
          placeholder: 'Enter email',
          endAdornment: (
            <InputAdornment position="end">
              <EnvelopIcon
                iconColor={IconColor.gray25}
                iconSize={IconSize.medium}
              />
            </InputAdornment>
          ),
        },
        sx,
      },
    },

    phone: {
      component: PhoneField,
      containerStyles: containerStyles('100%'),
      componentProps: {
        ...fieldLabelNameType('Mobile phone number', 'phone', 'phone'),
        placeholder: 'Enter phone number',
        required: true,
        labelStyles,
        sx: {
          ...sx,
          '& .MuiInputAdornment-root': {
            display: 'none',
          },
          '& input': {
            paddingLeft: '0px',
            marginLeft: '-2px',
          },
        },
      },
    },
  },

  'Birth Information': {
    dateOfBirth: {
      component: DatePicker,
      containerStyles: containerStyles('50%', '20px'),
      componentProps: {
        ...fieldLabelNameType('Date of birth', 'dateOfBirth', 'date'),
        formLabelStyles: labelStyles,
        formLabelfontColor: dlsColor('darkGray1'),
        isFormlabel: true,
        required: true,
        maxDate: dayjs().subtract(1, 'day'),
        helperText: 'Date of birth is required',
        placeholder: 'Enter birthdate',
        datePickerStyles: {
          background: theme.paletteColors.primary.white,
        },
        sx: {
          ...sx,
          margin: '14px 0 0 !important',
        },
      },
    },

    sexAtBirth: {
      component: StyledDropdown,
      containerStyles: {
        ...containerStyles('50%'),
        marginTop: '3px',
      },
      componentProps: {
        ...dropDownComponentProps([], 'Select sex'),
        ...fieldLabelNameType('Sex at birth', 'sexAtBirth', 'select'),
      },
    },

    race: {
      component: MultiSelect,
      label: 'Race',
      name: 'race',
      containerStyles: containerStyles('100%', '10px'),
      componentProps: {
        ...fieldLabelNameType('Race', 'race', 'checkbox'),
        items: [],
        iconSize: IconSize.extraMedium - 6,
        iconColor: IconColor.deepBlue70,
        required: true,
        type: 'checkbox',
      },
    },

    ethnicity: {
      component: StyledDropdown,
      containerStyles: containerStyles('100%'),
      componentProps: {
        ...dropDownComponentProps([], 'Select ethnicity'),
        ...fieldLabelNameType('Ethnicity', 'ethnicity', 'select'),
      },
    },
  },

  Address: {
    streetAddress: {
      component: TextField,
      containerStyles: containerStyles('100%'),
      componentProps: {
        ...fieldLabelNameType('Street address', 'street', 'text'),
        labelStyles,
        InputProps: {
          placeholder: 'Enter address',
          endAdornment: (
            <InputAdornment position="end">
              <HomeIcon
                iconColor={IconColor.gray25}
                iconSize={IconSize.medium}
              />
            </InputAdornment>
          ),
        },
        sx,
      },
    },

    city: {
      component: TextField,
      containerStyles: containerStyles('50%', '20px'),
      componentProps: {
        ...fieldLabelNameType('City', 'city', 'text'),
        labelStyles,
        InputProps: {
          placeholder: 'Enter city',
          sx: {
            height: '45px',
          },
        },
        sx,
      },
    },

    country: {
      component: StyledDropdown,
      containerStyles: containerStyles('50%'),
      componentProps: {
        ...fieldLabelNameType('Country', 'country', 'select'),
        ...dropDownComponentProps([], 'Select country'),
      },
    },
    state: {
      component: StyledDropdown,
      containerStyles: containerStyles('50%', '20px'),
      componentProps: {
        ...fieldLabelNameType('State or province', 'state', 'select'),
        ...dropDownComponentProps([], 'Select state or province'),
      },
    },

    zipCode: {
      component: TextField,
      containerStyles: containerStyles('50%'),
      componentProps: {
        ...fieldLabelNameType('ZIP code', 'zipCode', 'text'),
        labelStyles,
        required: true,
        InputProps: {
          placeholder: 'Enter zip code',
          sx: {
            height: '45px',
          },
        },
        sx,
      },
    },
  },
  'Study Information': {
    site: {
      component: StyledDropdown,
      containerStyles: containerStyles('100%'),
      componentProps: {
        ...fieldLabelNameType('Site', 'siteId', 'select'),
        ...dropDownComponentProps([], 'Select a site'),
      },
    },

    enrollmentDate: {
      component: DatePicker,
      containerStyles: containerStyles('100%'),
      componentProps: {
        ...fieldLabelNameType('Enrollment date', 'enrollmentDate', 'date'),
        formLabelStyles: labelStyles,
        formLabelfontColor: dlsColor('darkGray1'),
        isFormlabel: true,
        required: true,
        placeholder: 'Enter date',
        maxDate: dayjs(),
        datePickerStyles: {
          background: theme.paletteColors.primary.white,
        },
        sx: {
          ...sx,
          margin: '10px 0 0 !important',
        },
      },
    },

    consentStatus: {
      component: RadioInput,
      containerStyles: containerStyles('100%'),
      componentProps: {
        ...fieldLabelNameType(
          'Consent obtained from participant?',
          'consentStatus',
          'radio'
        ),
        formLabelStyles: {
          ...labelStyles,
          fontSize: '14px',
          color: dlsColor('darkGray1'),
          fontFamily: 'Inter',
        },
        variant: 'standard',
        required: true,
        options: [
          {
            label: 'Yes',
            value: 'yes',
          },
          {
            label: 'No',
            value: 'no',
          },
        ],
        icon: (
          <CheckIcon iconColor={dlsColor('white')} iconSize={IconSize.medium} />
        ),
        checkedIcon: (
          <CheckIcon
            iconColor={dlsColor('primary')}
            iconSize={IconSize.medium}
          />
        ),
        disableRipple: true,
        sx: {
          marginTop: '5px',
        },
      },
    },
  },
}

export default newEnrollmentFormFields
