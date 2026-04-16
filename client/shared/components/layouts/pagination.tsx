"use client";

import Link from "next/link";

import {
	Pagination as UiPagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/shared/components/ui/pagination";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	pathname: string;
	query?: Record<string, string | number | undefined>;
};

const createPageHref = (
	pathname: string,
	page: number,
	query?: Record<string, string | number | undefined>,
) => {
	const params = new URLSearchParams();

	Object.entries(query ?? {}).forEach(([key, value]) => {
		if (value === undefined || value === null || key === "page") {
			return;
		}
		params.set(key, String(value));
	});

	params.set("page", String(page));
	return `${pathname}?${params.toString()}`;
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, idx) => idx + 1);
	}

	if (currentPage <= 3) {
		return [1, 2, 3, 4, "ellipsis", totalPages] as const;
	}

	if (currentPage >= totalPages - 2) {
		return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
	}

	return [
		1,
		"ellipsis",
		currentPage - 2,
		currentPage - 1,
		currentPage,
		currentPage + 1,
		currentPage + 2,
		"ellipsis",
		totalPages,
	] as const;
};

export const Pagination = ({ currentPage, totalPages, pathname, query }: PaginationProps) => {
	if (totalPages <= 1) {
		return null;
	}

	const pages = getVisiblePages(currentPage, totalPages);
	const prevPage = Math.max(1, currentPage - 1);
	const nextPage = Math.min(totalPages, currentPage + 1);

	return (
		<UiPagination className="mt-8">
			<PaginationContent>
				<PaginationItem>
					{currentPage === 1 ? (
						<PaginationPrevious href={createPageHref(pathname, prevPage, query)} aria-disabled />
					) : (
						<PaginationPrevious href={createPageHref(pathname, prevPage, query)} />
					)}
				</PaginationItem>

				{pages.map((page, index) =>
					page === "ellipsis" ? (
						<PaginationItem key={`ellipsis-${index}`}>
							<PaginationEllipsis />
						</PaginationItem>
					) : (
						<PaginationItem key={page}>
							<PaginationLink
								href={createPageHref(pathname, page, query)}
								isActive={page === currentPage}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					),
				)}

				<PaginationItem>
					{currentPage === totalPages ? (
						<PaginationNext href={createPageHref(pathname, nextPage, query)} aria-disabled />
					) : (
						<PaginationNext href={createPageHref(pathname, nextPage, query)} />
					)}
				</PaginationItem>
			</PaginationContent>
		</UiPagination>
	);
};
