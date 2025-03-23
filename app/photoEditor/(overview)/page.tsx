'use client';
import { ReactPhotoEditor } from "@/components/photoEditor/photoEditor";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";

export default function Page() {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
          return;
        }
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
          setFile(uploadedFile);
          setFilePreview(URL.createObjectURL(uploadedFile));
        }
    }

    const showModalHandler = () => {
        if (file) {
            setShowModal(true)
        }
    }

    const hideModal = () => {
        setShowModal(false)
    }

    const handleSaveImage = (editedFile: File) => {
        setFile(editedFile);
    };
    return (
        <div className="flex flex-col h-full">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Edit Photo</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Please upload your file and we will convert it for you
              </p>
    
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    
    
    
                <div className="col-span-full">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    {filePreview ? (
                    <img src={filePreview} alt="Uploaded File" className="mx-auto h-24 w-24 rounded-md object-cover" />
                    ) : (
                    <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                    )}
                    <div className="mt-4 flex text-sm text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                            <span>Upload a file</span>
                            <input
                            onChange={handleFileChange}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                        <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    </div>
                </div>
            


            <div className="col-span-full">
                 <div className="flex justify-center gap-x-6">
                <div className="mt-6 flex items-center justify-end gap-x-6">
                
                  <button
                    onClick={(e) => {showModalHandler()}}
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  Edit
                  </button>
                </div>
                </div>
            </div>
            <div className="col-span-full">
            <ReactPhotoEditor
                        open={showModal}
                        onClose={hideModal}
                        allowColorEditing={true}
                        allowFlip={true}
                        allowRotate={true}
                        allowZoom={true}
                        downloadOnSave={true}
                        file={file} 
                        onSaveImage={handleSaveImage}/> 
            </div>
             
              </div>
            </div>
          </div>
    
        </div>
    )
}