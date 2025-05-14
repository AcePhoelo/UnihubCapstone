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
    
    print("Checking existing constraints...")
    # Check constraints on the add_event_event table
    cursor.execute("""
    SELECT CONSTRAINT_NAME, REFERENCED_TABLE_NAME 
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
    WHERE TABLE_SCHEMA = DATABASE() 
    AND TABLE_NAME = 'add_event_event'
    AND REFERENCED_TABLE_NAME IS NOT NULL;
    """)
    constraints = cursor.fetchall()
    print(f"Existing constraints: {constraints}")
    
    # Drop the problematic constraint if it exists
    try:
        cursor.execute("ALTER TABLE add_event_event DROP FOREIGN KEY add_event_event_ibfk_1;")
        print("Dropped constraint add_event_event_ibfk_1")
    except Exception as e:
        print(f"Could not drop constraint 'add_event_event_ibfk_1': {e}")
        # Try with other potential constraint names
        try:
            cursor.execute("ALTER TABLE add_event_event DROP FOREIGN KEY add_event_event_club_id_fk;")
            print("Dropped constraint add_event_event_club_id_fk")
        except Exception as e:
            print(f"Could not drop constraint 'add_event_event_club_id_fk': {e}")
    
    # Check actual table cases
    cursor.execute("SHOW TABLES LIKE 'clubs_club';")
    clubs_table = cursor.fetchone()
    print(f"Found clubs table: {clubs_table}")
    
    # Check data types of columns
    cursor.execute("DESCRIBE clubs_club id;")
    club_id = cursor.fetchone()
    cursor.execute("DESCRIBE add_event_event club_id;")
    event_club_id = cursor.fetchone()
    
    print(f"clubs_club.id: {club_id}")
    print(f"add_event_event.club_id: {event_club_id}")
    
    # Ensure data types match
    if club_id and event_club_id and club_id[1] != event_club_id[1]:
        cursor.execute(f"ALTER TABLE add_event_event MODIFY club_id {club_id[1]};")
        print(f"Modified add_event_event.club_id to {club_id[1]}")
    
    # Create a new constraint with correct case sensitivity
    try:
        cursor.execute("""
        ALTER TABLE add_event_event
        ADD CONSTRAINT add_event_event_club_id_fk
        FOREIGN KEY (club_id) REFERENCES clubs_club(id)
        ON DELETE CASCADE;
        """)
        print("Added constraint add_event_event_club_id_fk")
    except Exception as e:
        print(f"Could not add constraint: {e}")
    
    # Re-enable foreign key checks and commit
    cursor.execute("SET FOREIGN_KEY_CHECKS=1;")
    db.commit()
    print("Database updated successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    db.rollback()
finally:
    db.close()