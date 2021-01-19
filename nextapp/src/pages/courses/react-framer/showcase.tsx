import * as React from 'react'
import AllStudentWorks from '../../new-components/prototyping-course/AllStudentWorks'
import Footer from '../../new-components/prototyping-course/Footer'
import { Layout, Header } from '../../design-system'

export default function StudentWorksPage() {
  return (
    <Layout footer={false} theme="spaceLight">
      <Header />
      <AllStudentWorks />
      <Footer />
    </Layout>
  )
}
