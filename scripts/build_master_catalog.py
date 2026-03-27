from pathlib import Path
import json
import csv

ROOT = Path(__file__).resolve().parent.parent
DISKS_DIR = ROOT / "data" / "disks"
MASTER_CSV = ROOT / "data" / "disks_master.csv"
MASTER_JSON = ROOT / "data" / "disks_master.json"

MASTER_FIELDS = [
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


def load_disk_json(path: Path):
    text = path.read_text(encoding="utf-8").strip()

    if not text:
        print(f"Saltando archivo vacio: {path.name}")
        return None

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        print(f"JSON invalido en {path.name}: {e}")
        return None


def extract_value(entry, key, default=None):
    value = entry.get(key, default)

    if isinstance(value, dict) and "value" in value:
        return value["value"]

    return value


def normalize_for_json(value):
    if value is None:
        return None
    return value


def normalize_for_csv(value):
    if value is None:
        return ""

    if isinstance(value, list):
        return ";".join(str(v) for v in value)

    return str(value)


def build_master_entry(disk_data):
    return {
        "disk_name": extract_value(disk_data, "disk_name"),
        "star_name": extract_value(disk_data, "star_name"),
        "distance_pc": normalize_for_json(extract_value(disk_data, "distance_pc")),
        "stellar_mass_msun": normalize_for_json(extract_value(disk_data, "stellar_mass_msun")),
        "spectral_type": extract_value(disk_data, "spectral_type"),
        "estimated_age_myr": normalize_for_json(extract_value(disk_data, "estimated_age_myr")),
        "disk_morphology": extract_value(disk_data, "disk_morphology"),
        "dust_rings_au": normalize_for_json(extract_value(disk_data, "dust_rings_au", [])),
        "dust_gaps_au": normalize_for_json(extract_value(disk_data, "dust_gaps_au", [])),
        "gas_tracers": normalize_for_json(extract_value(disk_data, "gas_tracers", [])),
        "continuum_wavelength_mm": normalize_for_json(extract_value(disk_data, "continuum_wavelength_mm")),
        "main_instruments": normalize_for_json(extract_value(disk_data, "main_instruments", [])),
        "evidence_of_planets": extract_value(disk_data, "evidence_of_planets"),
        "main_references": normalize_for_json(extract_value(disk_data, "main_references", [])),
        "page_file": extract_value(disk_data, "page_file"),
    }


def save_master_json(entries):
    with MASTER_JSON.open("w", encoding="utf-8") as f:
        json.dump(entries, f, indent=2, ensure_ascii=False)


def save_master_csv(entries):
    with MASTER_CSV.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=MASTER_FIELDS)
        writer.writeheader()

        for entry in entries:
            csv_row = {
                "disk_name": normalize_for_csv(entry["disk_name"]),
                "star_name": normalize_for_csv(entry["star_name"]),
                "distance_pc": normalize_for_csv(entry["distance_pc"]),
                "stellar_mass_msun": normalize_for_csv(entry["stellar_mass_msun"]),
                "spectral_type": normalize_for_csv(entry["spectral_type"]),
                "estimated_age_myr": normalize_for_csv(entry["estimated_age_myr"]),
                "disk_morphology": normalize_for_csv(entry["disk_morphology"]),
                "dust_rings_au": normalize_for_csv(entry["dust_rings_au"]),
                "dust_gaps_au": normalize_for_csv(entry["dust_gaps_au"]),
                "gas_tracers": normalize_for_csv(entry["gas_tracers"]),
                "continuum_wavelength_mm": normalize_for_csv(entry["continuum_wavelength_mm"]),
                "main_instruments": normalize_for_csv(entry["main_instruments"]),
                "evidence_of_planets": normalize_for_csv(entry["evidence_of_planets"]),
                "main_references": normalize_for_csv(entry["main_references"]),
                "page_file": normalize_for_csv(entry["page_file"]),
            }
            writer.writerow(csv_row)


def main():
    if not DISKS_DIR.exists():
        print(f"No existe la carpeta: {DISKS_DIR}")
        return

    disk_files = sorted(DISKS_DIR.glob("*.json"))

    if not disk_files:
        print("No se encontraron archivos JSON en data/disks/")
        return

    master_entries = []

    for disk_file in disk_files:
        disk_data = load_disk_json(disk_file)
        if disk_data is None:
            continue

        master_entry = build_master_entry(disk_data)

        if not master_entry["disk_name"]:
            print(f"Saltando {disk_file.name}: falta disk_name")
            continue

        master_entries.append(master_entry)

    if not master_entries:
        print("No se pudieron construir entradas validas para el catalogo maestro.")
        return

    save_master_json(master_entries)
    save_master_csv(master_entries)

    print(f"Catalogo maestro JSON generado en: {MASTER_JSON}")
    print(f"Catalogo maestro CSV generado en: {MASTER_CSV}")
    print(f"Total de discos procesados: {len(master_entries)}")


if __name__ == "__main__":
    main()