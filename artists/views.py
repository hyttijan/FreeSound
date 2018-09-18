from rest_framework import status,viewsets,routers
from .models import *
from .serializers import *
# Create your views here.

class FreeSoundUserViewSet(viewsets.ModelViewSet):
	queryset = FreeSoundUser.objects.all()
	serializer_class = FreeSoundUserSerializer

class GenreViewSet(viewsets.ModelViewSet):
	queryset = Genre.objects.all()
	serializer_class = GenreSerializer

class CollectionViewSet(viewsets.ModelViewSet):
	queryset = Collection.objects.all()
	serializer_class = CollectionSerializer

class AudioViewSet(viewsets.ModelViewSet):
	queryset = Audio.objects.all()
	serializer_class = AudioSerializer

router = routers.SimpleRouter()

router.register('users', FreeSoundUserViewSet)
router.register('genres', GenreViewSet)
router.register('collections', CollectionViewSet)
router.register('audios', AudioViewSet)
