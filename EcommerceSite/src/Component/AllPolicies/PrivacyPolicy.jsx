import React from "react";
import "./PrivacyPolicy.css";

const PrivacyStatement = () => {
  return (
    <div className="privacy-statement">
      <h2 className="heading">PRIVACY STATEMENT</h2>
      <h3 className="company-name">Ishum Designs Pvt. Ltd.</h3>

      <p>
        Ishum Designs Pvt. Ltd. and its subsidiaries and divisions, including ishum.in,
        respect your privacy. This Privacy Policy outlines how your data is collected and
        used by us. Please read this Privacy Policy carefully. By accessing the services
        provided by ishum.in, you agree to the collection and use of your data by ishum.in
        in the manner outlined in this policy.
      </p>
      <p>
        If you have questions or concerns regarding this statement, you can contact us at{" "}
        <a href="mailto:customercare@ishum.in">customercare@ishum.in</a>.
      </p>
      <p>
        This policy does not apply to procedures and practices followed by entities not
        managed, owned, or controlled by ishum.in, or to individuals not engaged, employed,
        or managed by ishum.in.
      </p>
      <p>
        Our goal is to help you feel secure when using our website and sharing necessary
        information. Your use of our website indicates your consent to the data collection
        practices detailed below.
      </p>

      <div className="section">
        <h4>INFORMATION THAT MAY BE COLLECTED FROM YOU</h4>
        <p>
          Ishum.in collects details you provide during registration, along with information
          we gather from your use of our services and website visits.
        </p>
        <p className="note">
          Note: We do not collect your payment card details (e.g., credit/debit card number,
          expiration date, CVV, etc.). When making a purchase, you are redirected to Razorpay,
          a secure third-party payment gateway.
        </p>
        <p>
          We may collect additional information for promotions, feedback, or profile
          completions. Customer traffic patterns and usage data help us improve service
          quality. Only relevant and necessary information is collected.
        </p>
      </div>

      <div className="section">
        <h4>WHEN / HOW DO WE COLLECT INFORMATION</h4>
        <p>
          We collect anonymous traffic data when you visit our website and personally
          identifiable information when you register or transact as a guest (e.g., name,
          email, address, etc.).
        </p>
        <p>
          This information helps us contact you regarding services you've used and fulfill
          your orders. We are the sole owners of data collected via ishum.in.
        </p>
        <p>
          Our site may link to other websites, which may not follow the same privacy
          practices. We are not responsible for external sites not owned or operated by us.
        </p>
        <p>
          Please exercise caution when sharing personal information in public areas such as
          chat rooms or forums.
        </p>
      </div>

      <div className="section">
        <h4>HOW IS THE INFORMATION USED</h4>
        <ul>
          <li>Send registration confirmations and password reminders.</li>
          <li>Notify about special offers and policy updates.</li>
          <li>Share order and transaction updates.</li>
          <li>Enhance personalized services and customer support.</li>
        </ul>
        <p>
          Anonymous data is used for analytics, tracking user behavior, and improving website
          performance.
        </p>
      </div>

      <div className="section">
        <h4>WHO DO WE SHARE YOUR INFORMATION WITH</h4>
        <p>We do not sell or rent your information. We only share it with:</p>
        <ul>
          <li>
            <strong>Agents:</strong> Third parties like shipping and payment processors help
            fulfill orders. They do not retain or use your personal information beyond what's
            required.
          </li>
          <li>
            <strong>Alliance Partners:</strong> We may share limited data with trusted
            partners to offer related services. They use your data only to deliver requested
            services.
          </li>
        </ul>
        <p>We may also disclose your information:</p>
        <ul>
          <li>To comply with legal obligations or requests from law enforcement.</li>
          <li>To investigate suspected fraud or enforce our terms.</li>
          <li>With your explicit permission.</li>
          <li>To deliver products or services you've requested.</li>
        </ul>
        <p>
          We may share aggregate statistics with advertisers, but not personally identifiable
          information.
        </p>
      </div>

      <div className="section">
        <h4>SECURITY OF YOUR DATA</h4>
        <p>
          We use secure methods (e.g., SSL encryption) and industry-standard procedures to
          protect your personal data during transmission and storage.
        </p>
        <p>
          Despite best efforts, no online data transmission is 100% secure. We cannot
          guarantee absolute security but take necessary steps to safeguard your
          information.
        </p>
      </div>

      <div className="section">
        <h4>YOUR RIGHTS & CHOICES</h4>
        <ul>
          <li>You can choose to accept or decline cookies.</li>
          <li>
            Cookies store basic information like session data and preferences. They do not
            contain personally identifiable information unless you supply it.
          </li>
          <li>You may opt in or out of marketing emails.</li>
          <li>You can update or delete your information by contacting our support.</li>
          <li>
            You can request removal of your personal data (some archived records may remain).
          </li>
        </ul>
      </div>

      <div className="section">
        <h4>POLICY UPDATES</h4>
        <p>
          We reserve the right to modify this Privacy Policy at any time. Any changes will
          be posted on our website and take effect immediately upon posting. Material
          changes will be highlighted.
        </p>
      </div>

      <div className="section contact">
        <h4>CONTACT INFORMATION</h4>
        <p>
          <strong>Ishum Designs Pvt. Ltd.</strong>
          <br />
          A-6, A Block, Sector 6,
          <br />
          Noida, Uttar Pradesh - 110096
        </p>
        <p>📞 +91 8046163052</p>
        <p>
          📧 <a href="mailto:customercare@ishum.in">customercare@ishum.in</a>
        </p>
        <p>🌐 <a href="https://www.ishum.in">www.ishum.in</a></p>
      </div>
    </div>
  );
};

export default PrivacyStatement;
