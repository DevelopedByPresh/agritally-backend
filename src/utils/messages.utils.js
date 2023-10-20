export const messages = {
  AUTH: {
    SIGNUP_ALREADY_EXISTS: 'Email already exists',
    SIGNUP_SUCCESS: 'Registration Successful',
    LOGIN_FAILURE: 'Invalid Credentials',
    LOGIN_SUCCESS: 'Login Successful',
    INVALID_TOKEN: 'Invalid Token Provided',
    LOGOUT_SUCCESS: 'Logged Out Successfully',
  },


  CART: {
    ADDED_ITEM: 'Item added to cart successfully',
    EMPTIED_CART: 'Cart Emptied Successfully',
    REMOVED_ITEM: 'Item removed from cart successfully',
  },

  COMMON: {
    fn: {
      CREATED: (resource) => `${resource} Created Successfully`,
      DELETED: (resource) => `${resource} Deleted Successfully`,
      FETCHED: (resource) => `${resource} Fetched Successfully`,
      UPDATED: (resource) => `${resource} Updated Successfully`,
    },
  },

  EXCEPTIONS: {
    DUPLICATE: 'Duplicate Error Occurred',
    UNAUTHORIZED_ACCESS: 'You do not have sufficient permissions to perform this action',
    VALIDATION: 'One or more validation errors occurred',
    fn: {
      NOT_FOUND: (resource) => `${resource} Not Found`,
    },
  },


  // USER: {
  //   CREATED: 'User created successfully',
  //   FETCH_ALL: 'Fetched all users',
  //   NOT_FOUND: 'No user found with the given id',
  //   INCORRECT_PASSWORD: 'Password is incorrect',
  //   PASSWORD_CHANGED: 'Password Changed Successfully',
  // },
};
