import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

class _CardForm extends Component {
  state = {
    errorMessage: '',
  };

  handleChange = ({error}) => {
    if (error) {
      this.setState({errorMessage: error.message});
    }
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(this.props.handleResult);
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="CardDemo">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Card details
            <CardElement
              onChange={this.handleChange}
              // We recommend defining these styles as a global object in your app 
              // to be reused across multiple Elements.
              style={{
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  fontFamily: 'Open Sans, sans-serif',
                  letterSpacing: '0.025em',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#c23d4b',
                },
              }}
            />
          </label>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
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
      <StripeProvider apiKey={this.props.stripePublicKey}>
        <Elements>
          <CardForm handleResult={this.props.handleResult} />
        </Elements>
      </StripeProvider>
    );
  }
}
