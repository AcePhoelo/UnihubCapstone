import shutil
import os

# Paths to the current database and the backup file
current_db_path = "mydatabase"
backup_db_path = "mydatabase_backup.sqlite3"

# Check if the backup file exists
if os.path.exists(backup_db_path):
    # Restore the backup by replacing the current database file
    shutil.copy(backup_db_path, current_db_path)
    print(f"Database restored from {backup_db_path} to {current_db_path}")
else:
    print(f"Backup file {backup_db_path} does not exist. Restore failed.")