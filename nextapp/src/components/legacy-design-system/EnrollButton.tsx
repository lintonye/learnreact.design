import * as React from 'react'
import { Button, Link, Box } from '.'
import { Location } from '@reach/router'

export default function EnrollButton(props) {
  return (
    <Location>
      {({ location: { pathname } }) => {
        const enrollLink = `${pathname}/#enroll`
        return (
          <Box {...props}>
            <Link to={enrollLink} underline={false}>
              <Button text="ENROLL" variant="small" width={200} m={0}>
                ENROLL
              </Button>
            </Link>
          </Box>
        )
      }}
    </Location>
  )
}
