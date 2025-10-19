const steps = [
  { id: 1, title: "Upload Your CV", desc: "Drag & drop your resume." },
  { id: 2, title: "AI Enhancement", desc: "Get instant suggestions to make your CV stand out." },
  { id: 3, title: "Job Matching", desc: "Find jobs that fit your skills and profession." },
  { id: 4, title: "Apply & Succeed", desc: "Apply directly with your optimized CV." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-12">
          How It <span className="text-blue-600">Works</span>
          <span className="w-full max-w-40 h-2 bg-slate-200 block mt-8 mx-auto"></span>
        </h2>

      
        <div  className="grid lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.id} >
              <div className="w-20 h-20 p-5 mb-[-20px] z-10 relative bg-blue-600 rounded-[51.38px] inline-flex flex-col justify-center items-center gap-2.5">
                <div className="text-center justify-start text-pink-50 text-4xl font-bold ">{step.id}</div></div>
                <div className="w-[100%] h-60 px-5 py-14 bg-gradient-to-bl from-pink-50 to-blue-100 rounded-3xl inline-flex flex-col justify-start items-center gap-2.5">
                  <div className=" flex flex-col justify-start items-center gap-3">

              <div className="self-stretch text-center justify-start text-blue-600 text-2xl font-bold ">{step.title}</div>
              <div className="self-stretch text-center justify-start text-black text-xl font-medium ">{step.desc}</div>
  </div>
</div>
            </div>
))}
</div>
</div>
      
    </section>
  );
}
