from rest_framework import status,viewsets,routers, permissions
from rest_framework.parsers import FormParser,MultiPartParser,JSONParser
from .permissions import IsOwnerOrReadOnly,AllowCreate
from .models import *
from django_filters import rest_framework as filters
from .permissions import *
from .serializers import *
from django.shortcuts import render


class FreeSoundUserViewSet(viewsets.ModelViewSet):
	queryset = FreeSoundUser.objects.all()
	serializer_class = FreeSoundUserSerializer
	parser_classes = (MultiPartParser,FormParser)
	permission_classes = [AllowCreate]


class GenreViewSet(viewsets.ModelViewSet):
	queryset = Genre.objects.all()
	serializer_class = GenreSerializer

class CollectionViewSet(viewsets.ModelViewSet):
	queryset = Collection.objects.all()
	filter_backends = (filters.DjangoFilterBackend,)
	filterset_fields = ('genre','creator',)
	permission_classes = [IsOwnerOrReadOnly]
	def get_serializer_class(self):
		if self.action == 'create':
			return PostCollectionSerializer
		else:
			return CollectionSerializer


class AudioViewSet(viewsets.ModelViewSet):
	queryset = Audio.objects.all()
	serializer_class = AudioSerializer
	parser_classes = (MultiPartParser,FormParser)
	permission_classes = [IsOwnerOrReadOnly]



def index(request,id=None):
	return render(request, 'index.html')

router = routers.SimpleRouter()
router.register('users', FreeSoundUserViewSet)
router.register('genres', GenreViewSet)
router.register('collections', CollectionViewSet)
router.register('audios', AudioViewSet)
