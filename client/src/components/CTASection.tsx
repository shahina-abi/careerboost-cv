export default function CTASection() {
  return (
    <section className="bg-white py-20 text-center">
      <h2 className="text-2xl font-bold mb-6">
        Ready to land your <span className="text-blue-600">dream job?</span>
      </h2>
      <div className="space-x-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Upload Your CV
        </button>
        <button className="border border-gray-400 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100">
          Get Start
        </button>
      </div>
    </section>
  );
}
