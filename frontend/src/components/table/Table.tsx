import Paper from "@mui/material/Paper";
import tableStyles from "./Table.module.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { JSX } from "react";
import { TableSortLabel, Typography } from "@mui/material";
import { SortDirection } from "../../enums/enums";
import type { TableHeader } from "./TableInterfaces";

interface TableProps {
  tableHeaders: Record<string, TableHeader>;
  sortBy: string;
  sortDirection: SortDirection;
}

interface Data {
  name: string;
  mmr: number;
  race: string;
}

function createData(name: string, mmr: number, race: string): Data {
  return {
    name,
    mmr,
    race,
  };
}

const rows = [
  createData("Cupcake", 305, "Zerg"),
  createData("Donut", 452, "Zerg"),
  createData("Eclair", 262, "Zerg"),
  createData("Frozen yoghurt", 159, "Zerg"),
  createData("Gingerbread", 1231, "Zerg"),
  createData("Honeycomb", 211, "Zerg"),
  createData("Ice cream sandwich", 323, "Zerg"),
  createData("Jelly Bean", 375, "Zerg"),
  createData("KitKat", 518, "Zerg"),
  createData("Lollipop", 392, "Zerg"),
  createData("Marshmallow", 318, "Zerg"),
  createData("Nougat", 360, "Zerg"),
  createData("Oreo", 437, "Zerg"),
];

export default function BasicTable(props: TableProps): JSX.Element {
  const basicTableHead = (): JSX.Element => {
    const tableHeaderCells: JSX.Element[] = [];
    Object.values(props.tableHeaders).forEach(
      (header: TableHeader, index: number) => {
        const text = <span>{header.text}</span>;
        tableHeaderCells.push(
          <TableCell
            key={`tableCell_${header.text}_${index}`}
            size={header.size}
          >
            <Typography variant="body2">{text}</Typography>
          </TableCell>
        );
      }
    );

    return (
      <TableHead>
        <TableRow>{tableHeaderCells}</TableRow>
      </TableHead>
    );
  };

  const basicTableBody = (): JSX.Element => {
    const tableRows = [] as JSX.Element[];
    rows.forEach((row, index) => {
      tableRows.push(
        <TableRow key={index}>
          <TableCell>
            <Typography variant="body2">{row.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{row.mmr}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2">{row.race}</Typography>
          </TableCell>
        </TableRow>
      );
    });

    return <TableBody>{tableRows}</TableBody>;
  };

  return (
    <TableContainer className={[tableStyles.tableContainer].join(" ")}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {basicTableHead()}
        {basicTableBody()}
      </Table>
    </TableContainer>
  );
}
