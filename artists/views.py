from rest_framework import status,viewsets,routers, permissions
from rest_framework.parsers import FormParser,MultiPartParser,JSONParser
from rest_framework.permissions import AllowAny
from .permissions import IsOwnerOrReadOnly
from .models import *
from django_filters import rest_framework as filters
from .permissions import *
from .serializers import *



class FreeSoundUserViewSet(viewsets.ModelViewSet):
	queryset = FreeSoundUser.objects.all()
	serializer_class = FreeSoundUserSerializer
	parser_classes = (MultiPartParser,FormParser)
	def get_permissions(self):
		if self.request.method == 'DELETE' or self.request.method == 'PUT':
			return [IsOwnerOrReadOnly()]
		else:
			print(self.request.data)
			return [AllowAny()]
		


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
