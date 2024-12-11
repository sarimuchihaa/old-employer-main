import React from 'react';

const CustomAd = () => {
  return (
    <div className="min-h-[20vh] flex items-center justify-start bg-gray-50 p-6 rounded-xl">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">Ads</h1>
        <p className="text-md text-[#8C8C8C] text-center mb-6">Unless it's with Old Employer HR services !</p>
        <form>
          <div className="mb-4">
            <label htmlFor="adType" className="block text-sm font-medium text-gray-700 border-gray-300 mb-1">Ad type</label>
            <select id="adType" className="block w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-[#9B9B9B]">
              <option className="text-[#9B9B9B]">Custom ad</option>
              <option className="text-[#9B9B9B]">Google ad</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 border-gray-300 mb-1">Title</label>
            <input type="text" id="title" className="block w-full border border-gray-300 rounded-lg px-3 py-3 text-sm" placeholder="title" />
          </div>

          <div className="mb-4">
            <label htmlFor="adLocation" className="block text-sm font-medium text-gray-700 border-gray-300 mb-1">Ad Location</label>
            <select id="adLocation" className="block w-full border border-gray-300 rounded-lg px-3 py-3 text-sm text-[#9B9B9B]">
              <option className="text-[#9B9B9B]">Select page</option>
            </select>
            <div className="mt-4 space-y-6">
              <div><input type="checkbox" id="beforeHeader" className="h-4 w-4" /> <label htmlFor="beforeHeader" className="ml-2">Before header</label></div>
              <div><input type="checkbox" id="afterHeader" className="h-4 w-4" /> <label htmlFor="afterHeader" className="ml-2">After header</label></div>
              <div><input type="checkbox" id="beforeFooter" className="h-4 w-4" /> <label htmlFor="beforeFooter" className="ml-2">Before Footer</label></div>
              <div><input type="checkbox" id="afterFooter" className="h-4 w-4" /> <label htmlFor="afterFooter" className="ml-2">After Footer</label></div>
              <div><input type="checkbox" id="inSearch" className="h-4 w-4" /> <label htmlFor="inSearch" className="ml-2">In Search</label></div>
              <div><input type="checkbox" id="sidebar" className="h-4 w-4" /> <label htmlFor="sidebar" className="ml-2">Sidebar</label></div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Description..."></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
            <input type="text" id="url" className="block w-full border border-gray-300 rounded-lg px-3 py-3 text-sm" placeholder="www.example.com" />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duration (in days)</label>
            <input type="number" id="duration" className="block w-full border border-gray-300 rounded-lg px-3 py-3 text-sm" placeholder="Example: 1" />
          </div>

          <div className="mb-6">
            <label htmlFor="uploadImage" className="block text-sm font-medium text-gray-700 mb-1">Upload image</label>
            <input type="file" id="uploadImage" className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg px-3 py-3" />
          </div>

          <button type="submit" className="w-full bg-[#23babc] hover:bg-[#1c9596] text-white py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CustomAd;
