import React, {Component} from 'react';
import {
  injectStripe,
  PaymentRequestButtonElement,
  StripeProvider,
  Elements,
} from 'react-stripe-elements';

class _PaymentRequestForm extends Component {
  constructor(props) {
    super(props);

    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000,
      },
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then((result) => {
      this.setState({canMakePayment: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{
          // For more details on how to style the Payment Request Button, see:
          // https://stripe.com/docs/elements/payment-request-button#styling-the-element
          paymentRequestButton: {
            theme: 'light',
            height: '64px',
          },
        }}
      />
    ) : '';
  }
}

const PaymentRequestForm = injectStripe(_PaymentRequestForm);

export class PaymentRequestDemo extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
        <Elements>
          <PaymentRequestForm />
        </Elements>
      </StripeProvider>
    );
  }
}
