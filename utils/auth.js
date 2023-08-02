// Define a middleware function to check if the user is authenticated.
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect to the login page.
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    // If the user is logged in, proceed with the next middleware or route handler.
    next();
  }
};

// Export the withAuth middleware.
module.exports = withAuth;
