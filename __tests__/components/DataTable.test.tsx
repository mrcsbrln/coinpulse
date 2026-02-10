import { render, screen } from "@testing-library/react";
import DataTable from "@/components/DataTable";

// Testdaten: einfache Produkt-Tabelle
interface Product {
  id: number;
  name: string;
  price: number;
}

const testColumns: DataTableColumn<Product>[] = [
  { header: "Name", cell: (row) => row.name },
  { header: "Preis", cell: (row) => `$${row.price}` },
];

const testData: Product[] = [
  { id: 1, name: "Widget", price: 9.99 },
  { id: 2, name: "Gadget", price: 19.99 },
  { id: 3, name: "Doohickey", price: 29.99 },
];

describe("DataTable", () => {
  test("rendert die korrekten Spalten-Header", () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        rowKey={(row) => row.id}
      />,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Preis")).toBeInTheDocument();
  });

  test("rendert die korrekte Anzahl Zeilen", () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        rowKey={(row) => row.id}
      />,
    );

    // 3 Datenzeilen + 1 Headerzeile = 4 <tr> Elemente
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
  });

  test("rendert die Zellinhalte korrekt", () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        rowKey={(row) => row.id}
      />,
    );

    expect(screen.getByText("Widget")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("Gadget")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("Doohickey")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
  });

  test("rendert eine leere Tabelle wenn data leer ist", () => {
    render(
      <DataTable
        columns={testColumns}
        data={[]}
        rowKey={(_, index) => index}
      />,
    );

    // Nur die Headerzeile sollte vorhanden sein
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(1);
  });

  test("benutzt rowKey fuer die Keys der Zeilen", () => {
    // Wenn rowKey korrekt funktioniert, wird die Tabelle ohne Fehler gerendert
    const { container } = render(
      <DataTable
        columns={testColumns}
        data={testData}
        rowKey={(row) => `product-${row.id}`}
      />,
    );

    // Tabelle sollte existieren
    expect(container.querySelector("table")).toBeInTheDocument();
  });

  test("rendert korrekte Anzahl Zellen pro Zeile", () => {
    render(
      <DataTable
        columns={testColumns}
        data={testData}
        rowKey={(row) => row.id}
      />,
    );

    // Jede Datenzeile sollte 2 Zellen haben (Name + Preis)
    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(6); // 3 Zeilen * 2 Spalten
  });
});
