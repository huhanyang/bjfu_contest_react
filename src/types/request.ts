import React from "react";

export interface PageAndSingleFieldSorterRequest {
  pagination: Pagination;
  sorter: SingleFieldSorter[];
}

export interface Pagination {
  current?: number;
  pageSize?: number;
}

export interface SingleFieldSorter {
  field?: React.Key | readonly React.Key[];
  order?: "ASC" | "DESC";
  multiple: number;
}
