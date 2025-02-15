export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 shadow-lg rounded-lg mt-32 mb-10">
      <h1 className="text-3xl font-light mb-4 tracking-wider text-gray-500 border-b-4 border-blue-500 inline-block rounded-md shadow-md p-1 pb-0">
        Terms of Service
      </h1>
      <p className="mb-4 tracking-wider">
        Welcome to our Terms of Service. Please read them carefully before using
        our services.
      </p>

      <div className="shadow-md mt-2 mb-2 rounded-md hover:bg-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 cursor-pointer group">
        <h2 className="text-xl p-3 pb-0 font-light mt-6 mb-2 tracking-wider text-blue-500 group-hover:text-gray-800 rounded-md">
          Acceptance of Terms
        </h2>
        <p className="mb-6 p-3 pt-0 tracking-wider rounded-md group-hover:text-blue-500">
          By accessing or using our services, you agree to be bound by these
          terms and conditions.
        </p>
      </div>

      <div className="shadow-md mt-2 mb-2 rounded-md hover:bg-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 cursor-pointer group">
        <h2 className="text-xl p-3 pb-0 font-light mt-6 mb-2 tracking-wider text-blue-500 group-hover:text-gray-800 rounded-md">
          User Responsibilities
        </h2>
        <p className="mb-6 p-3 pt-0 tracking-wider rounded-md group-hover:text-blue-500">
          You agree not to misuse the services or help others do so. You must
          comply with all applicable laws and regulations.
        </p>
      </div>

      <div className="shadow-md mt-2 rounded-md hover:bg-white hover:bg-opacity-40 hover:scale-105 transition-all duration-300 cursor-pointer group">
        <h2 className="text-xl p-3 pb-0 font-light mt-6 mb-2 tracking-wider text-blue-500 group-hover:text-gray-800 rounded-md">
          Privacy Policy
        </h2>
        <p className="mb-6 p-3 pt-0 tracking-wider rounded-md group-hover:text-blue-500 ">
          Your privacy is important to us. Please review our Privacy Policy to
          understand how we handle your information.
        </p>
      </div>
    </div>
  );
}
