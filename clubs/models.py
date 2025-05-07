from django.db import models

class Club(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    president = models.ForeignKey(
        'user_profile.Student',  # Reference the Student model
        on_delete=models.SET_NULL,  # If the president is deleted, set this field to NULL
        null=True,
        blank=True,
        related_name='president_clubs',
        verbose_name="President",
        help_text="The president of the club."
    )
    logo = models.ImageField(
        upload_to='club_logos/',
        null=True,
        blank=True,
        verbose_name="Club Logo",
        help_text="The logo of the club."
    )
    banner = models.ImageField(
        upload_to='club_banners/',
        null=True,
        blank=True,
        verbose_name="Club Banner",
        help_text="The banner image of the club."
    )
    members = models.ManyToManyField(
        'user_profile.Student',
        through='ClubMembership',
        through_fields=('club', 'student'),
        related_name='joined_clubs',
        verbose_name="Members",
        help_text="Students who are members of this club."
    )

    def __str__(self):
        return self.name



# class Member(models.Model):
#     POSITION_CHOICES = [
#         ('Member', 'Member'),
#         ('Executive Committee', 'Executive Committee'),
#         ('Head of Department', 'Head of Department'),
#         ('Treasurer', 'Treasurer'),
#         ('Secretary', 'Secretary'),
#         ('Vice President', 'Vice President'),
#         ('President', 'President'),
#     ]


#     student = models.ForeignKey(
#         'user_profile.Student',
#         on_delete=models.CASCADE,
#         related_name='memberships',
#         verbose_name="Student",
#         help_text="The student who is a member of the club."
#     )

#     position = models.CharField(
#         max_length=50,
#         choices=POSITION_CHOICES,
#         default='Member',
#         verbose_name="Position",
#         help_text="The position of the student in the club."
#     )
#     custom_position = models.CharField(
#         max_length=100,
#         null=True,
#         blank=True,
#         verbose_name="Custom Position",
#         help_text="A custom position assigned to the student."
#     )

#     def __str__(self):
#         return f"{self.student.full_name} ({self.custom_position or self.position})"
    
class ClubMembership(models.Model):
    POSITION_CHOICES = [
        ('Member', 'Member'),
        ('Executive Committee', 'Executive Committee'),
        ('Head of Department', 'Head of Department'),
        ('Treasurer', 'Treasurer'),
        ('Secretary', 'Secretary'),
        ('Vice President', 'Vice President'),
        ('President', 'President'),
    ]

    student = models.ForeignKey('user_profile.Student', on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    position = models.CharField(max_length=50, choices=POSITION_CHOICES, default='Member')
    custom_position = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        unique_together = ('student', 'club')
        ordering = ['position', 'student__full_name']

    def __str__(self):
        return f"{self.student.full_name} - {self.club.name} ({self.position})"