from . import views
from django.urls import path
urlpatterns = [
	path('',views.index,name='index'),
	path('user/<int:id>/',views.index,name='index'),
	path('genre/<int:id>/',views.index,name='index'),
	path('signup',views.index,name='index')
]