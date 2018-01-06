import React from 'react';
import Cover from './Cover';
import Motivation from './Motivation';
import WhatsIncluded from './WhatsIncluded';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import ResultSummary from './ResultSummary';
import Bio from './Bio';
import Faq from './Faq';

export default class SalesPage extends React.Component {
  render() {
    return (
      <div>
        <Cover />
        <Motivation />
        <WhatsIncluded />
        <Testimonials />
        <Pricing />
        <ResultSummary />
        <Bio />
        <Faq />
      </div>
    );
  }
}