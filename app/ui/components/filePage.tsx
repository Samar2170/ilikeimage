'use client';
import { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import {ArrowDownTrayIcon, ChevronDownIcon} from "@heroicons/react/24/outline";
import { navOpts } from "@/app/lib/data/navOpts";
import { baseUrl } from "@/app/lib/data/constants";
import { getFingerprint } from "@/app/lib/fingerpint";
import { FillColors } from "@/app/lib/data/fillColors";
import ColorSelector from "./colorSelector";
import ColorPalette from "./colorPallete";

class DownloadFile {
    name: string;
    url: string;
    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}

function getFileName(contentDisposition: string | null, defaultName: string) {
  if (!contentDisposition) return defaultName;
  const match = contentDisposition.match(/filename="(.+)"/);
  return match ? match[1] : defaultName;
}

export default function FilePage(props:{
    handler?: string
}) {
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [convertedFile, setConvertedFile] = useState<DownloadFile | null>(null);
    const [dst,setDst] = useState("");
    const [colorEnabled, setColorEnabled] = useState(false);
    const [color,setColor] = useState("");
    const [apiUrl,setApiUrl] = useState("");
    const [visitorId, setVisitorId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [colorPaletteEnabled, setColorPaletteEnabled] = useState(false);
    const [colorPalette, setColorPalette] = useState<string[]>([]);


    const [heading, setHeading] = useState("");

    function generateUuid() : string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
    function selectColor(colorName: string) {
        setColor(colorName);
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
          return;
        }
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
          setFile(uploadedFile);
          setFilePreview(URL.createObjectURL(uploadedFile));
        }
      };

      function triggerDownloadFile(df: DownloadFile) {
        const a = document.createElement("a"); // Create an anchor tag
        a.href = df.url;
        a.download = df.name;
        document.body.appendChild(a);
        a.click(); // Trigger download
        document.body.removeChild(a); // Cleanup
        window.URL.revokeObjectURL(df.url); 
        setConvertedFile(null);
      }
    async function downloadFile(res:Response) {
        const blob =await res.blob();
        const url = window.URL.createObjectURL(blob); // Create a temporary URL
        console.log(res.headers);
        const filename = getFileName(res.headers.get("Content-Disposition"), "file."+dst);
        const dfile = new DownloadFile(filename, url)
        setConvertedFile(dfile);
    }
    function handleSubmit() {
        if (file) {
          setIsLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("dst", dst);
            formData.append("uuid", generateUuid());
            if (colorEnabled) {
                formData.append("color", color);
            }
            
            fetch(baseUrl + apiUrl, {
                method: "POST",
                body: formData,
                credentials: "include",
            },
            )
            .then((res) => {
                setIsLoading(false);
                
                if (res.ok) {
                  if (colorPaletteEnabled) {
                      res.json().then((json) => {
                          setColorPalette(json);
                      })
                  } else {
                    downloadFile(res);
                    setFile(null);
                  }
                }else if (res.status === 400) {
                    alert(res.statusText);
                } else {
                    alert("Something went wrong");
                }
            })
        } else {
            alert("Please select a file");
        }
    }
    
    useEffect(() => {
      console.log(visitorId);
        const h=props.handler;
        const navOpt = navOpts.find((opt) => opt.id === h);
        if (navOpt) {
            setDst(navOpt.dst);
            setApiUrl(navOpt.apiPath);
            setHeading(navOpt.name);
            if (navOpt.id==="fillbg") {
                setColorEnabled(true);
            } else {
                setColorEnabled(false);
            }
            if (navOpt.id==="color-extract") {
                setColorPaletteEnabled(true);
            } else {
                setColorPaletteEnabled(false);
            }
        } 
        const fetchFingerprint = async () => {
          const id = await getFingerprint();
          const confidence = 0.9;
          setVisitorId(id);
        };
        fetchFingerprint();
      }, [props.handler]);

    return (
        <div className="flex flex-col h-full">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">{heading}</h2>
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
            
            { colorEnabled ?
            <div className="sm:col-span-full">
              <label htmlFor="color" className="block text-sm/6 font-medium text-gray-900">
                Color
              </label>
                <ColorSelector colors={FillColors} onSelectColor={selectColor}/>
            </div>
            : <></>}
            {colorPaletteEnabled ?
              <div className="sm:col-span-full">
              <ColorPalette colors={colorPalette} />
              </div>
              : <></>}

            <div className="col-span-full">
            <div className="flex justify-center gap-x-6">
                <div className="mt-6 flex items-center justify-end gap-x-6">
                
                  <button
                    onClick={(e) => {e.preventDefault(); handleSubmit();}}
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  Submit
                  </button>
                </div>
                </div>
            </div>
                <div className="col-span-full">
                <label htmlFor="download-file" className="block text-md/6 font-large text-gray-900">
                  Download
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                  {convertedFile ? (
                    <img src={convertedFile.url} alt="Uploaded File" className="mx-auto h-24 w-24 rounded-md object-cover" />
                    ) : (
                        <ArrowDownTrayIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                    )}
                    
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      {isLoading ? (
                        <p>Loading...</p>
                      ):(<></>)}
                      {convertedFile ? (
                        <button
                          // href={convertedFile.url}
                          // download={convertedFile.name}
                          onClick={() => triggerDownloadFile(convertedFile)}
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                        >
                          <span>Download file</span>
                        </button>
                      ) : (
                        <p className="text-gray-600">No file converted yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>                
              </div>
            </div>
          </div>
    
        </form>
        </div>
    )
}
  