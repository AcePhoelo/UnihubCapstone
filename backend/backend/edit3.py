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
    
    print("Checking data types of student-related ID fields...")
    # Check all relevant column types
    cursor.execute("DESCRIBE user_profile_student id;")
    student_id = cursor.fetchone()
    cursor.execute("DESCRIBE clubs_club president_id;")
    president_id = cursor.fetchone()
    cursor.execute("DESCRIBE clubs_clubmembership student_id;")
    membership_student_id = cursor.fetchone()
    
    print(f"user_profile_student.id: {student_id}")
    print(f"clubs_club.president_id: {president_id}")
    print(f"clubs_clubmembership.student_id: {membership_student_id}")
    
    # Modify all to INT(8) for consistency
    print("Converting all to INT(8) for consistency...")
    
    # Drop constraints first to avoid errors
    try:
        cursor.execute("ALTER TABLE clubs_club DROP FOREIGN KEY clubs_club_president_fk;")
        print("Dropped constraint clubs_club_president_fk")
    except Exception as e:
        print(f"Could not drop constraint clubs_club_president_fk: {e}")
        
    try:
        cursor.execute("ALTER TABLE clubs_clubmembership DROP FOREIGN KEY clubs_clubmembership_student_fk;")
        print("Dropped constraint clubs_clubmembership_student_fk")
    except Exception as e:
        print(f"Could not drop constraint clubs_clubmembership_student_fk: {e}")
    
    # Update columns to INT(8)
    cursor.execute("ALTER TABLE user_profile_student MODIFY id INT(8) NOT NULL AUTO_INCREMENT;")
    print("Modified user_profile_student.id to INT(8)")
    
    cursor.execute("ALTER TABLE clubs_club MODIFY president_id INT(8);")
    print("Modified clubs_club.president_id to INT(8)")
    
    cursor.execute("ALTER TABLE clubs_clubmembership MODIFY student_id INT(8);")
    print("Modified clubs_clubmembership.student_id to INT(8)")
    
    # Recreate constraints
    cursor.execute("""
    ALTER TABLE clubs_club
    ADD CONSTRAINT clubs_club_president_fk
    FOREIGN KEY (president_id) REFERENCES user_profile_student(id)
    ON DELETE SET NULL;
    """)
    print("Added constraint clubs_club_president_fk")
    
    cursor.execute("""
    ALTER TABLE clubs_clubmembership
    ADD CONSTRAINT clubs_clubmembership_student_fk
    FOREIGN KEY (student_id) REFERENCES user_profile_student(id)
    ON DELETE CASCADE;
    """)
    print("Added constraint clubs_clubmembership_student_fk")
    
    # Re-enable foreign key checks and commit
    cursor.execute("SET FOREIGN_KEY_CHECKS=1;")
    db.commit()
    print("Database updated successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    db.rollback()
finally:
    db.close()