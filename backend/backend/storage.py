from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings

class ClubLogoStorage(S3Boto3Storage):
    location = settings.AWS_CLUB_LOGO_LOCATION
    file_overwrite = False

class ClubBannerStorage(S3Boto3Storage):
    location = settings.AWS_CLUB_BANNER_LOCATION
    file_overwrite = False

class EventBannerStorage(S3Boto3Storage):
    location = settings.AWS_EVENT_BANNER_LOCATION
    file_overwrite = False

class ProfilePictureStorage(S3Boto3Storage):
    location = settings.AWS_PROFILE_PICTURE_LOCATION
    file_overwrite = False