from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator

class FreeSoundUser(AbstractUser):
	profile_picture = models.ImageField(upload_to="profile_pictures")

class Genre(models.Model):
	name = models.CharField(unique=True,max_length=30)
	description = models.CharField(max_length=800)

	def __str__(self):
		return self.name

class Collection(models.Model):
	creator = models.ForeignKey('FreeSoundUser',on_delete=models.CASCADE)
	genre = models.ForeignKey('Genre',on_delete=models.CASCADE)
	name = models.CharField(unique=True,max_length=30)
	description = models.CharField(max_length=800,null=True)

	def __str__(self):
		return self.name

class Audio(models.Model):
	creator = models.ForeignKey('FreeSoundUser',on_delete=models.CASCADE)
	genre = models.ForeignKey('Genre',on_delete=models.CASCADE)
	collection = models.ForeignKey('collection',on_delete=models.CASCADE)
	name = models.CharField(unique=True,max_length=30)
	description = models.CharField(max_length=800)
	audio_file = models.FileField(upload_to="audios",validators=[FileExtensionValidator(['mp3'])])

	def __str__(self):
		return self.name