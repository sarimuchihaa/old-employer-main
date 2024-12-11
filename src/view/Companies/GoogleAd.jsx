import React from 'react';

const GoogleAd = () => {
  return (
    <div className="min-h-[20vh] flex items-center justify-start bg-gray-50 p-6 rounded-xl">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">Ads</h1>
        <p className="text-md text-[#8C8C8C] text-center mb-6">Unless it's with Old Employer HR services !</p>
        <form>
          <div className="mb-4">
            <label htmlFor="adType" className="block text-sm font-medium text-gray-700 border-gray-300 mb-1">Ad type</label>
            <select id="adType" className="block w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-[#9B9B9B]">
              <option className='text-[#9B9B9B]'>Google ad</option>
              <option className='text-[#9B9B9B]'>Custom ad</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Code</label>
            <textarea id="code" className="block w-full border border-gray-300 rounded-lg px-3 py-10 text-sm"></textarea>
          </div>

          <button type="submit" className="w-full bg-[#23babc] hover:bg-[#1c9596] text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default GoogleAd;