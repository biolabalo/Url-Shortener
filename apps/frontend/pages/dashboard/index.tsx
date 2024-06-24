import UrlShortener from "../../components/Dashboard";
import URLTable from "../../components/Dashboard/table";
import NavBar from "../../components/Dashboard/navbar";
import React, { useState, useEffect } from "react";
import { retrieveURLs } from "../../services";
import { toast } from "react-toastify";


export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meta, setMeta] = useState({
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
    firstPage: 1,
    firstPageUrl: "",
    lastPageUrl: "",
    nextPageUrl: null,
    previousPageUrl: null,
  });

  const fetchUrls = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await retrieveURLs(page, meta.perPage);
      setUrls(response?.data);
      setMeta(response?.meta);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchUrls(meta.currentPage);
  }, [meta.currentPage]);

  const handlePageChange = (page: number) => {
    setMeta((prevMeta) => ({ ...prevMeta, currentPage: page }));
  };

  return (
    <div className="min-h-full">
      <NavBar />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <UrlShortener />
          {/* @ts-ignore */}
          <URLTable data={urls} meta={meta} onPageChange={handlePageChange} />
        </div>
      </main>
    </div>
  );
}
