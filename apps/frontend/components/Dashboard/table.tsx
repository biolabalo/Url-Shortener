import React, { useState } from "react";
import { LinkIcon } from "@heroicons/react/24/outline";

interface RowData {
  name: string;
  description: string;
  shortenedURL: string;
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

const data: RowData[] = Array(100).fill({
  name: "John Doe",
  description: "Lorem",
  shortenedURL: "https://example.com",
});

const URLTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
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
        {getCurrentPageData().map((row, index) => (
          <div key={index} className="flex border-t py-2">
            <Row value={row.name} customColor="p" />
            <Row value={row.description} />
            <div className="flex-1 py-2 px-4 text-center">
              <a
                href={row.shortenedURL}
                className="  text-[14px] font-normal text-[#667085] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.shortenedURL}
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
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${
                currentPage === index + 1
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
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default URLTable;
