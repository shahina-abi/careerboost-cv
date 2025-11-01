


import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 mt-10">
      {/* Header Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-indigo-700">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have any questions, feedback, or collaboration ideas? Reach out to us and we’ll get back to you soon.
        </p>
      </section>

      {/* Contact Form & Info Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 bg-white rounded-2xl shadow-lg">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Send Us a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                placeholder="Your message..."
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-700">Contact Information</h2>
          <div className="flex items-center space-x-4">
            <Phone className="text-indigo-600 w-6 h-6" />
            <p className="text-gray-700">+91 9823456791</p>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="text-indigo-600 w-6 h-6" />
            <p className="text-gray-700">info@yourwebsite.com</p>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="text-indigo-600 w-6 h-6" />
            <p className="text-gray-700">Mumbai,India</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-semibold text-indigo-700 mb-6">
          Find Us on the Map
        </h2>
        <div className="w-full h-[400px] md:h-[500px]">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.9998999999997!2d51.5310!3d25.2854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c5b0faaaaaab%3A0xb7a7aa8!2sDoha%2C%20Qatar!5e0!3m2!1sen!2sqa!4v1700000000000!5m2!1sen!2sqa"
            width="100%"
            height="100%"
            loading="lazy"
            className="rounded-xl border-0"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
