from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser


class FreeSoundUser(AbstractUser):
	profile_picture = models.ImageField(upload_to="profile_pictures")

class Genre(models.Model):
	name = models.CharField(unique=True,max_length=30)
	description = models.CharField(max_length=800)

class Collection(models.Model):
	creator = models.ForeignKey('FreeSoundUser',on_delete=models.SET_NULL,null=True)
	genre = models.ForeignKey('Genre',on_delete=models.SET_NULL,null=True)
	name = models.CharField(unique=True,max_length=30)
	description = models.CharField(max_length=800)

class Audio(models.Model):
	creator = models.ForeignKey('FreeSoundUser',on_delete=models.SET_NULL,null=True)
	collection = models.ForeignKey('collection',on_delete=models.SET_NULL,null=True)
	name = models.CharField(unique=True,max_length=30)
	description = models.CharField(max_length=800)
	audio_file = models.FileField(upload_to="audios")