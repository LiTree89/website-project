import React, { useEffect, useRef } from 'react';

export default function GooglePayButton({ price = '1.00', label = 'Buy with Google Pay', onSuccess }) {
  const gpayBtn = useRef(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://pay.google.com/gp/p/js/pay.js';
      script.async = true;
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      renderButton();
    }
    function renderButton() {
      if (!window.google || !gpayBtn.current) return;
      const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });
      const button = paymentsClient.createButton({
        onClick: onGooglePay,
        buttonColor: 'black',
        buttonType: 'buy',
      });
      gpayBtn.current.innerHTML = '';
      gpayBtn.current.appendChild(button);
    }
    // eslint-disable-next-line
  }, []);

  async function onGooglePay() {
    const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });
    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example', // Replace with your gateway
              gatewayMerchantId: 'exampleMerchantId',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: '01234567890123456789', // Replace with your merchantId
        merchantName: 'LiTbiT-2.0',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPrice: price,
        currencyCode: 'USD',
        countryCode: 'US',
      },
    };
    try {
      const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);
      if (onSuccess) onSuccess(paymentData);
      alert('Google Pay Success! (Demo)');
    } catch (err) {
      alert('Google Pay Cancelled or Failed');
    }
  }

  return <div ref={gpayBtn} style={{ margin: '20px 0' }} />;
}
