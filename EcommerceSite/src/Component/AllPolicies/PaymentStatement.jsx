import React from "react";
import "./PaymentStatement.css";

const PaymentStatement = () => {
  return (
    <div className="payment-statement">
      <h2 className="heading">PAYMENT STATEMENT</h2>
      <h3 className="company-name">Ishum Designs Pvt. Ltd.</h3>

      <p className="description">
        At Ishum Designs Pvt. Ltd., we strive to provide a secure, seamless, and flexible
        payment experience for our customers. To ensure this, we offer multiple payment
        options and prioritize data security during all transactions.
      </p>

      <div className="section">
        <h4 className="subheading">Payment Gateway:</h4>
        <p>
          All online payments made on <strong>www.ishum.in</strong> are securely processed
          through <strong>Razorpay</strong>, a trusted and PCI DSS-compliant payment
          gateway. Razorpay supports a wide range of payment methods, including:
        </p>
        <ul className="list">
          <li>Credit & Debit Cards (Visa, Mastercard, Maestro, RuPay, etc.)</li>
          <li>Net Banking (all major banks)</li>
          <li>UPI (Google Pay, PhonePe, etc.)</li>
          <li>Wallets and Buy Now, Pay Later (BNPL) options</li>
        </ul>
        <p>
          At no point do we store your card or payment credentials on our servers. Your
          payment data is encrypted and processed directly by Razorpay’s secure
          infrastructure.
        </p>
      </div>

      <div className="section">
        <h4 className="subheading">Cash on Delivery (COD):</h4>
        <p>
          We also offer a <strong>Cash on Delivery (COD)</strong> option for added
          convenience. COD is available for select pin codes within India, subject to
          courier service availability and order eligibility. If your location qualifies,
          the COD option will appear at checkout.
        </p>
        <ul className="list">
          <li>Orders using COD may be subject to verification before shipment.</li>
          <li>
            We reserve the right to disable COD for certain products, order values, or
            high-risk regions.
          </li>
        </ul>
      </div>

      <div className="section contact">
        <p>If you have any questions or need assistance with your payment, please contact us at:</p>
        <p>📧 <a href="mailto:customercare@ishum.in">customercare@ishum.in</a></p>
        <p>📞 +91 8046163052</p>
      </div>
    </div>
  );
};

export default PaymentStatement;
