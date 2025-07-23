import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CallToAction = () => {
  return (
    <div className="bg-indigo-600 rounded-xl my-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-0 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start posting <br /> jobs today
          </h2>
          <p className="text-indigo-100 mb-6">
            Start posting jobs for only $49
          </p>
          <Link 
            href="/recruiters/createjob"
            className="inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
          >
            Sign Up For Free
          </Link>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <Image 
              src="/example.png" 
              alt="Job posting dashboard" 
              width={500}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction; 