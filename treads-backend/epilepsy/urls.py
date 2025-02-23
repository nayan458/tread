from django.urls import re_path, path
from . import views

urlpatterns = [
    path('',views.index, name='index'),   
    path('aedtarget/', views.aedtargetpage, name='aedtargetpage'),
    re_path(r'^search/(?P<search_id>[\w\-]+)/$', views.search, name='search'),
    # re_path(r'^result/(?P<search_id>[\w\-]+)/$', views.result, name='result'),
    re_path('result', views.result, name='result'),
]