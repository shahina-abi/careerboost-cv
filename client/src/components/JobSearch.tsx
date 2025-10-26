

export default function JobSearch() {
  return (
    <section className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-lg space-y-4 py-4">
          <h2 className="text-3xl font-bold">
            Smarter Job Search, Less Stress
          </h2>
          <p className="text-blue-100">
            No more endless scrolling. We match you with the jobs that matter,
            saving you time and effort.
          </p>
        </div>
        <img 
          src ="/images/womenImg.png"
          
          alt="Smiling Woman"
          className=" w-auto md:w-1/3 mt-[-50px] "
        />
      </div>
    </section>
  );
}
