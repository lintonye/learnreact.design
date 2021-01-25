import React from 'react'
import { ConvertKitFormDesign } from '../components/design-system/ConvertKitForm'

export default {
  title: 'ConvertKitForm',
}

export function Default() {
  return (
    <div className="space-y-4">
      <ConvertKitFormDesign
        firstName
        subscribeButtonTitle="Notify me!"
        formId="123"
      />
      <ConvertKitFormDesign loading formId="123" />
      <ConvertKitFormDesign emailEmpty formId="123" />
      <ConvertKitFormDesign submissionResult="success" formId="123" />
      <ConvertKitFormDesign submissionResult="error" formId="123" />
    </div>
  )
}
