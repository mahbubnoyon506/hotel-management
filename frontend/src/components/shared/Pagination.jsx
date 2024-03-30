import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

const Pagination = ({ page, pages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <div className=" flex items-center gap-2">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          {" "}
          <FaAnglesLeft
            className={`${page === 1 ? "text-gray-400" : "text-sky-600"}`}
            size={20}
          />{" "}
        </button>
        {pageNumbers.map((number) => (
          <div
            className={`px-4 py-2 cursor-pointer border border-gray-200 rounded ${
              page === number ? "bg-sky-600 text-white" : ""
            }`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </div>
        ))}
        <button
          disabled={page === pages}
          onClick={() => onPageChange(page + 1)}
        >
          {" "}
          <FaAnglesRight
            className={`${pages === page ? "text-gray-400" : "text-sky-600"}`}
            size={20}
          />{" "}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
