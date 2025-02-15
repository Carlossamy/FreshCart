// import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="p-3">
        <div className="max-w-3xl tracking-wider mt-32 mx-auto p-6 shadow-lg rounded-lg mb-10">
          <h1 className="text-3xl font-light text-gray-500 mb-4 border-b-4 border-blue-500 inline-block rounded-md shadow-md p-1 pb-0">
            Privacy Policy
          </h1>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Introduction
            </h2>
            <p className="text-gray-700">
              Welcome to <span className="font-semibold">FreshCart</span>. Your
              privacy matters to us.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Information We Collect
            </h2>
            <ul className="list-none text-gray-700">
              <li>Your name, email, and contact details.</li>
              <li>Browsing data and purchase history.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use your data to improve services and ensure security.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-700">
              Email:{" "}
              <a
                href="mailto:support@freshcart.com"
                className="text-blue-600 underline">
                support@freshcart.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
