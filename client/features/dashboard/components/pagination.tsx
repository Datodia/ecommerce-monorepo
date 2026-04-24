"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
};

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) => {
  const hasResults = totalItems > 0;
  const safePage = Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1));
  const startItem = hasResults ? (safePage - 1) * itemsPerPage + 1 : 0;
  const endItem = hasResults ? Math.min(safePage * itemsPerPage, totalItems) : 0;

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safePage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (safePage >= totalPages - 1) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(safePage - 1);
        pages.push(safePage);
        pages.push(safePage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <p className="text-sm text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} results
      </p>

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1 || totalPages <= 1}
        >
          <ChevronLeft className="size-4" />
        </Button>

        {getPageNumbers().map((page, idx) => (
          <div key={idx}>
            {page === "..." ? (
              <span className="px-2 text-muted-foreground">...</span>
            ) : (
              <Button
                size="sm"
                variant={page === safePage ? "default" : "outline"}
                onClick={() => onPageChange(page as number)}
                className="min-w-10"
              >
                {page}
              </Button>
            )}
          </div>
        ))}

        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages || totalPages <= 1}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
