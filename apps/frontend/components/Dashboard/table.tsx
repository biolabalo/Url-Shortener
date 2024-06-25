import React, { useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";
import { RowData, MetaData } from '../../services/types'
import useHostnameWithProtocol from '../../hooks'


interface URLTableProps {
  data: RowData[];
  meta: MetaData;
  onPageChange: (page: number) => void;
}

interface RowProps {
  value: string; // Enforces value to be a string
  customColor?: string;
}

const Row: React.FC<RowProps> = ({ value, customColor }) => (
  <div
    className={`
  flex-1 py-2 px-4 text-center
  text-[14px]  ${customColor ? "text-[#101828] font-medium" : "text-[#667085] font-normal"} 
  `}
  >
    {value}
  </div>
);

const Thead: React.FC<RowProps> = ({ value }) => (
  <div className="flex-1 py-2 px-4 font-bold text-center text-[#667085] font-medium text-xs">
    {value}
  </div>
);



const URLTable: React.FC<URLTableProps> = ({ data, meta, onPageChange }) => {
  const hostnameWithProtocol = useHostnameWithProtocol();

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="container mx-auto">
      <div className="min-w-full bg-white url-table rounded-xl">
        <div className="flex bg-gray-200 py-2 rounded-t-xl">
          <Thead value="Name" />
          <Thead value="Description" />
          <Thead value="Shortened URL" />
          <Thead value=" " />
        </div>

        {data && data?.map((row) => (
          <div key={row.id} className="flex border-t py-2">
            <Row value={row.name} customColor="p" />
            <Row value={row.description} />
            <div className="flex-1 py-2 px-4 text-center">
              <a
               href={`${hostnameWithProtocol}/${row.shortId}`}
                className="  text-[14px] font-normal text-[#667085] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {window.location.hostname}/{row.shortId}
              </a>
            </div>

            <div
              className="
  flex-1 py-2 px-4 flex items-center justify-center
  text-[14px] font-normal text-[#667085]
  "
            >
              <LinkIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center py-3">
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => handleClick(meta.currentPage - 1)}
          disabled={meta?.currentPage === 1}
        >
          Previous
        </button>
        <div>
          {Array.from({ length: meta?.lastPage }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${
                meta.currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              } rounded`}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 bg-gray-200 rounded"
          onClick={() => handleClick(meta?.currentPage + 1)}
          disabled={meta?.currentPage === meta?.lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default URLTable;
