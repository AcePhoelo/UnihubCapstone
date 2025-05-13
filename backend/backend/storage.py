from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings
import os
from django.core.files.storage import FileSystemStorage
import tempfile

class S3StorageWithPath(S3Boto3Storage):
    """Base S3 storage class with path method implementation"""
    
    def path(self, name):
        """
        Return a local temporary path for the file.
        This is needed because Django sometimes expects local file paths.
        """
        # If Django needs a path, we'll use a temp file path
        # This isn't a real path to the S3 file, but can satisfy Django's requirements
        return os.path.join(tempfile.gettempdir(), name)

class ClubLogoStorage(S3StorageWithPath):
    location = settings.AWS_CLUB_LOGO_LOCATION
    file_overwrite = False

class ClubBannerStorage(S3StorageWithPath):
    location = settings.AWS_CLUB_BANNER_LOCATION
    file_overwrite = False

class EventBannerStorage(S3StorageWithPath):
    location = settings.AWS_EVENT_BANNER_LOCATION
    file_overwrite = False

class ProfilePictureStorage(S3StorageWithPath):
    location = settings.AWS_PROFILE_PICTURE_LOCATION
    file_overwrite = False