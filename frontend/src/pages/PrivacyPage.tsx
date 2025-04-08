import React from "react";
import "../css/PrivacyPage.css";

const PrivacyPage: React.FC = () => {
  return (
    <div className="privacy-container">
      <h1>CineNiche Privacy Policy</h1>
      <p className="updated-date">Last updated: April 7, 2025</p>

      <section>
        <p>
          Welcome to CineNiche! CineNiche, Inc. (“CineNiche”, “we”, “us”, or
          “our”) respects your privacy. This Privacy Policy describes how we
          collect, use, and protect your Personal Data in connection with your
          use of our website, mobile applications, and all related platforms,
          features, and services (collectively, the “Platform”).
        </p>
        <p>
          By accessing or using CineNiche, you consent to the practices
          described in this policy.
        </p>
      </section>

      <section>
        <h2>What Data We Collect</h2>
        <p>
          We may collect information that identifies you directly or indirectly,
          including:
        </p>
        <p>
          - Name, email address, and other contact details
          <br />
          - Login credentials and account settings
          <br />
          - Viewing activity and preferences
          <br />
          - IP address, browser type, device identifiers
          <br />
          - Location information (if enabled)
          <br />
          - Payment data (if making purchases)
          <br />- Communications you send us
        </p>
      </section>

      <section>
        <h2>How We Collect Your Data</h2>
        <p>
          We collect data directly when you register for an account, interact
          with content, contact support, or voluntarily provide information. We
          also automatically collect data through cookies, analytics tools, and
          tracking technologies. Additionally, we may receive data from third
          parties such as authentication providers (e.g., Google or Facebook) or
          advertising platforms.
        </p>
      </section>

      <section>
        <h2>How We Use Your Data</h2>
        <p>We use your Personal Data to:</p>
        <p>
          - Provide and personalize services
          <br />
          - Recommend content based on viewing history
          <br />
          - Process transactions and manage your account
          <br />
          - Communicate updates, promotions, or service-related messages
          <br />
          - Improve user experience and analyze usage
          <br />- Comply with legal obligations and enforce terms
        </p>
      </section>

      <section>
        <h2>How We Store and Protect Your Data</h2>
        <p>
          We store your data securely on encrypted servers in GDPR-compliant
          regions. We implement appropriate technical and organizational
          measures to protect your Personal Data against unauthorized access,
          disclosure, or misuse. While we take every precaution, no system is
          completely secure.
        </p>
      </section>

      <section>
        <h2>Marketing</h2>
        <p>
          CineNiche may send you promotional content, offers, or news related to
          your interests. You may opt out at any time using the “unsubscribe”
          link in our emails or within your account settings.
        </p>
      </section>

      <section>
        <h2>Cookies and Tracking Technologies</h2>
        <p>We use cookies, pixels, and similar technologies to:</p>
        <p>
          - Recognize returning users
          <br />
          - Store user preferences
          <br />
          - Analyze traffic and behavior
          <br />- Deliver targeted advertising
        </p>
        <p>
          You can manage or disable cookies through your browser settings. Some
          features of our Platform may not function properly without cookies.
        </p>
      </section>

      <section>
        <h2>Your Data Protection Rights</h2>
        <p>Under GDPR and applicable laws, you have the right to:</p>
        <p>
          - Access your data
          <br />
          - Request correction of inaccurate data
          <br />
          - Request deletion (“right to be forgotten”)
          <br />
          - Restrict or object to processing
          <br />
          - Receive a copy of your data in a portable format
          <br />- Withdraw consent at any time
        </p>
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>. We
          will respond within one month.
        </p>
      </section>

      <section>
        <h2>International Users</h2>
        <p>
          If you are located outside the United States, please note that your
          information will be transferred to and processed in the United States
          or other jurisdictions where our servers are located. We rely on
          standard contractual clauses or other lawful mechanisms for
          cross-border data transfers.
        </p>
      </section>

      <section>
        <h2>Children’s Privacy</h2>
        <p>
          CineNiche does not knowingly collect data from individuals under the
          age of 13. If we become aware of such data, we will take steps to
          delete it. If you believe we may have collected data from a child,
          please contact us immediately.
        </p>
      </section>

      <section>
        <h2>Sharing Your Data</h2>
        <p>We may share your data with:</p>
        <p>
          - Service providers who assist with hosting, analytics, and payments
          <br />
          - Advertising partners to display relevant ads
          <br />
          - Affiliates and subsidiaries
          <br />
          - Legal authorities when required by law
          <br />- In the event of a merger or acquisition
        </p>
        <p>We do not sell your Personal Data.</p>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <p>
          Our Platform may link to external websites or services. This Privacy
          Policy applies only to CineNiche. We encourage you to review the
          privacy policies of third-party sites you visit.
        </p>
      </section>

      <section>
        <h2>California Privacy Rights</h2>
        <p>
          If you are a California resident, you may request information about
          the categories of personal information we share with third parties for
          marketing. You may also request deletion of your data under the
          California Consumer Privacy Act (CCPA). To exercise these rights,
          contact{" "}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          CineNiche may update this Privacy Policy from time to time. Changes
          will be posted on this page with an updated revision date. Continued
          use of the Platform after updates means you accept the revised policy.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy or your
          data, you can contact us at:
        </p>
        <p>
          Email:{" "}
          <a href="mailto:privacy@cineniche.com">privacy@cineniche.com</a>
          <br />
          Address: CineNiche, 123 Movie Lane, Hollywood, CA 90210
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
