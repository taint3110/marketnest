import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip
} from '@chakra-ui/react'
import Icon from 'components/Icon'
import { EMAIL_PATTERN, NAME_WITH_NUMBER_PATTERN } from 'constants/common'
import get from 'lodash/get'
import startCase from 'lodash/startCase'
import { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export interface IFormItemProps {
  name: string
  label?: string
  type?: string
  placeholder?: string
  isRequired?: boolean
  children?: ReactNode
  helperText?: string
  readonly?: boolean
  disabled?: boolean
  hideLabel?: boolean
  className?: string
  errorClassName?: string
  min?: number
  width?: string
  height?: string
  inputColor?: string
  autoComplete?: string
  hideErrorMessage?: boolean
}
const FormItem = (props: IFormItemProps) => {
  const {
    name,
    label,
    type = 'text',
    placeholder,
    isRequired = true,
    children,
    helperText,
    readonly,
    disabled,
    hideLabel,
    className,
    errorClassName,
    inputColor,
    min,
    width,
    height,
    autoComplete,
    hideErrorMessage
  } = props
  const {
    register,
    formState: { errors },
    control
  } = useFormContext()
  let pattern: { value: RegExp; message: string } | undefined
  switch (name) {
    case 'firstName':
    case 'lastName':
      //*INFO: validate name, allow only letters, spaces, special characters like - ' and not allow icon
      pattern = {
        value: NAME_WITH_NUMBER_PATTERN,
        message: 'Please enter a valid name'
      }
      break
    case 'email':
      pattern = { value: EMAIL_PATTERN, message: 'Please enter a valid email' }
      break
    case 'dateOfBirth':
      //*INFO: validate (MM/DD/YYYY), with a year between 1900 and 2099
      pattern = {
        value: /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/,
        message: 'Please enter a valid date'
      }
      break
    default:
      pattern = undefined
  }

  const disabledProps = disabled
    ? {
        disabled: true,
        background: 'gray.100',
        opacity: '0.7 !important',
        color: 'gray.400',
        variant: 'filled'
      }
    : {}

  return (
    <FormControl
      isInvalid={!!get(errors, name, false)}
      alignSelf={!label || hideLabel ? 'flex-end' : undefined}
      className={className}
      width={width}
    >
      <HStack spacing="14px" maxHeight={6} marginBottom={label ? 2 : 0} position="relative">
        {label && !hideLabel && (
          <FormLabel color="gray.700" lineHeight={6} marginBottom={0} marginInlineEnd={0} minWidth="200px">
            {label}
          </FormLabel>
        )}
        {helperText && (
          <Tooltip label={helperText} hasArrow placement="right" background="gray.900" color="white" fontSize="sm">
            <Box textAlign="center" height="20px">
              <Icon iconName="information_line_blue.svg" size={20} />
            </Box>
          </Tooltip>
        )}
      </HStack>
      {children ? (
        children
      ) : type !== 'number' ? (
        <Input
          height={height}
          type={type}
          autoComplete={autoComplete ?? name}
          placeholder={placeholder}
          isReadOnly={readonly}
          color={inputColor}
          {...disabledProps}
          {...register(name, {
            required: isRequired ? `${label ?? startCase(name)} is required` : false,
            pattern
          })}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput focusBorderColor="teal.500" {...field} min={min}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
        />
      )}
      {!hideErrorMessage && (
        <FormErrorMessage className={errorClassName}>{String(get(errors, `${name}.message`, ''))}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormItem
