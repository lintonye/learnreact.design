import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  div {
    padding: 10px;
  }
`;

const Header = () => (
  <HeaderDiv>
    <div>
      <Link to='/'>Home</Link>
    </div>
    <div>
      <Link to='/blog'>Blog</Link>
    </div>
    <div>
      <Link to='/about'>About</Link>
    </div>
  </HeaderDiv>
)

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    return (
      <div>
        <Header />
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
