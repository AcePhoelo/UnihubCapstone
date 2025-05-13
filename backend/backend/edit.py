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
    
    # Modify both columns to be int(8) for consistency
    print("Changing both columns to int(8)...")
    
    # First modify the main table's primary key
    cursor.execute("ALTER TABLE user_profile_student MODIFY id INT(8) NOT NULL AUTO_INCREMENT;")
    print("Modified user_profile_student.id to INT(8)")
    
    # Then modify the referencing column
    cursor.execute("ALTER TABLE clubs_club MODIFY president_id INT(8);")
    print("Modified clubs_club.president_id to INT(8)")
    
    # Also check for clubs_clubmembership table
    try:
        cursor.execute("DESCRIBE clubs_clubmembership student_id;")
        if cursor.fetchone():
            cursor.execute("ALTER TABLE clubs_clubmembership MODIFY student_id INT(8);")
            print("Modified clubs_clubmembership.student_id to INT(8)")
    except Exception as e:
        print(f"No clubs_clubmembership table found: {e}")
    
    # Try to add the constraint again
    try:
        cursor.execute("""
        ALTER TABLE clubs_club
        ADD CONSTRAINT clubs_club_president_fk
        FOREIGN KEY (president_id) REFERENCES user_profile_student(id)
        ON DELETE SET NULL;
        """)
        print("Added constraint to clubs_club successfully!")
        
        # Try to add constraint to clubs_clubmembership if it exists
        try:
            cursor.execute("""
            ALTER TABLE clubs_clubmembership
            ADD CONSTRAINT clubs_clubmembership_student_fk
            FOREIGN KEY (student_id) REFERENCES user_profile_student(id)
            ON DELETE CASCADE;
            """)
            print("Added constraint to clubs_clubmembership successfully!")
        except Exception as e:
            print(f"Error or no clubs_clubmembership table: {e}")
    except Exception as e:
        print(f"Error adding constraint: {e}")
    
    # Re-enable foreign key checks and commit
    cursor.execute("SET FOREIGN_KEY_CHECKS=1;")
    db.commit()
    print("Database updated successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    db.rollback()
finally:
    db.close()