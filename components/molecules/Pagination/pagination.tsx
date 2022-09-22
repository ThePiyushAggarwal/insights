import humanizeNumber from "lib/utils/humanizeNumber";
import React, { useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import PaginationGotoPage from "../PaginationGotoPage/pagination-goto-page";
interface PaginationProps {
  pages: number[];
  totalPage: number; // represents the total number of pages available from the source
  page: number; // represents the current active page
  pageSize?: number; // represents the maximum number of pages button that  are visible in a single page
  onPageChange: (page: number) => void; //  callback function invoked with the updated page value when the page is changed
  divisor?: boolean;
  goToPage?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

const Pagination = ({
  pages,
  totalPage,
  page,
  divisor = true,
  goToPage = false,
  pageSize = 5,
  hasPreviousPage = false,
  hasNextPage = true
}: PaginationProps): JSX.Element => {
  // This logics are meant for testing purpose
  const [selected, setSelected] = useState<number>(1);
  const handleSelected = (pageNumber: number) => {
    setSelected(pageNumber);
  };
  const handleNext = () => {
    setSelected((prev) => prev + 1);
  };
  const handlePrev = () => {
    setSelected((prev) => prev - 1);
  };

  return (
    <div className=" w-max flex gap-x-4 items-center ">
      <div className="flex items-center gap-x-4">
        <button className="text-light-slate-9 disabled:text-light-slate-7" disabled={!hasPreviousPage ? true : false} onClick={() => handleNext()}>
          <RiArrowLeftSLine onClick={() => handlePrev()} className="text-lg  " />
        </button>
        {pages.map((page, index) => {
          return (
            index < pageSize && (
              <div
                key={index}
                onClick={() => handleSelected(page)}
                className={`${
                  // this check  will be updated from page to currentPage when the implemetation of logic is ready
                  selected === page &&
                  "border !text-light-slate-12 shadow-paginate border-light-orange-10 bg-light-orange-2 shadow-search"
                } cursor-pointer text-light-slate-11 transition font-medium text-sm px-[13px]  py-[6px] rounded-lg `}
              >
                {page}
              </div>
            )
          );
        })}

        <button  className="text-light-slate-9 disabled:text-light-slate-7" disabled={!hasNextPage ? true : false} onClick={() => handleNext()}>
          <RiArrowRightSLine className="text-lg" />
        </button>
      </div>
      <div
        className={`${
          divisor && "border-r-2 border-r-light-slate-6"
        } text-sm text-light-slate-9 font-medium  py-1 pr-4`}
      >
        Total {totalPage > 999 ? humanizeNumber(totalPage, null) : totalPage} pages
      </div>
      {goToPage && <PaginationGotoPage currentPage={page} name={""} />}
    </div>
  );
};
export default Pagination;