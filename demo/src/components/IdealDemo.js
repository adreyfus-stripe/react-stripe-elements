import React, {Component} from 'react';
import {
  IdealBankElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

class _IdealBankForm extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createSource({
          type: 'ideal',
          amount: 1099,
          currency: 'eur',
          //You can specify a custom statement descriptor
          statement_descriptor: 'ORDER AT11990',
          owner: {
            name: ev.target.name.value,
          },
          redirect: {
            return_url: 'https://your-website.com/ideal-redirect',
          },
        })
        .then((payload) => console.log('[source]', payload));
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input name="name" type="text" placeholder="Jane Doe" required />
        </label>
        <label>
          iDEAL Bank
          <IdealBankElement
            className="IdealBankElement"
            style={{
              base: {
                fontSize: '16px',
                color: '#424770',
                letterSpacing: '0.025em',
                padding: '10px 14px',
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
    );
  }
}

const IdealForm = injectStripe(_IdealBankForm);

export class IdealDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
        <Elements>
          <IdealForm />
        </Elements>
      </StripeProvider>
    );
  }
}
