import sqlite3
import os
import datetime
import re

def get_database_path():
    """Ask user for the SQLite database path."""
    default_db = input("Enter SQLite database path (or press Enter to search for .db files): ").strip()
    
    if default_db and os.path.exists(default_db):
        return default_db
    
    # Search for .db files in the project directory
    print("Searching for SQLite databases...")
    db_files = []
    for root, dirs, files in os.walk(os.path.dirname(os.path.abspath(__file__))):
        for file in files:
            if file.endswith('.db'):
                db_files.append(os.path.join(root, file))
    
    if not db_files:
        raise FileNotFoundError("No SQLite database files found in the project directory")
    
    print("Found the following database files:")
    for i, db_file in enumerate(db_files, 1):
        print(f"{i}. {db_file}")
    
    choice = int(input("Select a database by number: "))
    return db_files[choice-1]

def get_output_path():
    """Ask user for the output SQL file path."""
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    default_output = f"mariadb_dump_{timestamp}.sql"
    output_path = input(f"Enter output SQL file path (default: {default_output}): ").strip()
    return output_path if output_path else default_output

def sqlite_type_to_mariadb(sqlite_type):
    """Convert SQLite data types to MariaDB compatible types."""
    sqlite_type = sqlite_type.upper()
    
    # Handle common type conversions
    if sqlite_type == 'INTEGER PRIMARY KEY AUTOINCREMENT':
        return 'INT AUTO_INCREMENT PRIMARY KEY'
    elif 'INTEGER' in sqlite_type:
        return sqlite_type.replace('INTEGER', 'INT')
    elif 'BLOB' in sqlite_type:
        return 'LONGBLOB'
    elif 'TEXT' in sqlite_type:
        return 'TEXT'
    elif 'REAL' in sqlite_type:
        return 'DOUBLE'
    elif 'BOOLEAN' in sqlite_type:
        return 'BOOLEAN'
    elif sqlite_type == '':
        return 'TEXT'
    else:
        return sqlite_type

def convert_create_table_statement(sqlite_statement):
    """Convert SQLite CREATE TABLE statement to MariaDB compatible syntax."""
    # Replace AUTOINCREMENT with AUTO_INCREMENT
    statement = re.sub(r'AUTOINCREMENT', 'AUTO_INCREMENT', sqlite_statement, flags=re.IGNORECASE)
    
    # Handle IF NOT EXISTS (MariaDB supports this, so no change needed)
    
    # Extract table name and columns part
    match = re.match(r'CREATE TABLE.*?\s+([^\s(]+)\s*\((.*)\)', statement, re.DOTALL)
    if not match:
        return statement
    
    table_name = match.group(1).strip('"\'[]')
    columns_part = match.group(2)
    
    # Process column definitions
    columns = []
    in_column = False
    current_column = ''
    paren_count = 0
    
    for char in columns_part:
        if char == ',' and paren_count == 0 and not in_column:
            # End of a column definition
            columns.append(current_column.strip())
            current_column = ''
            continue
        
        current_column += char
        
        if char == '(':
            paren_count += 1
            in_column = True
        elif char == ')':
            paren_count -= 1
            if paren_count == 0:
                in_column = False
                
    if current_column.strip():
        columns.append(current_column.strip())
    
    # Convert column types
    converted_columns = []
    for col in columns:
        # Check if this is a PRIMARY KEY constraint rather than a column
        if col.strip().upper().startswith('PRIMARY KEY') or col.strip().upper().startswith('FOREIGN KEY'):
            converted_columns.append(col)
            continue
        
        parts = col.split(' ', 1)
        if len(parts) == 1:
            converted_columns.append(col)
            continue
            
        col_name, col_type = parts
        converted_type = sqlite_type_to_mariadb(col_type)
        converted_columns.append(f"{col_name} {converted_type}")
    
    # Reconstruct the CREATE TABLE statement
    return f"CREATE TABLE {table_name} (\n  {',\n  '.join(converted_columns)}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;\n"

def export_sqlite_to_mariadb(sqlite_db_path, output_path):
    """Export SQLite database to MariaDB-compatible SQL dump."""
    conn = sqlite3.connect(sqlite_db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    # Get the list of tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
    tables = [row[0] for row in cursor.fetchall()]
    
    with open(output_path, 'w', encoding='utf-8') as f:
        # Write header
        f.write("-- MariaDB dump created by SQLite to MariaDB converter\n")
        f.write(f"-- Created at: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"-- Original SQLite database: {sqlite_db_path}\n\n")
        f.write("SET FOREIGN_KEY_CHECKS=0;\n")
        f.write("SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\n")
        f.write("START TRANSACTION;\n\n")
        
        # Process each table
        for table_name in tables:
            try:
                print(f"Processing table: {table_name}")
                
                # Get CREATE TABLE statement
                cursor.execute(f"SELECT sql FROM sqlite_master WHERE type='table' AND name='{table_name}';")
                create_statement = cursor.fetchone()[0]
                
                # Convert and write the CREATE TABLE statement
                f.write(f"-- Table structure for table `{table_name}`\n")
                f.write("DROP TABLE IF EXISTS `" + table_name + "`;\n")
                
                mariadb_create_statement = convert_create_table_statement(create_statement)
                f.write(mariadb_create_statement + "\n")
                
                # Get and write data
                cursor.execute(f"SELECT * FROM '{table_name}';")
                rows = cursor.fetchall()
                
                if rows:
                    f.write(f"-- Data for table `{table_name}`\n")
                    columns = [column[0] for column in cursor.description]
                    
                    for row in rows:
                        values = []
                        for value in row:
                            if value is None:
                                values.append("NULL")
                            elif isinstance(value, (int, float)):
                                values.append(str(value))
                            else:
                                # Escape string values
                                value_str = str(value).replace("'", "''")
                                values.append(f"'{value_str}'")
                        
                        f.write(f"INSERT INTO `{table_name}` (`{'`, `'.join(columns)}`) VALUES ({', '.join(values)});\n")
                    
                    f.write("\n")
                
                # Get and write indexes (except primary keys which are already in CREATE TABLE)
                try:
                    cursor.execute(f"PRAGMA index_list('{table_name}');")
                    indexes = cursor.fetchall()
                    
                    for index in indexes:
                        try:
                            # Check if 'origin' key exists
                            origin = index['origin'] if 'origin' in index else ''
                            if origin != 'pk':  # Skip primary key indexes
                                index_name = index['name']
                                cursor.execute(f"PRAGMA index_info('{index_name}');")
                                index_columns = cursor.fetchall()
                                
                                if index_columns:
                                    column_names = []
                                    for idx_col in index_columns:
                                        if 'column' in idx_col:
                                            cursor.execute(f"PRAGMA table_info('{table_name}');")
                                            table_info = cursor.fetchall()
                                            col_idx = idx_col['column']
                                            if 0 <= col_idx < len(table_info) and 'name' in table_info[col_idx]:
                                                column_names.append(f"`{table_info[col_idx]['name']}`")
                                    
                                    if column_names:
                                        unique = "UNIQUE " if index.get('unique', 0) else ""
                                        f.write(f"CREATE {unique}INDEX `{index_name}` ON `{table_name}` ({', '.join(column_names)});\n")
                        except Exception as e:
                            print(f"  Warning: Error processing index in table {table_name}: {e}")
                except Exception as e:
                    print(f"  Warning: Could not process indexes for table {table_name}: {e}")
            
            except Exception as e:
                print(f"  Error processing table {table_name}: {e}")
                continue
        
        # Write footer
        f.write("\nSET FOREIGN_KEY_CHECKS=1;\n")
        f.write("COMMIT;\n")
    
    conn.close()
    print(f"Database exported successfully to {output_path}")

def main():
    try:
        sqlite_db_path = get_database_path()
        output_path = get_output_path()
        export_sqlite_to_mariadb(sqlite_db_path, output_path)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()