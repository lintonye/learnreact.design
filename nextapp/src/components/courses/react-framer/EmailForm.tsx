import * as React from 'react'
import { Box, Text, Video } from '@/components/legacy-design-system'
import ConvertKitForm from '@/components/legacy-design-system/ConvertKitForm'

export default function EmailForm(props) {
  return (
    <Box layout="flex" alignItems="center" flexDirection="column" {...props}>
      <Text my={4}>Join the waiting list:</Text>
      <ConvertKitForm formId="458672" subscribeButtonTitle="Notify me!" />
    </Box>
  )
}
