from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token

class TokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = Token
        fields = ('key', 'user')

class FreeSoundUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = FreeSoundUser
		fields = ('username','first_name','last_name','email','profile_picture')

class GenreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Genre
		fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
	class Meta:
		model = Audio
		fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
	audio_set = AudioSerializer(many=True)
	class Meta:
		model = Collection
		fields = ('id','name','description','creator','genre', 'audio_set')

class SingleGenreSerializer(serializers.ModelSerializer):
	collections = CollectionSerializer(many=True,read_only=True)
	class Meta:
		model = Genre
		fields = '__all__'

