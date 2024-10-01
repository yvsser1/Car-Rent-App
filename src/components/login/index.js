import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut, signUp, resetPassword } from '../../store/actions/authAction'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

import './index.scss'
class Login extends Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    accountType: 'Company',
    companyName: '',
    userAddress: '',
    resetMessage: '' // New state property for success message
  }

  componentWillMount() {
    console.log('a', this.props.auth.uid)

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signIn(this.state)
  }
  handleSignUp = (e) => {
    e.preventDefault()
    this.props.signUp(this.state)
  }
  handlePasswordReset = (e) => {
    e.preventDefault();
    this.props.resetPassword(this.state.email)
      .then(() => {
        this.setState({ resetMessage: 'Password reset link sent successfully!' });
      })
      .catch((err) => {
        this.setState({ resetMessage: 'Wrong Mail! Error sending password reset link.' });
      });
  }
  render() {
    console.log(this.props.auth)
    if (this.props.auth.uid) {
      return <Redirect to='/' />
    }
    let company = null
    if (this.state.accountType === 'Company') {
      company = <Form.Group>
        <Form.Label>Company Name</Form.Label>
        <Form.Control type="text" name='companyName' value={this.state.companyName} onChange={this.handleChange} placeholder='Company Name' />
      </Form.Group>
    }
    return (
      <div>
        <Container className='login-page'>
          <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
            <Tab eventKey="login" title="Login">
              {/* <Sonnet /> */}

              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' value={this.state.userEmail} onChange={this.handleChange} placeholder='Your email' />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name='password' value={this.state.password} onChange={this.handleChange} placeholder='Your password' />
                </Form.Group>
                <Button type='submit' variant="primary">Login</Button>
              </Form>
            </Tab>
            <Tab eventKey="register" title="Register">
              <Form onSubmit={this.handleSignUp}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Account Type</Form.Label>
                  <Form.Control as="select" onChange={this.handleChange} name='accountType' value={this.state.accountType}>
                    <option>Company</option>
                    <option>Personal</option>
                  </Form.Control>
                </Form.Group>
                {company}
                <Form.Group controlId="formBasicfirstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" name='firstName' value={this.state.firstName} onChange={this.handleChange} placeholder='Your first name' />
                </Form.Group>
                <Form.Group controlId="formBasiclastname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" name='lastName' value={this.state.lastName} onChange={this.handleChange} placeholder='Your last name' />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' value={this.state.userEmail} onChange={this.handleChange} placeholder='Your email' />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name='password' value={this.state.password} onChange={this.handleChange} placeholder='Your password' />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={this.state.phoneNumber}
                    className='form-control'
                    onChange={phoneNumber => this.setState({ phoneNumber })} />
                </Form.Group>
                <Form.Group controlId="formBasicfirstname">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name='userAddress' value={this.state.userAddress} onChange={this.handleChange} placeholder='Address' />
                </Form.Group>
                <Button type='submit' variant="primary">Register</Button>
                {this.props.authError ? <p>{this.props.authError}</p> : null}
              </Form>
            </Tab>
            <Tab eventKey="reset" title="Reset Password">
              <Form onSubmit={this.handlePasswordReset}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name='email' value={this.state.email} onChange={this.handleChange} placeholder='Your email' />
                </Form.Group>
                <Button type='submit' variant="primary">Reset Password</Button>
              </Form>
              {this.state.resetMessage && <p>{this.state.resetMessage}</p>} {/* Conditionally render success message */}
            </Tab>
          </Tabs>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
    signUp: (creds) => dispatch(signUp(creds)),
    signOut: () => dispatch(signOut()),
    resetPassword: (email) => dispatch(resetPassword(email))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)