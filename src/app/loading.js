"use client";

const LoadingMinimal = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f3e8ff] to-white relative">
      {/* Glassy overlay card */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-2xl px-10 py-12 flex flex-col items-center text-center">
        {/* Spinner */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#d9b8ff] rounded-full" />
          <div className="w-20 h-20 border-4 border-t-[#ff2ea7] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0" />
        </div>

        {/* Branding Text */}
        <h2 className="mt-6 text-2xl font-extrabold text-[#ff2ea7] tracking-tight uppercase">
          The Capital Academy
        </h2>
        <p className="mt-2 text-sm text-[#8e2de2]">Powering your learning journey...</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#ff2ea7] to-[#8e2de2] animate-loadingBar rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingMinimal;
