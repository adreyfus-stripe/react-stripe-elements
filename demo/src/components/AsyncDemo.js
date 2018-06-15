import React, {Component} from 'react';
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

class _CardForm extends Component {
  handleReady = () => {
    console.log('[ready]');
  };
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
            {this.props.countdown > 0 ? (
              <span className="async-message">
                Asynchronously loading Stripe in {this.props.countdown}...
              </span>
            ) : (
              ''
            )}
            {this.props.stripe ? (
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
                onReady={this.handleReady}
              />
            ) : (
              <div className="StripeElement loading" />
            )}
          </label>
          <button disabled={!this.props.stripe}>Pay</button>
        </form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

export class AsyncDemo extends Component {
  constructor() {
    super();

    this.state = {
      stripe: null,
      countdown: 3,
    };
  }

  componentDidMount() {
    // componentDidMount only runs in a browser environment.
    // In addition to loading asynchronously, this code is safe to server-side render.

    //remove our existing Stripe script to keep the DOM clean
    document.getElementById('stripe-script').remove();
    // You can inject a script tag manually like this,
    // or you can use the 'async' attribute on the Stripe.js v3 <script> tag.
    const stripeJs = document.createElement('script');
    stripeJs.id = 'stripe-script';
    stripeJs.src = 'https://js.stripe.com/v3/';
    stripeJs.async = true;
    stripeJs.onload = () => {
      const countdown = setInterval(() => {
        this.setState({countdown: this.state.countdown - 1});
      }, 1000);
      // The setTimeout lets us pretend that Stripe.js took a long time to load
      // Take it out of your production code!
      setTimeout(() => {
        clearInterval(countdown);
        this.setState({
          stripe: window.Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh'),
        });
      }, 3000);
    };
    document.body && document.body.appendChild(stripeJs);
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <CardForm countdown={this.state.countdown} />
        </Elements>
      </StripeProvider>
    );
  }
}
