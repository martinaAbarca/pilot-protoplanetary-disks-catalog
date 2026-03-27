from pathlib import Path
import csv

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
CSV_FILE = DATA_DIR / "disks_master.csv"
OUTPUT_FILE = DATA_DIR / "catalog_summary.md"


def read_csv_file(path):
    with path.open("r", encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def clean_value(value):
    if value is None:
        return "—"
    value = str(value).strip()
    return value if value else "—"


def build_markdown_table(rows):
    headers = [
        "Disk",
        "Distance (pc)",
        "Stellar mass (M☉)",
        "Spectral type",
        "Morphology",
        "Planet evidence"
    ]

    lines = []
    lines.append("| " + " | ".join(headers) + " |")
    lines.append("|" + "|".join(["---"] * len(headers)) + "|")

    for row in rows:
        lines.append(
            "| "
            + " | ".join([
                clean_value(row["disk_name"]),
                clean_value(row["distance_pc"]),
                clean_value(row["stellar_mass_msun"]),
                clean_value(row["spectral_type"]),
                clean_value(row["disk_morphology"]),
                clean_value(row["evidence_of_planets"]),
            ])
            + " |"
        )

    return "\n".join(lines)


def main():
    if not CSV_FILE.exists():
        print(f"No existe el archivo: {CSV_FILE}")
        return

    rows = read_csv_file(CSV_FILE)
    table_md = build_markdown_table(rows)

    with OUTPUT_FILE.open("w", encoding="utf-8") as f:
        f.write("## Catalog summary\n\n")
        f.write(table_md)
        f.write("\n")

    print(f"Tabla generada en: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()