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

	def create(self, validated_data):
		data = validated_data.copy()
		data['creator'] = self.context['request'].user
		return super(AudioSerializer, self).create(data)

class CollectionSerializer(serializers.ModelSerializer):
	creator = FreeSoundUserSerializer(read_only=True)
	audio_set = AudioSerializer(many=True,read_only=True)
	class Meta:
		model = Collection
		fields = ('id','name','description','creator','genre', 'audio_set')

