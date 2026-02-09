const page = () => {
  return (
    <main className="legal-page">
      <div className="content">
        <h1 className="text-xl font-bold">Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> February 9, 2026
        </p>

        <h2>1. General Information</h2>
        <p>
          This website ("CoinPulse") is a personal portfolio project. It is
          intended for demonstration purposes and is provided free of charge. By
          using this website, you agree to the terms of this Privacy Policy.
        </p>

        <h2>2. Data Collection and Processing</h2>
        <p>
          As a portfolio project, we aim to collect as little personal data as
          possible:
        </p>
        <ul>
          <li>
            <strong>Log Files:</strong> When you access this website, the server
            (e.g., Vercel) may automatically collect technical information such
            as your IP address, browser type, and time of access to ensure
            technical operation and security.
          </li>
          <li>
            <strong>External API Integration:</strong> This application fetches
            real-time cryptocurrency data from the{" "}
            <strong>CoinGecko API</strong>. Requests for market data or search
            queries are sent to CoinGecko's servers. These requests are handled
            server-side via Next.js Server Actions to protect API credentials.
          </li>
          <li>
            <strong>No Personal Accounts:</strong> This application does not
            offer user accounts, newsletters, or contact forms. No names, email
            addresses, or payment information are stored.
          </li>
        </ul>

        <h2>3. Cookies and Local Storage</h2>
        <p>
          This project is built with <strong>Next.js</strong>. It may use
          essential session storage or local storage to enhance the user
          experience (e.g., remembering UI states), but it does not use tracking
          or advertising cookies.
        </p>

        <h2>4. Third-Party Services</h2>
        <ul>
          <li>
            <strong>Hosting:</strong> The project is deployed using the Vercel
            Platform. Vercel may process technical data to serve the website.
          </li>
          <li>
            <strong>CoinGecko:</strong> Market data is provided by CoinGecko.
            Please refer to the{" "}
            <a href="https://www.coingecko.com/en/privacy" target="_blank">
              CoinGecko Privacy Policy
            </a>{" "}
            for details on how they handle data.
          </li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          Standard security measures are implemented to protect the integrity of
          this project. However, no method of transmission over the internet is
          100% secure.
        </p>

        <h2>6. Your Rights</h2>
        <p>
          Under the GDPR and similar laws, you have the right to access,
          rectify, or delete personal data. Since this app does not store
          personal identifiers, technical logs generally cannot be linked to
          specific individuals.
        </p>

        <h2>7. Contact Information</h2>
        <p>
          If you have questions regarding data privacy, please contact the
          developer through the GitHub profile or portfolio site where this
          project is hosted.
        </p>
      </div>
    </main>
  );
};

export default page;
