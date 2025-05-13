from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('clubs', '0008_alter_club_banner_alter_club_logo'),
    ]

    operations = [
        migrations.RunSQL(
            """
            -- Make sure user_profile_student has proper primary key
            ALTER TABLE user_profile_student MODIFY id INT NOT NULL AUTO_INCREMENT;
            
            -- Make sure it's indexed
            ALTER TABLE user_profile_student ADD PRIMARY KEY (id);
            """,
            "SELECT 1;"
        ),
        
        migrations.RunSQL(
            """
            -- Drop existing foreign keys
            SET FOREIGN_KEY_CHECKS=0;
            
            -- Create new constraints with proper case
            ALTER TABLE clubs_club
            ADD CONSTRAINT clubs_club_president_fk
            FOREIGN KEY (president_id) REFERENCES user_profile_student(id);
            
            ALTER TABLE clubs_clubmembership
            ADD CONSTRAINT clubs_clubmembership_student_fk
            FOREIGN KEY (student_id) REFERENCES user_profile_student(id);
            
            SET FOREIGN_KEY_CHECKS=1;
            """,
            """
            SET FOREIGN_KEY_CHECKS=0;
            ALTER TABLE clubs_club DROP FOREIGN KEY clubs_club_president_fk;
            ALTER TABLE clubs_clubmembership DROP FOREIGN KEY clubs_clubmembership_student_fk;
            SET FOREIGN_KEY_CHECKS=1;
            """
        )
    ]