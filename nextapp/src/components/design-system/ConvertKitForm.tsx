import { jsx } from '@emotion/react'
import * as React from 'react'
import { Button, Input } from './index'

type Props = {
  onSubmitError?: (e: string) => void
  onSubmitSuccess?: () => void
  formId: string
  subscribeButtonTitle?: string
  successMessage?: string
}

type CustomField = {
  id: string
  title: string
}

type DesignProps = {
  onSubmit?: (e: any) => void
  onValidateEmail?: (e: any) => void
  submissionResult?: string
  loading?: boolean
  emailEmpty?: boolean
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
  const formRef = React.useRef<HTMLFormElement>(null)
  if (submissionResult === 'success')
    return <p className="text-green-600">{successMessage}</p>

  return (
    <div className="">
      <form
        id="ck_subscribe_form"
        action={`https://app.convertkit.com/landing_pages/${formId}/subscribe`}
        data-remote="true"
        ref={formRef}
        // onSubmit={onSubmit}
      >
        {submissionResult === 'error' && (
          <p className="text-red-500 text-sm my-1">
            Operation failed. Check your network connection.
          </p>
        )}
        <input
          type="hidden"
          value='{"form_style":"naked"}'
          id="ck_form_options"
        />
        <input type="hidden" name="id" value={formId} id="landing_page_id" />

        <div
          className="flex"
          // css={{
          //   gridTemplateColumns: firstName
          //     ? ['auto', '100px 200px 150px']
          //     : ['auto', '200px 150px'],
          // }}
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
            // variant="small"
            onClick={() => onSubmit && onSubmit(formRef.current)}
          >
            {loading ? 'Working...' : subscribeButtonTitle}
          </Button>
        </div>
      </form>
    </div>
  )
}

ConvertKitFormDesign.defaultProps = {
  subscribeButtonTitle: 'Subscribe',
  successMessage: 'Success! Check your inbox.',
}

// NOTE: This only works with old version of convertKit forms
export class ConvertKitForm extends React.Component<Props> {
  state = {
    loading: false,
    submissionResult: 'not-yet',
    emailEmpty: true,
  }
  reportError = (e: string) => {
    const { onSubmitError } = this.props
    console.error(e)
    this.setState({ submissionResult: 'error' })
    onSubmitError && onSubmitError(e)
  }
  reportSuccess = () => {
    const { onSubmitSuccess } = this.props
    this.setState({ submissionResult: 'success' })
    onSubmitSuccess && onSubmitSuccess()
  }
  submitForm = async (form: any) => {
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
        this.reportError(response.statusText)
      } else {
        this.reportSuccess()
      }
    } catch (e) {
      this.reportError(e)
    } finally {
      this.setState({ loading: false })
    }
  }
  validateEmail = (e: any) => {
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
