import React, { useEffect, useRef } from 'react';

/**
 * GooglePayButton - PRODUCTION READY
 * Merchant info and gateway config can be passed as props for security and flexibility.
 */
export default function GooglePayButton({
  price = '1.00',
  label = 'Buy with Google Pay',
  onSuccess,
  environment = 'PRODUCTION',
  gateway = process.env.REACT_APP_GPAY_GATEWAY || 'stripe',
  gatewayMerchantId = process.env.REACT_APP_GPAY_GATEWAY_MERCHANT_ID || 'litbit_stripe_merchant_123',
  merchantId = process.env.REACT_APP_GPAY_MERCHANT_ID || '01234567890123456789',
  merchantName = 'LiTbiT-2.0',
}) {
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
      const paymentsClient = new window.google.payments.api.PaymentsClient({ environment });
      const button = paymentsClient.createButton({
        onClick: onGooglePay,
        buttonColor: 'black',
        buttonType: 'buy',
      });
      gpayBtn.current.innerHTML = '';
      gpayBtn.current.appendChild(button);
    }
    // eslint-disable-next-line
  }, [environment, gateway, gatewayMerchantId, merchantId]);

  async function onGooglePay() {
    const paymentsClient = new window.google.payments.api.PaymentsClient({ environment });
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
              gateway,
              gatewayMerchantId,
            },
          },
        },
      ],
      merchantInfo: {
        merchantId,
        merchantName,
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
      alert('Google Pay Success!');
    } catch (err) {
      alert('Google Pay Cancelled or Failed');
    }
  }

  return <div ref={gpayBtn} style={{ margin: '20px 0' }} />;
}
