import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
  render() {
    return <StripeCheckout
      amount={500}
      token={tok => this.props.handleToken(tok)} // callback for when the token is received, e.g. onToken
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
      name="Emaily Credits"
      description="$5 for 5 email survey credits">
      <button className="btn">Add Credits</button>
    </StripeCheckout>
  }
}

export default connect(null, actions)(Payments);
