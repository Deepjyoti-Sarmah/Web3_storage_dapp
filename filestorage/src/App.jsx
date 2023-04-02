import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Web3Storage} from 'web3.storage';

const client = new Web3Storage({token: import.meta.env.WEB3_STORAGE_API})


function App() {

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileType, setFileType] = useState(null);

  const captureFile = async (e) => {
    try {
      setFile(e.target.files);
      setFileName(e.target.files[0].name);
      setFileSize(e.target.files[0].size);
      setFileType(e.target.files[0].type);
    }catch(err) {
      console.log(err);
    }
  };


  const uploadFile = async(e) => {
    e.preventDefault()
    console.log("UPLOADINGGG")
    if(file) {
      try {
        const uploadedFile = await client.put(file, {
          name: fileName,
          maxRetries: 3,
          wrapWithDirectory: false
        })
        console.log(uploadedFile)
      } catch(err) {
        console.log(err)
      }
    } else {
      console.log("NO FILE FOUND!")
    }
  }

  

  return (
		<div className="bg-black text-white">
			<div className="flex items-center justify-between flex-row px-4 py-2">
				{/* Logo */}
				<h1 className="text-2xl font-bold">FileStorage</h1>
				<ConnectButton />
			</div>
			<div className="flex items-center justify-center min-h-screen">
				<h1 className="text-4xl font-extrabold">Upload files</h1>

        
        <div className="mb-8 mt-6">
          <form onSubmit={(e) => uploadFile(e)}  className="px-4" >
            <div className="mt-4 flex justify-between mx-4">
              <input className="hidden" type="file" id="filecap" onChange={(e) => captureFile(e)}/>
              <label htmlFor="filecap" 
              className="cursor-pointer bg-white hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded font-bold dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900 transform transition hover:scale-110">
                {fileName ? fileName : "Choose a file"}
              </label>
              <button type="submit"
                className="py-2 px-4 rounded font-bold bg-white text-blue-700 border border-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900 hover:border-transparent hover:bg-blue-500 hover:text-white transform transition hover:scale-110">
                Upload!
              </button>
            </div>
          </form>
        </div>
			</div>

      
		</div>
	);
}

export default App;

