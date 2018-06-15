import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

class _CardForm extends Component {
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
      <div className="CardDemo">
        <form onSubmit={this.handleSubmit}>
          <label>
            Card details
            <CardElement
              style={{
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
              }}
            />
          </label>
          <button>Pay</button>
        </form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

export class CardDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
        <Elements>
          <CardForm />
        </Elements>
      </StripeProvider>
    );
  }
}
