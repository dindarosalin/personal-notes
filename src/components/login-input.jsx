import React from 'react'
import PropTypes from 'prop-types'

class LoginInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }

    this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this)
    this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onEmailChangeHandler(event) {
    this.setState(() => {
      return {
        email: event.target.value
      }
    })
  }

  onPasswordChangeHandler(event) {
    this.setState(() => {
      return {
        password: event.target.value
      }
    })
  }

  onSubmitHandler(event) {
    event.preventDefault()

    this.props.login({
      email: this.state.email,
      password: this.state.password,
    })
  }

  render() {
    return (
      <div className='container'>
        <form onSubmit={this.onSubmitHandler} className='login-input'>
          <div className='mb-3'>
            <label className="form-label">Email address</label>
            <input type='email' className='form-control' id='exampleInputEmail1' value={this.state.email} onChange={this.onEmailChangeHandler} />
          </div>
          <div className='mb-3'>
          <label className="form-label">Password</label>
            <input type='password' className='form-control' id='exampleInputPassword1' value={this.state.password} onChange={this.onPasswordChangeHandler} />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </form>
      </div>
    )
  }
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
}

export default LoginInput