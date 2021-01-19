import * as React from 'react'
import AllStudentWorks from '@/components/courses/react-framer/AllStudentWorks'
import Footer from '@/components/courses/react-framer/Footer'
import { Layout, Header } from '@/components/legacy-design-system'

export default function StudentWorksPage() {
  return (
    <Layout footer={false} theme="spaceLight">
      <Header />
      <AllStudentWorks />
      <Footer />
    </Layout>
  )
}
