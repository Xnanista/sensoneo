import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type Updater,
} from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as React from "react";
import { Button } from "src/components/button";
import { Label } from "src/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/select";
import { Skeleton } from "src/components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/table";
import { Tabs, TabsList, TabsTrigger } from "src/components/tabs";
import ProductsListQuery from "src/hooks/query/products/useProductsListQuery";
import { productsTableColumns } from "./products-table.columns";
import { useProductsPageSearchParams } from "./products-table.utils";

function ProductsTable() {
  const [searchParams, setSearchParams] = useProductsPageSearchParams();
  const { data, isFetching } = ProductsListQuery.useQuery(searchParams);

  const tablePagination = React.useMemo(() => {
    return {
      pageIndex: data?.pagination.currentPage
        ? data.pagination.currentPage - 1
        : 0,
      pageSize: data?.pagination.itemsPerPage || 0,
      totalCount: data?.pagination.totalItems || 0,
    };
  }, [data]);

  const handlePaginationChange = React.useCallback(
    (getNext: Updater<PaginationState>) => {
      const next =
        typeof getNext === "function" ? getNext(tablePagination) : getNext;

      setSearchParams((old) => ({
        ...old,
        page: next.pageIndex + 1,
        limit: next.pageSize,
      }));
    },
    [setSearchParams, tablePagination]
  );

  const handleFilterChange = React.useCallback(
    (filter: string) => {
      setSearchParams((old) => ({
        ...old,
        active:
          filter === "all" ? undefined : filter === "active" ? true : false,
      }));
    },
    [setSearchParams]
  );

  const table = useReactTable({
    data: data?.data ?? [],
    columns: productsTableColumns,
    state: {
      pagination: tablePagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    manualPagination: true,
    manualFiltering: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onPaginationChange: handlePaginationChange,
  });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg">
          Products ({data?.pagination.totalItems ?? 0})
        </h3>
        <Tabs
          defaultValue="all"
          value={
            searchParams.active !== undefined
              ? searchParams.active
                ? "active"
                : "inactive"
              : "all"
          }
          onValueChange={handleFilterChange}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="overflow-hidden rounded-lg border">
        <Table style={{ tableLayout: "auto" }}>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
            {!isFetching && table.getRowModel().rows?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={productsTableColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              [...new Array(searchParams.limit)].map((_, index) => (
                <TableRow key={index}>
                  {productsTableColumns.map((column) => (
                    <TableCell key={column.id}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit mt-4 mb-4">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {data?.pagination.currentPage ?? 1} of{" "}
            {data?.pagination.totalPages ?? 1}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!data?.pagination.hasPreviousPage}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!data?.pagination.hasPreviousPage}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!data?.pagination.hasNextPage}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() =>
                table.setPageIndex((data?.pagination.totalPages ?? 1) - 1)
              }
              disabled={!data?.pagination.hasNextPage}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductsTable;
