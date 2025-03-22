'use client';
import { ReactPhotoEditor } from "@/components/photoEditor/photoEditor";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";
import UploadFileBox from "@/app/ui/components/uploadFileBox";
import CenteredButton from "@/app/ui/components/centerdButton";

export default function Page() {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(true);
    const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
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
                  <UploadFileBox handleFileChange={handleFileChange} filePreview={filePreview} />
                </div>
            


            <div className="col-span-full">
              <CenteredButton onClick={showModalHandler} title="Edit Photo" />
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