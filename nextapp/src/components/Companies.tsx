import * as React from 'react'

export default function Companies() {
  const companies = [
    'facebook',
    'google',
    'amazon',
    // "microsoft",
    'twitter',
    'uber',
    'IDEO',
    // "oracle",
    // "verizon",
    // "atlassian"
    // "braintree"
  ]
  return (
    <div className="flex flex-wrap items-center justify-center">
      {companies.map((company) => (
        <img
          src={require(`@/assets/company-logos/${company}.png`).default}
          key={company}
          className="mx-8 my-4"
        />
      ))}
    </div>
  )
}
