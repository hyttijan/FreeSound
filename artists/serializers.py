from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token



class TokenSerializer(serializers.ModelSerializer):

	class Meta:
		model = Token
		fields = ('key', 'user')

class FreeSoundUserSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(required=False)
	password = serializers.CharField(write_only=True)
	profile_picture = serializers.ImageField(required=False,allow_empty_file=True)
	class Meta:
		model = FreeSoundUser
		fields = ('id','username','first_name','last_name','email','profile_picture','password')

	
	def create(self, *args, **kwargs):
			user = super().create(*args, **kwargs)
			p = user.password
			user.set_password(p)
			user.save()
			return user

class GenreSerializer(serializers.ModelSerializer):
	class Meta:
		model = Genre
		fields = '__all__'

class AudioSerializer(serializers.ModelSerializer):
	
	class Meta:
		model = Audio
		fields = '__all__'


class PostCollectionSerializer(serializers.ModelSerializer):
	description = serializers.CharField(required=False,allow_blank=True,allow_null=True)
	audio_set = AudioSerializer(many=True,read_only=True)
	class Meta:
		model = Collection
		fields = ('id','name','description','creator','genre', 'audio_set')

class CollectionSerializer(serializers.ModelSerializer):
	creator =  FreeSoundUserSerializer(read_only=True)
	audio_set = AudioSerializer(many=True,read_only=True)
	class Meta:
		model = Collection
		fields = ('id','name','description','creator','genre', 'audio_set')


