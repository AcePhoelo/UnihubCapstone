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
    print("Examining add_event_event foreign key constraint...")
    cursor.execute("""
    SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'add_event_event'
    AND CONSTRAINT_NAME = 'add_event_event_ibfk_2';
    """)
    constraint = cursor.fetchone()
    
    if constraint:
        print(f"Found constraint: {constraint}")
        
        # Drop the problematic constraint
        print("Dropping the constraint...")
        cursor.execute("ALTER TABLE add_event_event DROP FOREIGN KEY add_event_event_ibfk_2;")
        
        # Create a new constraint with correct case
        print("Creating new constraint with correct case...")
        cursor.execute("""
        ALTER TABLE add_event_event
        ADD CONSTRAINT add_event_created_by_id_fk
        FOREIGN KEY (created_by_id) REFERENCES auth_user(id);
        """)
        print("New constraint created successfully!")
    else:
        print("Constraint not found. Let's check for similar constraints...")
        cursor.execute("""
        SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME 
        FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
        WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'add_event_event'
        AND REFERENCED_TABLE_NAME IS NOT NULL;
        """)
        constraints = cursor.fetchall()
        print(f"Found these constraints: {constraints}")
        
        # Look for any constraint referencing AUTH_USER
        user_constraint = None
        for c in constraints:
            if c[1].upper() == 'AUTH_USER':
                user_constraint = c[0]
                break
                
        if user_constraint:
            print(f"Dropping constraint {user_constraint}...")
            cursor.execute(f"ALTER TABLE add_event_event DROP FOREIGN KEY {user_constraint};")
            
            # Create a new constraint with correct case
            print("Creating new constraint with correct case...")
            cursor.execute("""
            ALTER TABLE add_event_event
            ADD CONSTRAINT add_event_created_by_id_fk
            FOREIGN KEY (created_by_id) REFERENCES auth_user(id);
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