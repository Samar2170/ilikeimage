import { useState,useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  
} from '@heroicons/react/24/outline'
import { useSearchParams,useRouter } from "next/navigation";
import { getFingerprint } from "../../lib/fingerpint";
import { imageOpts, imageConvertOpts, imageEditOpts, NavOpt } from "../../lib/data/navOpts";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
export default function SideNav() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = '/';
    const { replace } = useRouter();
    const [active, setActive] = useState(searchParams.get("handler") || "jpeg2png");
  
    function handleClick(navO: NavOpt) {
      let subUrl = "";
      const params = new URLSearchParams(searchParams);
        params.set("handler", navO.id);
      if (navO.hasPath) {
        subUrl = navO.apiPath;
      }
        // replace(`${pathname}?${params.toString()}`);
        replace(`${pathname}${subUrl}?${params.toString()}`);
  
    }
  
    useEffect(() => {
      const currentHandler = searchParams.get("handler")
      if (currentHandler) {
        setActive( currentHandler); 
      } else {
        const params = new URLSearchParams(searchParams);
        params.set("handler", "jpeg2png");
        replace(`${pathname}?${params.toString()}`);
      }
    }, [searchParams]);
    return (
        <div>
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="/ilike-4.png"
                    className="h-24 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <div className="text-xs/6 font-semibold text-gray-400">Image Tools</div>
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {imageOpts.map((item) => (
                          <li key={item.name}>
                            <button
                              onClick={() => handleClick(item)}
                              className={classNames(
                                active===item.id
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>                      
                    <div className="text-xs/6 font-semibold text-gray-400">Image Converter</div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {imageConvertOpts.map((item) => (
                          <li key={item.name}>
                            <button
                            onClick={() => handleClick(item)}
                              className={classNames(
                                active===item.id
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>                      
                    <div className="text-xs/6 font-semibold text-gray-400">Image Editor</div>
                      <ul role="list" className="-mx-2 space-y-1">
                        {imageEditOpts.map((item) => (
                          <li key={item.name}>
                            <button
                            onClick={() => handleClick(item)}
                              className={classNames(
                                active===item.id
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>

                    <li>
                    {/* <div className="text-xs/6 font-semibold text-gray-400">Image Tools</div> */}
                    {/* <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {imageOpts.map((item) => (
                          <li key={item.name}>
                            <button
                              onClick={() => handleClick(item.id)}
                              className={classNames(
                                active===item.id
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              )}
                            >
                              <item.icon aria-hidden="true" className="size-6 shrink-0" />
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li> */}
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="/ilike-4.png"
                className="h-32 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                <div className="text-xs/6 font-semibold text-gray-400">Image Tools</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {imageOpts.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleClick(item)}
                          className={classNames(
                            active===item.id
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                <div className="text-xs/6 font-semibold text-gray-400">Image Convertor</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {imageConvertOpts.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleClick(item)}
                          className={classNames(
                            active===item.id
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                <div className="text-xs/6 font-semibold text-gray-400">Image Editor</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {imageEditOpts.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleClick(item)}
                          className={classNames(
                            active===item.id
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="">
                <div className="text-xs/6 font-semibold text-gray-400">Document Tools</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {docxPdfOpts.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleClick(item.id)}
                          className={classNames(
                            active===item.id
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="">
                <div className="text-xs/6 font-semibold text-gray-400">Excel Convertor</div>
                  <ul role="list" className="-mx-2 space-y-1">
                    {excelOpts.map((item) => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleClick(item.id)}
                          className={classNames(
                            active===item.id
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                          )}
                        >
                          <item.icon aria-hidden="true" className="size-6 shrink-0" />
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-xs sm:px-6 lg:hidden">
          <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
          
        </div>
        </div>
    );
}