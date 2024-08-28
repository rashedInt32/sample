import React from 'react'
import { expect, describe, it, vi } from 'vitest'
import { render, screen } from '@/src/utils/TestUtils'
import NewEnrollmentEditor from './NewEnrollmentEditor'

describe('<NewEnrollmentEditor />', () => {
  beforeEach(() => {
    render(<NewEnrollmentEditor />)

    vi.mock('formik', async () => {
      const actual = await vi.importActual('formik')
      return {
        ...actual,
        default: () => {
          return {
            values: {},
            handleSubmit: vi.fn(),
            errors: false,
            setFieldValue: vi.fn(),
          }
        },
      }
    })
  })

  it('should render NewEnrollmentEditor component', () => {
    const { container } = render(<NewEnrollmentEditor />)
    expect(container).toBeInTheDocument()
  })

  it('should render first name label', () => {
    expect(screen.getByText('First name')).toBeVisible()
  })

  it('should render middle name label', () => {
    expect(screen.getByText('Middle name (optional)')).toBeVisible()
  })

  it('should render last name label', () => {
    expect(screen.getByText('Last name')).toBeVisible()
  })

  it('should render email label', () => {
    expect(screen.getByText('Email')).toBeVisible()
  })

  it('should render no middle name checkbox', () => {
    const checkbox = screen.getByRole('checkbox', {
      name: 'I do not have a middle name',
    })
    expect(checkbox).not.toBeChecked()
  })

  it('should render phone number label', () => {
    expect(screen.getByText('Mobile phone number')).toBeVisible()
  })

  it('should render date of birth label', () => {
    expect(screen.getByText('Date of birth')).toBeVisible()
  })

  it('should render sex at birth label', () => {
    expect(screen.getByText('Sex at birth')).toBeVisible()
  })

  it('should render race label', () => {
    expect(screen.getByText('Race')).toBeVisible()
  })

  it('should render ethnicity label', () => {
    expect(screen.getByText('Ethnicity')).toBeVisible()
  })

  it('should render address label', () => {
    expect(screen.getByText('Street address (optional)')).toBeVisible()
  })

  it('should render city label', () => {
    expect(screen.getByText('City (optional)')).toBeVisible()
  })

  it('should render state or province label', () => {
    expect(screen.getByText('State or province')).toBeVisible()
  })

  it('should render country label', () => {
    expect(screen.getByText('Country')).toBeVisible()
  })

  it('should render zip code label', () => {
    expect(screen.getByText('ZIP code')).toBeVisible()
  })

  it('should render site label', () => {
    expect(screen.getByText('Site')).toBeVisible()
  })
  it('should render Enrollment date label', () => {
    expect(screen.getByText('Enrollment date')).toBeVisible()
  })

  it('should render Consent obtained from participant? label', () => {
    expect(screen.getByText('Consent obtained from participant?')).toBeVisible()
  })

  it('should render cancel button', () => {
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toBeInTheDocument()
  })

  it('should render save button', () => {
    const addUserButton = screen.getByRole('button', { name: 'Save' })
    expect(addUserButton).toBeInTheDocument()
  })
})
