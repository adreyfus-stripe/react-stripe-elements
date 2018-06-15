import React, {Component} from 'react';
import {
  IbanElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

class _IbanForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe
        .createSource({
          type: 'sepa_debit',
          currency: 'eur',
          owner: {
            name: ev.target.name.value,
            email: ev.target.email.value,
          },
          mandate: {
            notification_method: 'email',
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
          Email
          <input
            name="email"
            type="email"
            placeholder="jane.doe@example.com"
            required
          />
        </label>
        <label>
          IBAN
          <IbanElement
            supportedCountries={['SEPA']}
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
    );
  }
}

const IbanForm = injectStripe(_IbanForm);

export class IbanDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
        <Elements>
          <IbanForm />
        </Elements>
      </StripeProvider>
    );
  }
}
