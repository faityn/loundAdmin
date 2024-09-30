import { totalPageAtom } from "@/atom";
import React from "react";
import { useRecoilValue } from "recoil";

interface Props {
  currentPage: number;
  pageUrl: string;
}

const Pagination = ({ currentPage, pageUrl }: Props) => {
  const nPages = useRecoilValue(totalPageAtom);
  const currPage = currentPage - 1;
  const startPage = currentPage - 3;

  const pageNumbers =
    currPage <= 3
      ? [...Array.from(Array(nPages).keys())].slice(0, 5)
      : [...Array.from(Array(nPages).keys())].slice(startPage, currentPage + 2);

  return (
    <>
      <nav aria-label="Page navigation example notranslate">
        <ul className="flex items-center -mx-[6px]">
          <li className="px-[5px]">
            <a
              href={`${pageUrl}&page=1`}
              className={`
              ${currentPage == 1 ? "pointer-events-none" : ""}
              w-9
            h-9
            pb-1
            flex
            items-center
            justify-center
            rounded-3xl
            border border-[#EDEFF1]
            text-black text-base
            bg-white
            hover:bg-primary hover:border-primary hover:text-white `}
            >
              &#8249;&#8249;
            </a>
          </li>
          <li className="px-[5px]">
            <a
              href={`${pageUrl}&page=${currentPage - 1}`}
              className={`
              ${currentPage == 1 ? "pointer-events-none" : ""}
              w-9
            h-9
            pb-1
            flex
            items-center
            justify-center
            rounded-3xl
            border border-[#EDEFF1]
            text-black text-base
            bg-white
            hover:bg-primary hover:border-primary hover:text-white `}
            >
              &#8249;
            </a>
          </li>
          {pageNumbers &&
            pageNumbers.map((pageNumber) => (
              <li key={pageNumber + 1} className="px-[5px]">
                <a
                  href={`${pageUrl}&page=${pageNumber + 1}`}
                  className={`w-9
            h-9
            flex
            items-center
            justify-center
            rounded-3xl
            border border-[#EDEFF1]
            text-black text-base
            
            hover:bg-primary hover:border-primary hover:text-white ${
              currentPage === pageNumber + 1
                ? "bg-primary text-white"
                : "bg-white"
            } `}
                >
                  {pageNumber + 1}
                </a>
              </li>
            ))}
          <li>
            <a
              href={`${pageUrl}&page=${currentPage + 1}`}
              className={`${
                currentPage == nPages ? "pointer-events-none" : ""
              } w-9
              h-9
              pb-1
              flex
              items-center
              justify-center
              rounded-3xl
              border border-[#EDEFF1]
              text-black text-base
              bg-white
              hover:bg-primary hover:border-primary hover:text-white  `}
            >
              &#x203A;
            </a>
          </li>
          <li>
            <a
              href={`${pageUrl}&page=${nPages}`}
              className={`${
                currentPage == nPages ? "pointer-events-none" : ""
              } w-9
              h-9
              pb-1
              flex
              items-center
              justify-center
              rounded-3xl
              border border-[#EDEFF1]
              text-black text-base
              bg-white
              hover:bg-primary hover:border-primary hover:text-white  `}
            >
              &#x203A;&#x203A;
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
