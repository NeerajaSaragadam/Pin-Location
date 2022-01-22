import { useOktaAuth } from '@okta/okta-react';
import React from 'react';

const OktaSignIn = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({originalUri: '/Dashboard'});

  if( !authState ) {
    return (
      <div>Loading authentication...</div>
    );
  } else if( !authState.isAuthenticated ) {
    return (
      <div>
        <a onClick={login}>Login</a>
      </div>
    );
  } else {
      return "You authenticated up in here"
  }
};
export default OktaSignIn;