from pathlib import Path
import csv
import json

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
CSV_FILE = DATA_DIR / "disks_master.csv"
JSON_FILE = DATA_DIR / "disks_master.json"

REQUIRED_FIELDS = [
    "disk_name",
    "star_name",
    "distance_pc",
    "stellar_mass_msun",
    "spectral_type",
    "estimated_age_myr",
    "disk_morphology",
    "dust_rings_au",
    "dust_gaps_au",
    "gas_tracers",
    "continuum_wavelength_mm",
    "main_instruments",
    "evidence_of_planets",
    "main_references",
    "page_file",
]


def read_csv_file(path):
    with path.open("r", encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


def read_json_file(path):
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def check_csv_columns(rows):
    if not rows:
        print("CSV vacío.")
        return False

    csv_columns = list(rows[0].keys())
    missing = [field for field in REQUIRED_FIELDS if field not in csv_columns]

    if missing:
        print("Faltan columnas en el CSV:")
        for field in missing:
            print(f" - {field}")
        return False

    print("CSV: columnas obligatorias OK.")
    return True


def check_json_fields(items):
    if not items:
        print("JSON vacío.")
        return False

    ok = True
    for i, item in enumerate(items, start=1):
        missing = [field for field in REQUIRED_FIELDS if field not in item]
        if missing:
            print(f"Faltan campos en el objeto JSON {i}:")
            for field in missing:
                print(f" - {field}")
            ok = False

    if ok:
        print("JSON: campos obligatorios OK.")
    return ok


def compare_disk_names(csv_rows, json_items):
    csv_names = sorted(row["disk_name"].strip() for row in csv_rows)
    json_names = sorted(item["disk_name"].strip() for item in json_items)

    if csv_names != json_names:
        print("Los nombres de discos no coinciden entre CSV y JSON.")
        print("CSV :", csv_names)
        print("JSON:", json_names)
        return False

    print("CSV y JSON: nombres de discos coinciden.")
    return True


def main():
    if not CSV_FILE.exists():
        print(f"No existe el archivo: {CSV_FILE}")
        return

    if not JSON_FILE.exists():
        print(f"No existe el archivo: {JSON_FILE}")
        return

    csv_rows = read_csv_file(CSV_FILE)
    json_items = read_json_file(JSON_FILE)

    print("Validando catálogo...\n")

    ok_csv = check_csv_columns(csv_rows)
    ok_json = check_json_fields(json_items)
    ok_names = compare_disk_names(csv_rows, json_items)

    print(f"\nNúmero de discos en CSV : {len(csv_rows)}")
    print(f"Número de discos en JSON: {len(json_items)}")

    if ok_csv and ok_json and ok_names and len(csv_rows) == len(json_items):
        print("\nValidación completada: todo está consistente.")
    else:
        print("\nValidación completada: hay inconsistencias que corregir.")


if __name__ == "__main__":
    main()