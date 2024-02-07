from django.contrib import admin
from django.urls import path, re_path
from . import views
from django.views.generic import RedirectView
# from django.conf.urls import url

urlpatterns = [
    path('admin/', admin.site.urls),
    path('test/', views.takeTest),
    path('SC_ranking/', views.SC_ranking, name='SC_ranking'),
    path('SI_ranking/', views.SI_ranking, name='SI_ranking'),
    path('OP_ranking/', views.OP_ranking, name='OP_ranking'),
    path('saved/', views.saved, name="saved"),
    path('del/', views.delAllObjects),
    path('save-group-ordering', views.save_new_ordering, name='save-group-ordering'),
    re_path(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),
]
