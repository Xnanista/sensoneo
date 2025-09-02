import { createColumnHelper } from "@tanstack/react-table";
import formatVolume from "src/lib/formaters/formatVolume";
import type { TProductListItem } from "src/types/products/productsList.types";

const columnHelper = createColumnHelper<TProductListItem>();

export const productsTableColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <b>{info.getValue()}</b>,
  }),
  columnHelper.accessor("packaging", {
    header: "Packaging",
    cell: (info) => <span className="capitalize">{info.getValue()}</span>,
  }),
  columnHelper.accessor("deposit", {
    header: "Deposit",
    cell: (info) => `$${Intl.NumberFormat("en-US").format(info.getValue())}`,
  }),
  columnHelper.accessor("volume", {
    header: "Volume",
    cell: (info) => formatVolume(info.getValue()),
  }),
  columnHelper.accessor("registeredAt", {
    header: "Registered At",
    cell: (info) =>
      Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(info.getValue())
      ),
  }),
];
