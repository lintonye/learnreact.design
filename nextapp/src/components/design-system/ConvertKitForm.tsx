import { jsx, css } from '@emotion/core'
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
  emailValid?: boolean
  firstName?: boolean
  subscribeButtonTitle?: string
  customFields?: CustomField[]
} & Props

export function ConvertKitFormDesign(props: DesignProps) {
  const {
    formId,
    submissionResult,
    loading,
    emailValid,
    subscribeButtonTitle,
    successMessage,
    onSubmit,
    // onValidateEmail,
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
        action={`https://api.convertkit.com/v3/forms/${formId}/subscribe`}
        data-remote="true"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          typeof onSubmit === 'function' && onSubmit(formRef.current)
        }}
      >
        {submissionResult === 'error' && (
          <p className="text-red-500 text-sm my-1">
            Operation failed. Check your network connection.
          </p>
        )}
        {!emailValid && (
          <p className="text-red-500 text-sm my-1">Invalid email address</p>
        )}
        <div
          className="flex flex-wrap"
          css={css`
            grid-template-columns: auto;
          `}
          // css={{
          //   gridTemplateColumns: firstName
          //     ? ['auto', '100px 200px 150px']
          //     : ['auto', '200px 150px'],
          // }}
        >
          {firstName && (
            <Input
              name="first_name"
              type="text"
              disabled={loading}
              placeholder="First name"
            />
          )}
          <Input
            name="email"
            type="email"
            disabled={loading}
            placeholder="Email address"
            // onChange={onValidateEmail}
            className="flex-1 py-1"
            required
          />
          {/* {customFields &&
            customFields.map((cf) => (
              <Input
                key={`ck_${cf.id}`}
                id={`ck_${cf.id}`}
                name={cf.id}
                type="text"
                disabled={loading}
                placeholder={cf.title}
              />
            ))} */}

          <Button
            disabled={loading}
            variant="primary"
            className="flex-1"
            // variant="small"
            // onClick={() => onSubmit && onSubmit(formRef.current)}
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
  successMessage: 'Almost done! Now check your email!',
}

function isValidEmail(email: string | File | null) {
  const pattern = /\S+@\S+\.\S+/
  return typeof email === 'string' && email.match(pattern)
}

// NOTE: This only works with old version of convertKit forms
export class ConvertKitForm extends React.Component<Props> {
  state = {
    loading: false,
    submissionResult: 'not-yet',
    emailValid: true,
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
    if (isValidEmail(data.get('email'))) {
      // console.log(data, form.action, "email", data.get("email"));
      const key = '_dUwkqZay7-VqiW0HWaWkQ'
      const url = form.action
      const params = {
        api_key: key,
        email: data.get('email'),
        first_name: data.get('first_email'),
      }
      try {
        this.setState({ loading: true })
        const response = await fetch(url, {
          method: 'POST',
          headers: [['Content-Type', 'application/json; charset=utf-8']],
          body: JSON.stringify(params),
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
    } else {
      this.setState({ emailValid: false })
    }
  }
  validateEmail = (e: any) => {
    this.setState({ emailValid: e.target.value === '' })
  }
  render() {
    const { loading, emailValid, submissionResult } = this.state
    return (
      <ConvertKitFormDesign
        {...this.props}
        loading={loading}
        emailValid={emailValid}
        submissionResult={submissionResult}
        onSubmit={this.submitForm}
        // onValidateEmail={this.validateEmail}
      />
    )
  }
}
