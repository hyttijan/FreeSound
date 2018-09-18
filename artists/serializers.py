from rest_framework import serializers
from .models import *

class FreeSoundUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = FreeSoundUser
		fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Genre

class CollectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Collection

class AudioSerializer(serializers.ModelSerializer):
	class Meta:
		model = Audio