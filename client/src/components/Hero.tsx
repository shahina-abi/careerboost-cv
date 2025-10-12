
export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-20 pt-40 bg-gradient-to-bl from-pink-50 to-blue-100">
      <div className="max-w-xl space-y-6">
        <h1 className="text-5xl font-bold text-gray-700">
          Boost <span className="text-blue-600">Your CV</span> & Find the Right Job with <span className="text-blue-600">AI</span>
        </h1>
        <p className="text-2xl text-slate-700 font-medium">
          Upload your CV, let AI enhance it, and get personalized job matches. Smarter job search starts here.
        </p>
        <div className="flex gap-6 mt-6">
          <button className="h-16 px-7 py-2.5 bg-blue-600 text-white font-bold rounded-[50px]">Upload Your CV</button>
          <button className="h-16 px-7 py-2.5 bg-gray-600 text-white font-bold rounded-[50px]">Get Start</button>
        </div>
      </div>
      <img src="/images/manwithlap.png" alt="Hero image" className="w-[500px] mt-10 lg:mt-0" />
    </section>
  );
}
