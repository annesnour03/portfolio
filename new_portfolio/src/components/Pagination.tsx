import React, { ReactNode } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

import { DOTS, usePagination } from "hooks/usePagination";
import { twMerge } from "tailwind-merge";

const PaginateButton: React.FC<{
  children: ReactNode;
  className?: string; // New prop for additional class names
  onClick?: () => void;
}> = ({ children, onClick, className }) => {
  const classname =
    "cursor-pointer leading-[1.43] min-w-[32px] bg-gray-600 mx-1.5 flex justify-center rounded-full h-8 items-center p-0.5 text-center text-xs tracking-tighter text-black";

  return (
    <div className={twMerge(classname, className)} onClick={onClick}>
      {children}
    </div>
  );
};

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className={twMerge("mt-3 flex w-full justify-center", className)}>
      <PaginateButton
        onClick={onPrevious}
        className={twMerge(
          "bg-transparent",
          currentPage === 1 ? "pointer-events-none" : null
        )}
      >
        <GoChevronLeft color={currentPage === 1 ? "grey" : "white"} size={20} />
      </PaginateButton>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <PaginateButton
              className="pointer-events-none"
              key={`${pageNumber}${index}`}
            >
              &#8230;
            </PaginateButton>
          );
        }

        return (
          <PaginateButton
            className={`${
              pageNumber === currentPage ? "bg-gray-200" : "hover:bg-gray-300"
            }`}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginateButton>
        );
      })}

      <PaginateButton
        onClick={onNext}
        className={twMerge(
          "bg-transparent",
          currentPage === lastPage ? "pointer-events-none" : null
        )}
      >
        <GoChevronRight
          color={currentPage === lastPage ? "grey" : "white"}
          size={20}
        />
      </PaginateButton>
    </div>
  );
};

export default Pagination;
