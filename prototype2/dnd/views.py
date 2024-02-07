from django.db import transaction
from django.shortcuts import redirect, render
from django.http import HttpResponse

from dnd.forms import SIOrderingForm, SCOrderingForm, OPOrderingForm
from dnd.models import Ranking

def delAllObjects(request):
    Ranking.objects.all().delete()
    return HttpResponse("all deleted.")

def takeTest(request):
    return render(request, "home.html")

def SC_ranking(request):
    return render(request, 'SC_ranking.html')

def SI_ranking(request):
    return render(request, 'SI_ranking.html')

def OP_ranking(request):
    return render(request, 'OP_ranking.html')

def saved(request):
    return render(request, 'saved.html')

@transaction.atomic
def save_new_ordering(request):
    SI_form = SIOrderingForm(request.POST)
    SC_form = SCOrderingForm(request.POST)
    OP_form = OPOrderingForm(request.POST)
    group = Ranking()

    def createOrdering(form, keyVal, group, current_order):
        if form.is_valid():
            ordered_ids = form.cleaned_data["ordering"][1:-1].split(',')
            with transaction.atomic():
                for adjective in ordered_ids:
                    if adjective == "Emotional":
                        group.Emotional[keyVal] = current_order
                    elif adjective == "Cautious":
                        group.Cautious[keyVal] = current_order
                    elif adjective == "Gracious":
                        group.Gracious[keyVal] = current_order
                    elif adjective == "Sacrificing":
                        group.Sacrificing[keyVal] = current_order
                    else:
                        group.Rational[keyVal] = current_order
                    current_order += 1
                

    createOrdering(SI_form, 'SI', group, 1)
    createOrdering(SC_form, 'SC', group, 1)
    createOrdering(OP_form, 'OP', group, 1)
    group.save()
    return redirect(saved)


