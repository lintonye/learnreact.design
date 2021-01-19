import * as React from 'react'
import { Text, Box, Button, Input } from './index'

type Props = {
  onSubmitError: (string) => void
  onSubmitSuccess: () => void
  formId: string
  subscribeButtonTitle?: string
  successMessage?: string
}

type CustomField = {
  id: string
  title: string
}

type DesignProps = {
  onSubmit: (any) => void
  onValidateEmail: (any) => void
  submissionResult: string
  loading: boolean
  emailEmpty: boolean
  firstName?: boolean
  subscribeButtonTitle?: string
  customFields?: CustomField[]
} & Props

export function ConvertKitFormDesign(props: DesignProps) {
  const {
    formId,
    submissionResult,
    loading,
    emailEmpty,
    subscribeButtonTitle,
    successMessage,
    onSubmit,
    onValidateEmail,
    firstName,
    customFields, //Note: this doesn't work!
    ...rest
  } = props
  const formRef = React.useRef()
  if (submissionResult === 'success')
    return (
      <Text textVariant="body" color="success" {...rest}>
        {successMessage}
      </Text>
    )

  return (
    <Box maxWidth={600} {...rest}>
      <form
        id="ck_subscribe_form"
        action={`https://app.convertkit.com/landing_pages/${formId}/subscribe`}
        data-remote="true"
        ref={formRef}
        // onSubmit={onSubmit}
      >
        {submissionResult === 'error' && (
          <Text textVariant="small" color="error" m={1}>
            Operation failed. Check your network connection.
          </Text>
        )}
        <input
          type="hidden"
          value='{"form_style":"naked"}'
          id="ck_form_options"
        />
        <input type="hidden" name="id" value={formId} id="landing_page_id" />
        <Box
          layout="grid"
          gridTemplateColumns={
            firstName ? ['auto', '100px 200px 150px'] : ['auto', '200px 150px']
          }
          justifyItems="stretch"
          gridColumnGap={1}
          gridRowGap={1}
        >
          {firstName && (
            <Input
              id="ck_firstNameField"
              name="first_name"
              type="text"
              disabled={loading}
              placeholder="First name"
            />
          )}
          <Input
            id="ck_emailField"
            name="email"
            type="email"
            disabled={loading}
            placeholder="Email address"
            onChange={onValidateEmail}
            required
          />
          {customFields &&
            customFields.map((cf) => (
              <Input
                key={`ck_${cf.id}`}
                id={`ck_${cf.id}`}
                name={cf.id}
                type="text"
                disabled={loading}
                placeholder={cf.title}
              />
            ))}

          <Button
            disabled={loading || emailEmpty}
            id="ck_subscribe_button"
            variant="small"
            onClick={() => onSubmit && onSubmit(formRef.current)}
          >
            {loading ? 'Working...' : subscribeButtonTitle}
          </Button>
        </Box>
      </form>
    </Box>
  )
}

ConvertKitFormDesign.defaultProps = {
  subscribeButtonTitle: 'Subscribe',
  successMessage: 'Success! Check your inbox.',
}

// NOTE: This only works with old version of convertKit forms
export default class ConvertKitForm extends React.Component<Props> {
  state = {
    loading: false,
    submissionResult: 'not-yet',
    emailEmpty: true,
  }
  reportError = (e) => {
    const { onSubmitError } = this.props
    console.error(e)
    this.setState({ submissionResult: 'error' })
    onSubmitError && onSubmitError(encodeURI)
  }
  reportSuccess = () => {
    const { onSubmitSuccess } = this.props
    this.setState({ submissionResult: 'success' })
    onSubmitSuccess && onSubmitSuccess()
  }
  submitForm = async (form) => {
    // e.preventDefault();
    const data = new FormData(form)
    // console.log(data, form.action, "email", data.get("email"));
    const url = form.action
    try {
      this.setState({ loading: true })
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      })
      // console.log(url, response);
      if (response.status !== 200) {
        this.reportError(response.status)
      } else {
        this.reportSuccess()
      }
    } catch (e) {
      this.reportError(e)
    } finally {
      this.setState({ loading: false })
    }
  }
  validateEmail = (e) => {
    this.setState({ emailEmpty: e.target.value === '' })
  }
  render() {
    const { loading, emailEmpty, submissionResult } = this.state
    return (
      <ConvertKitFormDesign
        {...this.props}
        loading={loading}
        emailEmpty={emailEmpty}
        submissionResult={submissionResult}
        onSubmit={this.submitForm}
        onValidateEmail={this.validateEmail}
      />
    )
  }
}
