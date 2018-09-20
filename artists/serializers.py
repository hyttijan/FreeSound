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

class CollectionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Collection
		fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
	class Meta:
		model = Audio
		fields = '__all__'