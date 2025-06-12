import { useState } from "react";

export default function InputFeild() {

   const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (url) {
      window.location.href = `/?url=${url}`;
    }
  }; 
    return <div className="w-[50%] space-y-3 bg-gray-900 p-6 rounded-lg">
  <div>
    <label htmlFor="hs-trailing-button-add-on-with-leading-and-trailing" className="sr-only">Label</label>
    <div className="flex rounded-lg">
      <span className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-600 bg-gray-700 text-sm">
        <span className="text-sm text-gray-300">http://</span>
      </span>
      <input 
        type="text" 
        id="hs-trailing-button-add-on-with-leading-and-trailing" 
        name="hs-trailing-button-add-on-with-leading-and-trailing" 
        className="py-2.5 sm:py-3 px-4 block w-full border-gray-600 bg-gray-800 text-gray-300 rounded-0 sm:text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
        placeholder="Search..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="button" onClick={handleSubmit} className="size-11.5 shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
}