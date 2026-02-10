import {
  formatCurrency,
  formatPercentage,
  trendingClasses,
  buildPageNumbers,
  ELLIPSIS,
  convertOHLCData,
} from "@/lib/utils";

// ============================================================
// describe() gruppiert zusammengehoerige Tests.
// test() (oder it()) definiert einen einzelnen Testfall.
// expect() prueft ob das Ergebnis stimmt.
// ============================================================

// --- formatCurrency ---------------------------------------------------
// Diese Funktion formatiert Zahlen als Waehrung (z.B. $1,234.56).
// Wir testen: normale Werte, Sonderfaelle (null/undefined/NaN),
// und die optionalen Parameter (digits, currency, showSymbol).

describe("formatCurrency", () => {
  test("formatiert eine normale Zahl als USD", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  test("formatiert 0 korrekt", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  test("gibt $0.00 zurueck bei null", () => {
    expect(formatCurrency(null)).toBe("$0.00");
  });

  test("gibt $0.00 zurueck bei undefined", () => {
    expect(formatCurrency(undefined)).toBe("$0.00");
  });

  test("gibt $0.00 zurueck bei NaN", () => {
    expect(formatCurrency(NaN)).toBe("$0.00");
  });

  test("respektiert custom digits", () => {
    expect(formatCurrency(1.5, 4)).toBe("$1.5000");
  });

  test("zeigt Zahl ohne $-Symbol wenn showSymbol=false", () => {
    const result = formatCurrency(1234.56, undefined, undefined, false);
    expect(result).toBe("1,234.56");
  });

  test("gibt 0.00 ohne Symbol zurueck bei null und showSymbol=false", () => {
    expect(formatCurrency(null, undefined, undefined, false)).toBe("0.00");
  });
});

// --- formatPercentage -------------------------------------------------
// Formatiert eine Zahl als Prozent-String (z.B. "5.3%").

describe("formatPercentage", () => {
  test("formatiert positive Prozentzahl", () => {
    expect(formatPercentage(5.34)).toBe("5.3%");
  });

  test("formatiert negative Prozentzahl", () => {
    expect(formatPercentage(-3.78)).toBe("-3.8%");
  });

  test("gibt 0.0% zurueck bei null", () => {
    expect(formatPercentage(null)).toBe("0.0%");
  });

  test("gibt 0.0% zurueck bei undefined", () => {
    expect(formatPercentage(undefined)).toBe("0.0%");
  });

  test("gibt 0.0% zurueck bei NaN", () => {
    expect(formatPercentage(NaN)).toBe("0.0%");
  });

  test("formatiert 0 korrekt", () => {
    expect(formatPercentage(0)).toBe("0.0%");
  });
});

// --- trendingClasses --------------------------------------------------
// Gibt CSS-Klassen zurueck je nachdem ob ein Wert positiv oder negativ ist.
// Wird im UI verwendet um gruen/rot darzustellen.

describe("trendingClasses", () => {
  test("gibt gruene Klassen zurueck bei positivem Wert", () => {
    const result = trendingClasses(5);
    expect(result.textClass).toBe("text-green-400");
    expect(result.bgClass).toBe("bg-green-500/10");
  });

  test("gibt rote Klassen zurueck bei negativem Wert", () => {
    const result = trendingClasses(-3);
    expect(result.textClass).toBe("text-red-400");
    expect(result.bgClass).toBe("bg-red-500/10");
  });

  test("gibt rote Klassen zurueck bei 0 (nicht positiv)", () => {
    const result = trendingClasses(0);
    expect(result.textClass).toBe("text-red-400");
  });
});

// --- buildPageNumbers -------------------------------------------------
// Baut ein Array fuer die Pagination, z.B. [1, "ellipsis", 4, 5, 6, "ellipsis", 10].
// Wichtig: Bei wenigen Seiten keine Ellipsis, bei vielen Seiten schon.

describe("buildPageNumbers", () => {
  test("zeigt alle Seiten wenn totalPages <= 5", () => {
    expect(buildPageNumbers(1, 3)).toEqual([1, 2, 3]);
    expect(buildPageNumbers(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test("zeigt Ellipsis am Ende wenn currentPage am Anfang", () => {
    // Seite 1 von 10: [1, 2, "...", 10]
    const result = buildPageNumbers(1, 10);
    expect(result[0]).toBe(1);
    expect(result).toContain(ELLIPSIS);
    expect(result[result.length - 1]).toBe(10);
  });

  test("zeigt Ellipsis am Anfang wenn currentPage am Ende", () => {
    // Seite 10 von 10: [1, "...", 9, 10]
    const result = buildPageNumbers(10, 10);
    expect(result[0]).toBe(1);
    expect(result).toContain(ELLIPSIS);
    expect(result[result.length - 1]).toBe(10);
  });

  test("zeigt Ellipsis auf beiden Seiten wenn currentPage in der Mitte", () => {
    // Seite 5 von 10: [1, "...", 4, 5, 6, "...", 10]
    const result = buildPageNumbers(5, 10);
    expect(result[0]).toBe(1);
    expect(result[result.length - 1]).toBe(10);
    expect(result).toContain(5);
    // Zwei Ellipsis erwartet
    const ellipsisCount = result.filter((p) => p === ELLIPSIS).length;
    expect(ellipsisCount).toBe(2);
  });

  test("enthaelt immer die erste und letzte Seite", () => {
    for (let page = 1; page <= 10; page++) {
      const result = buildPageNumbers(page, 10);
      expect(result[0]).toBe(1);
      expect(result[result.length - 1]).toBe(10);
    }
  });
});

// --- convertOHLCData --------------------------------------------------
// Wandelt rohe API-Daten [timestamp, open, high, low, close]
// in das Format um, das lightweight-charts erwartet.
// Filtert auch Duplikate (gleicher Timestamp) raus.

describe("convertOHLCData", () => {
  test("wandelt OHLC-Array in Objekte um", () => {
    const input: OHLCData[] = [[1700000000, 100, 110, 90, 105]];
    const result = convertOHLCData(input);

    expect(result).toEqual([
      { time: 1700000000, open: 100, high: 110, low: 90, close: 105 },
    ]);
  });

  test("filtert doppelte Timestamps raus", () => {
    const input: OHLCData[] = [
      [1700000000, 100, 110, 90, 105],
      [1700000000, 101, 111, 91, 106], // gleicher Timestamp -> wird gefiltert
      [1700001000, 200, 210, 190, 205],
    ];
    const result = convertOHLCData(input);

    expect(result).toHaveLength(2);
    expect(result[0].time).toBe(1700000000);
    expect(result[1].time).toBe(1700001000);
  });

  test("gibt leeres Array zurueck bei leerem Input", () => {
    expect(convertOHLCData([])).toEqual([]);
  });
});
