import shutil

# Path to your database file
db_path = "mydatabase"
backup_path = "mydatabase_backup.sqlite3"

# Create a backup
shutil.copy(db_path, backup_path)
print(f"Backup created: {backup_path}")