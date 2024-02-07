from django.contrib import admin
from django.urls import path, re_path
from . import views
from django.views.generic import RedirectView

urlpatterns = [
    # path('admin', admin.site.register),
    # path('index/', views.render_view, name='final'),
    # path('save_ordering/', views.save_ordering, name='eumo_save_ordering'),

    path('saved/', views.saved, name="saved"),
    path('admin/', admin.site.urls),
    path('del/', views.delAllObjects),
    re_path(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),

    # EUM I Paths
    path('i_test/', views.take_EUM_I_test),
    path('i_SC_ranking/', views.i_SC_ranking, name='i_SC_ranking'),
    path('i_SI_ranking/', views.i_SI_ranking, name='i_SI_ranking'),
    path('i_OP_ranking/', views.i_OP_ranking, name='i_OP_ranking'),
    path('i_Confirm/', views.i_Confirm, name='i_Confirm'),
    path('i_save_sc_ordering/', views.i_save_sc_ordering, name='i_save_sc_ordering'),
    path('i_save_op_ordering/', views.i_save_op_ordering, name='i_save_op_ordering'),
    path('i_save_si_ordering/', views.i_save_si_ordering, name='i_save_si_ordering'),

    #EUM O Paths
    path('o_test/', views.take_EUM_O_test),
    path('o_SC_ranking/', views.o_SC_ranking, name='o_SC_ranking'),
    path('o_SI_ranking/', views.o_SI_ranking, name='o_SI_ranking'),
    path('o_OP_ranking/', views.o_OP_ranking, name='o_OP_ranking'),
    path('o_save_sc_ordering/', views.o_save_sc_ordering, name='o_save_sc_ordering'),
    path('o_save_op_ordering/', views.o_save_op_ordering, name='o_save_op_ordering'),
    path('o_save_si_ordering/', views.o_save_si_ordering, name='o_save_si_ordering'),
]