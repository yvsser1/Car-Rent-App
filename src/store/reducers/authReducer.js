const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: 'Login faild'
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authError: null
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success')
      return state
    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }
    case 'RESET_PASSWORD_SUCCESS':
      console.log('Password reset email sent');
      return {
        ...state,
        authError: null
      };
    case 'RESET_PASSWORD_ERROR':
      console.log('Password reset error', action.err);
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state
  }
}

export default authReducer