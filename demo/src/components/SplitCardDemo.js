import React, {Component} from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class _SplitCardForm extends Component {
  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createToken()
        .then((payload) => console.log('[token]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card number
          <CardNumberElement {...createOptions()} />
        </label>
        <label>
          Expiration date
          <CardExpiryElement {...createOptions()} />
        </label>
        <div className="split-form">
          <label>
            CVC
            <CardCVCElement {...createOptions()} />
          </label>
          <label>
            Postal code
            <PostalCodeElement {...createOptions()} />
          </label>
        </div>
        <button>Pay</button>
      </form>
    );
  }
}

const SplitCardForm = injectStripe(_SplitCardForm);

export class SplitCardDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
        <Elements>
          <SplitCardForm />
        </Elements>
      </StripeProvider>
    );
  }
}
