import {
    Disclosure,
  } from "@headlessui/react";
  import {
    MagnifyingGlassIcon,
    ArrowRightStartOnRectangleIcon,
    BellIcon,
  } from "@heroicons/react/24/outline";
  import React from "react";
 
  const user = {
    name: "Balogun Akeem",
    email: "b@gmail.com",
    imageUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocJf1Fy4wWPZXirbNTH9dbLlXPod4RnXUIxRgAQJQLG9cimN6e5a=s83-c-mo",
  };
  
  export default function NavBar() {
    return (
          <Disclosure as="nav" className="bg-[#3976E8]">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 text-white">PLACEHOLDER</div>
                      <div className="hidden md:block"></div>
                    </div>
                    <div className="md:block">
                      <div className=" flex items-center gap-5">
                        <button
                          type="button"
                          className="relative rounded-md bg-[#5B94FE] p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <MagnifyingGlassIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
  
                        <button
                          type="button"
                          className="relative rounded-md bg-[#5B94FE] p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <ArrowRightStartOnRectangleIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
  
                        <button
                          type="button"
                          className="relative rounded-md bg-[#5B94FE] p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
  
  


    );
  }
  