import UrlShortener from "../../components/Dashboard";
import URLTable from "../../components/Dashboard/table";
import NavBar from "../../components/Dashboard/navbar";
import React, { useState, useEffect } from "react";
import { retrieveURLs } from "../../services";
import { toast } from "react-toastify";


export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await retrieveURLs();
        console.log(response);
        setIsLoading(false);
        // Handle the response data as needed
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    };

    fetchUrls();
  }, []);
  return (
    <>
      <div className="min-h-full">
        <NavBar />

        <main className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <UrlShortener />
          
            <URLTable />
          </div>
        </main>
      </div>
    </>
  );
}
