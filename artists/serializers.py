from rest_framework import serializers
from .models import *

class FreeSoundUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = FreeSoundUser
		fields = '__all__'

class GenreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Genre
		fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Collection
		fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
	class Meta:
		model = Audio
		fields = '__all__'