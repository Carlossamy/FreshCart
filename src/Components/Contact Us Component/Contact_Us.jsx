import { useFormik } from "formik";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const contactUsFormik = useFormik({
    initialValues: { name: "", email: "", message: "" },
    onSubmit: (values) => {
      alert(
        `Message sent successfully! 
        ${values.name} 
        Your email is ${values.email}
        Your message is ${values.message}`
      );
      contactUsFormik.resetForm();
      console.log(values);
    }
  });

  return (
    <>
      <div className="flex items-center tracking-wider justify-center md:p-6 sm:p-3 mt-32 mb-10">
        <div className="shadow-lg rounded-lg p-4 max-w-2xl w-full ">
          <h2 className="text-3xl font-light bg-white text-gray-500 mb-6 p-1 border-b-4 border-blue-500 rounded-md shadow-md inline-block relative left-[50%] translate-x-[-50%]">
            Contact Us
          </h2>

          <div className="flex items-center justify-between tracking-wide text-gray-600 mb-6">
            <div className="flex items-center gap-2 pb-2">
              <FaPhone className="text-[#2563EB]" />
              <Link to="tel:+201271470997">
                <span className="border-b-2 hover:border-blue-500 rounded-md p-1">
                  +20-1271470997
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2 pb-2">
              <FaEnvelope className="text-[#E11D48] font-" />
              <Link to="mailto:kyrillossamy@outlook.com" target="_blank">
                <span className="border-b-2 hover:border-blue-500 rounded-md p-1">
                  kyrillossamy@outlook.com
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2 pb-2">
              <FaMapMarkerAlt className="text-[#16A34A]" />
              <Link to="https://www.google.com/maps" target="_blank">
                <span className="border-b-2 hover:border-blue-500 rounded-md p-1">
                  Maadi, Cairo, Egypt
                </span>
              </Link>
            </div>
          </div>

          <form onSubmit={contactUsFormik.handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="* Your Name"
              value={contactUsFormik.values.name}
              onChange={contactUsFormik.handleChange}
              className="w-full text-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="* Your Email"
              value={contactUsFormik.values.email}
              onChange={contactUsFormik.handleChange}
              className="w-full text-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
              required
            />
            <textarea
              name="message"
              placeholder="* Your Message"
              value={contactUsFormik.values.message}
              onChange={contactUsFormik.handleChange}
              className="w-full text-md p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 resize-none"
              rows="4"
              required></textarea>
            <button
              type="submit"
              className="w-[50%] text-lg py-3 rounded-lg hover:text-blue-500 bg-blue-500 text-gray-50 hover:bg-transparent transition duration-500 hover:translate-y-1 focus:outline-none border-3 border-blue-500 ml-[25%]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
