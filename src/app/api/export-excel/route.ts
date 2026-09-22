import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

import { createClient } from "@/supabase/server";

export const runtime = "nodejs";

type Profile = {
  id: string;
  name: string;
};

type CashPeriod = {
  id: string;
  config_id: string;
  start_date: string;
  end_date: string;
  amount: number;
};

type CashPayment = {
  id: string;
  period_id: string;
  member_id: string;
  amount: number;
  paid_at: string | null;
  recorded_by: string | null;
  note: string | null;
};

type MonthGroup = {
  year: number;
  month: number;
  label: string;
  periods: CashPeriod[];
};

const MONTH_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  month: "long",
  year: "numeric",
});

const CURRENCY_FORMAT = '#,##0.00 "IDR"';

export async function GET() {
  try {
    const supabase = await createClient();

    // ============================================================
    // AMBIL SEMUA MEMBER / SISWA
    // ============================================================

    const { data: members, error: membersError } = await supabase
      .from("member")
      .select("id, name")
      .order("name", {
        ascending: true,
      });

    if (membersError) {
      throw new Error(`Gagal mengambil profiles: ${membersError.message}`);
    }

    // ============================================================
    // AMBIL SEMUA CASH PERIODS
    // ============================================================

    const { data: periods, error: periodsError } = await supabase
      .from("cash_periods")
      .select(
        `
        id,
        config_id,
        start_date,
        end_date,
        amount
      `,
      )
      .order("start_date", {
        ascending: true,
      });

    if (periodsError) {
      throw new Error(`Gagal mengambil cash_periods: ${periodsError.message}`);
    }

    // ============================================================
    // AMBIL SEMUA PEMBAYARAN
    // ============================================================

    const { data: payments, error: paymentsError } = await supabase
      .from("cash_payments")
      .select(
        `
        id,
        period_id,
        member_id,
        amount,
        paid_at,
        recorded_by,
        note
      `,
      )
      .order("paid_at", {
        ascending: true,
      });

    if (paymentsError) {
      throw new Error(
        `Gagal mengambil cash_payments: ${paymentsError.message}`,
      );
    }

    // ============================================================
    // TYPE GUARD / DEFAULT
    // ============================================================

    const students = (members ?? []) as Profile[];
    const cashPeriods = (periods ?? []) as CashPeriod[];
    const cashPayments = (payments ?? []) as CashPayment[];

    if (cashPeriods.length === 0) {
      return NextResponse.json(
        {
          error: "Belum ada cash_periods di database.",
        },
        {
          status: 404,
        },
      );
    }

    // ============================================================
    // KELOMPOKKAN PERIOD BERDASARKAN BULANN
    // ============================================================

    const monthMap = new Map<string, MonthGroup>();

    for (const period of cashPeriods) {
      const [yearString, monthString] = period.start_date.split("-");

      const year = Number(yearString);
      const month = Number(monthString);

      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (!monthMap.has(key)) {
        const date = new Date(Number(yearString), Number(monthString) - 1, 1);

        monthMap.set(key, {
          year,
          month,
          label: MONTH_FORMATTER.format(date),
          periods: [],
        });
      }

      monthMap.get(key)!.periods.push(period);
    }

    // ============================================================
    // SORT BULAN
    // ============================================================

    const months = [...monthMap.values()].sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }

      return a.month - b.month;
    });

    // ============================================================
    // BUAT WORKBOOK
    // ============================================================

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Aplikasi Uang Kas";
    workbook.lastModifiedBy = "Aplikasi Uang Kas";
    workbook.created = new Date();
    workbook.modified = new Date();

    // ============================================================
    // PAYMENT LOOKUP
    // ============================================================

    const paymentMap = new Map<string, CashPayment[]>();

    for (const payment of cashPayments) {
      const key = `${payment.member_id}:${payment.period_id}`;

      const existing = paymentMap.get(key);

      if (existing) {
        existing.push(payment);
      } else {
        paymentMap.set(key, [payment]);
      }
    }

    // ============================================================
    // BUAT SHEET UNTUK SETIAP BULAN
    // ============================================================

    for (const month of months) {
      const monthPeriods = [...month.periods].sort((a, b) =>
        a.start_date.localeCompare(b.start_date),
      );

      const monthName = new Date(
        month.year,
        month.month - 1,
        1,
      ).toLocaleDateString("id-ID", {
        month: "long",
      });

      // Excel sheet maksimal 31 karakter.
      const sheetName = `${monthName} ${month.year}`.slice(0, 31);

      const worksheet = workbook.addWorksheet(sheetName);

      // ========================================================
      // JUMLAH KOLOM
      //
      // A = NO
      // B = DAFTAR SISWA
      // C dst = MINGGU
      // terakhir = STATUS
      // terakhir = CATATAN
      // SUDARMAN
      // ========================================================

      const weekCount = monthPeriods.length;

      const firstWeekColumn = 3;

      const lastWeekColumn = firstWeekColumn + weekCount - 1;

      const statusColumn = lastWeekColumn + 1;

      const noteColumn = lastWeekColumn + 2;

      // ========================================================
      // COLUMN WIDTH
      // ========================================================

      worksheet.getColumn(1).width = 6;
      worksheet.getColumn(2).width = 32;

      for (let column = firstWeekColumn; column <= lastWeekColumn; column++) {
        worksheet.getColumn(column).width = 17;
      }

      worksheet.getColumn(statusColumn).width = 18;
      worksheet.getColumn(noteColumn).width = 35;

      // ========================================================
      // HEADER MERGE
      // ========================================================

      worksheet.mergeCells("A1:A2");
      worksheet.mergeCells("B1:B2");

      worksheet.mergeCells(1, firstWeekColumn, 1, lastWeekColumn);

      worksheet.mergeCells(1, statusColumn, 2, statusColumn);

      worksheet.mergeCells(1, noteColumn, 2, noteColumn);

      // ========================================================
      // HEADER VALUE
      // ========================================================

      worksheet.getCell("A1").value = "NO";

      worksheet.getCell("B1").value = "DAFTAR SISWA";

      worksheet.getCell(1, firstWeekColumn).value = monthName.toUpperCase();

      worksheet.getCell(1, statusColumn).value = "LUNAS/NUNGGAK";

      worksheet.getCell(1, noteColumn).value = "CATATAN";

      // ========================================================
      // WEEK HEADER
      // ========================================================

      monthPeriods.forEach((period, index) => {
        const column = firstWeekColumn + index;

        const cell = worksheet.getCell(2, column);

        cell.value = `MINGGU ${index + 1}`;
      });

      // ========================================================
      // HEADER STYLE
      // ========================================================

      for (let row = 1; row <= 2; row++) {
        for (let column = 1; column <= noteColumn; column++) {
          const cell = worksheet.getCell(row, column);

          cell.font = {
            bold: true,
          };

          cell.alignment = {
            horizontal: "center",
            vertical: "middle",
            wrapText: true,
          };

          cell.border = {
            top: {
              style: "thin",
            },
            left: {
              style: "thin",
            },
            bottom: {
              style: "thin",
            },
            right: {
              style: "thin",
            },
          };
        }
      }

      worksheet.getRow(1).height = 30;
      worksheet.getRow(2).height = 30;

      // ========================================================
      // DATA SISWA
      // ========================================================

      students.forEach((student, studentIndex) => {
        const rowNumber = studentIndex + 3;

        const row = worksheet.getRow(rowNumber);

        // ----------------------------
        // NO
        // ----------------------------

        row.getCell(1).value = studentIndex + 1;

        // ----------------------------
        // NAMA
        // ----------------------------

        row.getCell(2).value = student.name;

        // ----------------------------
        // TRACK STATUS
        // ----------------------------

        let paidPeriodCount = 0;

        const notes: string[] = [];

        // ----------------------------
        // SETIAP MINGGU
        // ----------------------------

        monthPeriods.forEach((period, weekIndex) => {
          const column = firstWeekColumn + weekIndex;

          const key = `${student.id}:${period.id}`;

          const periodPayments = paymentMap.get(key) ?? [];

          // Kalau ada lebih dari satu payment
          // dalam satu period, jumlahkan.
          const totalPayment = periodPayments.reduce(
            (total, payment) => total + Number(payment.amount ?? 0),
            0,
          );

          if (periodPayments.length > 0) {
            paidPeriodCount++;
          }

          row.getCell(column).value =
            periodPayments.length > 0 ? totalPayment : null;

          row.getCell(column).numFmt = CURRENCY_FORMAT;

          // Ambil catatan
          for (const payment of periodPayments) {
            if (payment.note && payment.note.trim()) {
              notes.push(payment.note.trim());
            }
          }
        });

        // ====================================================
        // STATUS
        // ====================================================

        const isPaid = paidPeriodCount === monthPeriods.length;

        row.getCell(statusColumn).value = isPaid ? "LUNAS" : "NUNGGAK";

        // ====================================================
        // CATATAN
        // ====================================================

        row.getCell(noteColumn).value = [...new Set(notes)].join("; ");

        // ====================================================
        // ALIGNMENT
        // ====================================================

        row.getCell(1).alignment = {
          horizontal: "center",
          vertical: "middle",
        };

        row.getCell(2).alignment = {
          vertical: "middle",
        };

        for (let column = firstWeekColumn; column <= statusColumn; column++) {
          row.getCell(column).alignment = {
            horizontal: "center",
            vertical: "middle",
          };
        }

        row.getCell(noteColumn).alignment = {
          vertical: "middle",
          wrapText: true,
        };

        // ====================================================
        // BORDER
        // ====================================================

        for (let column = 1; column <= noteColumn; column++) {
          row.getCell(column).border = {
            top: {
              style: "thin",
            },
            left: {
              style: "thin",
            },
            bottom: {
              style: "thin",
            },
            right: {
              style: "thin",
            },
          };
        }
      });

      // ========================================================
      // TOTAL ROW
      // ========================================================

      const totalRowNumber = students.length + 3;

      const totalRow = worksheet.getRow(totalRowNumber);

      totalRow.getCell(1).value = "";

      totalRow.getCell(2).value = "TOTAL";

      totalRow.getCell(2).font = {
        bold: true,
      };

      // Total masing-masing minggu
      for (let column = firstWeekColumn; column <= lastWeekColumn; column++) {
        const letter = worksheet.getColumn(column).letter;

        const cell = totalRow.getCell(column);

        cell.value = `=SUM(${letter}3:${letter}${students.length + 2})`;

        cell.numFmt = CURRENCY_FORMAT;

        cell.font = {
          bold: true,
        };

        cell.alignment = {
          horizontal: "center",
          vertical: "middle",
        };
      }

      // ========================================================
      // TOTAL BULAN
      // ========================================================

      const firstWeekLetter = worksheet.getColumn(firstWeekColumn).letter;

      const lastWeekLetter = worksheet.getColumn(lastWeekColumn).letter;

      totalRow.getCell(statusColumn).value =
        `=SUM(${firstWeekLetter}${totalRowNumber}:${lastWeekLetter}${totalRowNumber})`;

      totalRow.getCell(statusColumn).numFmt = CURRENCY_FORMAT;

      totalRow.getCell(statusColumn).font = {
        bold: true,
      };

      totalRow.getCell(statusColumn).alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      // ========================================================
      // TOTAL LABEL
      // ========================================================

      totalRow.getCell(noteColumn).value = "TOTAL BULAN";

      totalRow.getCell(noteColumn).font = {
        bold: true,
      };

      // ========================================================
      // TOTAL BORDER
      // ========================================================

      for (let column = 1; column <= noteColumn; column++) {
        totalRow.getCell(column).border = {
          top: {
            style: "thin",
          },
          left: {
            style: "thin",
          },
          bottom: {
            style: "thin",
          },
          right: {
            style: "thin",
          },
        };
      }

      // ========================================================
      // FREEZE HEADER
      // ========================================================

      worksheet.views = [
        {
          state: "frozen",
          ySplit: 2,
        },
      ];

      // ========================================================
      // AUTO FILTER
      // ========================================================

      worksheet.autoFilter = {
        from: {
          row: 2,
          column: 1,
        },
        to: {
          row: students.length + 2,
          column: noteColumn,
        },
      };
    }

    // ============================================================
    // GENERATE XLSX
    // ============================================================

    const buffer = await workbook.xlsx.writeBuffer();

    // ============================================================
    // DOWNLOAD
    // ============================================================

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        "Content-Disposition": 'attachment; filename="laporan-uang-kas.xlsx"',

        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Export cash error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Gagal membuat laporan Excel.",
      },
      {
        status: 500,
      },
    );
  }
}
