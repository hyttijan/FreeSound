from rest_framework import status,viewsets,routers, permissions
from rest_framework.parsers import FormParser,MultiPartParser
from .models import *
from django_filters import rest_framework as filters
from .permissions import *
from .serializers import *


class FreeSoundUserViewSet(viewsets.ModelViewSet):
	queryset = FreeSoundUser.objects.all()
	serializer_class = FreeSoundUserSerializer
	parser_classes = (MultiPartParser,FormParser)
	permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly)

class GenreViewSet(viewsets.ModelViewSet):
	queryset = Genre.objects.all()
	serializer_class = GenreSerializer

class CollectionViewSet(viewsets.ModelViewSet):
	queryset = Collection.objects.all()
	serializer_class = CollectionSerializer
	filter_backends = (filters.DjangoFilterBackend,)
	filterset_fields = ('genre',)

class AudioViewSet(viewsets.ModelViewSet):
	queryset = Audio.objects.all()
	serializer_class = AudioSerializer
	parser_classes = (MultiPartParser,FormParser)


router = routers.SimpleRouter()

router.register('users', FreeSoundUserViewSet)
router.register('genres', GenreViewSet)
router.register('collections', CollectionViewSet)
router.register('audios', AudioViewSet)
