import MySQLdb
import os
from dotenv import load_dotenv

load_dotenv()

db = MySQLdb.connect(
    host=os.environ.get('DB_HOST', 'unihub3.clggkwmcaggd.ap-southeast-1.rds.amazonaws.com'),
    user=os.environ.get('DB_USER', 'admin'),
    passwd=os.environ.get('DB_PASSWORD', 'Unihub+Capstone'),
    port=int(os.environ.get('DB_PORT', 3306)),
    db=os.environ.get('DB_NAME', 'unihub')
)

cursor = db.cursor()

try:
    # Disable foreign key checks
    cursor.execute("SET FOREIGN_KEY_CHECKS=0;")
    
    # Check the constraint definition
    print("Examining auth_permission foreign key constraint...")
    cursor.execute("""
    SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'auth_permission'
    AND CONSTRAINT_NAME = 'auth_permission_ibfk_1';
    """)
    constraint = cursor.fetchone()
    
    if constraint:
        print(f"Found constraint: {constraint}")
        
        # Drop the problematic constraint
        print("Dropping the constraint...")
        cursor.execute("ALTER TABLE auth_permission DROP FOREIGN KEY auth_permission_ibfk_1;")
        
        # Create a new constraint with correct case
        print("Creating new constraint with correct case...")
        cursor.execute("""
        ALTER TABLE auth_permission
        ADD CONSTRAINT auth_permission_content_type_id_fk
        FOREIGN KEY (content_type_id) REFERENCES django_content_type(id);
        """)
        print("New constraint created successfully!")
    else:
        print("Constraint not found. Let's check for similar constraints...")
        cursor.execute("""
        SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME 
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'auth_permission'
        AND REFERENCED_TABLE_NAME IS NOT NULL;
        """)
        constraints = cursor.fetchall()
        print(f"Found these constraints: {constraints}")
        
        if constraints:
            for constraint in constraints:
                if constraint[1].upper() == 'DJANGO_CONTENT_TYPE' or constraint[2].upper() == 'ID':
                    print(f"Dropping constraint {constraint[0]}...")
                    cursor.execute(f"ALTER TABLE auth_permission DROP FOREIGN KEY {constraint[0]};")
                    
            # Create a new constraint with correct case
            print("Creating new constraint with correct case...")
            cursor.execute("""
            ALTER TABLE auth_permission
            ADD CONSTRAINT auth_permission_content_type_id_fk
            FOREIGN KEY (content_type_id) REFERENCES django_content_type(id);
            """)
            print("New constraint created successfully!")
    
    # Re-enable foreign key checks and commit
    cursor.execute("SET FOREIGN_KEY_CHECKS=1;")
    db.commit()
    print("Database update completed!")
    
except Exception as e:
    print(f"Error: {e}")
    db.rollback()
    print("Changes rolled back due to error.")
finally:
    db.close()