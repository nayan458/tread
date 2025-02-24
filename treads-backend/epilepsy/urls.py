from django.urls import re_path, path
from . import views

urlpatterns = [
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),
    path('',views.index, name='index'),   
    path('aedtarget/', views.aedtargetpage, name='aedtargetpage'),
    re_path('result', views.result, name='result'),
]