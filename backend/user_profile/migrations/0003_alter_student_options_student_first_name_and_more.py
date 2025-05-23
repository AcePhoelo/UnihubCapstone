# Generated by Django 5.2 on 2025-05-11 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_alter_student_options_alter_student_badges_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='student',
            options={'ordering': ['last_name', 'first_name'], 'verbose_name': 'Student', 'verbose_name_plural': 'Students'},
        ),
        migrations.AddField(
            model_name='student',
            name='first_name',
            field=models.CharField(blank=True, help_text="The student's first name.", max_length=50, null=True, verbose_name='First Name'),
        ),
        migrations.AddField(
            model_name='student',
            name='last_name',
            field=models.CharField(blank=True, help_text="The student's last name.", max_length=50, null=True, verbose_name='Last Name'),
        ),
        migrations.AddField(
            model_name='student',
            name='middle_name',
            field=models.CharField(blank=True, help_text="The student's middle name(s). Optional.", max_length=100, null=True, verbose_name='Middle Name(s)'),
        ),
    ]
