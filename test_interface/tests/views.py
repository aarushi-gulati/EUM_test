from django.shortcuts import render, redirect
from django.db import transaction
from django.http import HttpResponse
from .models import TestInfo
from .forms import SCOrderingForm, SIOrderingForm, OPOrderingForm

EUM_I_defaultOrder = ['Rational', 'Sacrificing', 'Gracious', 'Cautious', 'Emotional', 'Competitive', 'Sympathetic', 'Uninhibited', 'Collaborative', 'Dutiful', 'Fair', 'Tactful', 'Tough', 'Dynamic', 'Steady']
EUM_O_defaultOrder = ['Flexible', 'Collaborative', 'Efficient', 'Hierarchical', 'Benevolent', 'Strategic', 'Ethical', 'Informal', 'Caring', 'Diligent', 'Empowering', 'Personalized', 'Decisive', 'Creative', 'Expedient', 'Demanding', 'Diplomatic', 'Ambitious', 'Protective', 'Disciplined']

def delAllObjects(request):
    TestInfo.objects.all().delete()
    return HttpResponse("")

def saved(request):
    return render(request, 'eum_i/saved.html')

# EUM I Functions
def take_EUM_I_test(request):
    return render(request, "eum_i/i_home.html")

def i_SC_ranking(request):
    return render(request, 'eum_i/i_SC_ranking.html')

def i_SI_ranking(request):
    return render(request, 'eum_i/i_SI_ranking.html')

def i_OP_ranking(request):
    return render(request, 'eum_i/i_OP_ranking.html')

def i_Confirm(request):
    return render(request, 'eum_i/i_Confirm.html')

def i_save_sc_ordering(request):
    form = SCOrderingForm(request.POST)
    rankingObject = TestInfo()
    rankingObject.save()
    testId = int(rankingObject.testId)
    rankingObject.testType = 'EUM-I'
    populateSCRankings(form, rankingObject, EUM_I_defaultOrder)
    print(testId)
    return render(request, 'eum_i/i_SI_ranking.html', {'testId': testId})

def i_save_si_ordering(request):
    testId = request.GET.get('testId', None)
    print(testId)
    form = SIOrderingForm(request.POST)
    if testId is not None:
        rankingObject = TestInfo.objects.get(testId=testId)
        populateSIRankings(form, rankingObject, EUM_I_defaultOrder)
    else:
        return HttpResponse("testId is missing in the URL parameters.")
    return render(request, 'eum_i/i_OP_ranking.html', {'testId': testId})

def i_save_op_ordering(request):
    form = OPOrderingForm(request.POST)
    testId = request.GET.get('testId', None)
    if testId is not None:
        rankingObject = TestInfo.objects.get(testId=testId)
        populateOPRankings(form, rankingObject, EUM_I_defaultOrder)
    else:
        return HttpResponse("testId is missing in the URL parameters.")
    return redirect(saved)


# EUM O Functions
def take_EUM_O_test(request):
    return render(request, "eum_o/home.html")

def o_SC_ranking(request):
    return render(request, 'eum_o/SC_ranking.html')

def o_SI_ranking(request):
    return render(request, 'eum_o/SI_ranking.html')

def o_OP_ranking(request):
    return render(request, 'eum_o/OP_ranking.html')

def o_save_sc_ordering(request):
    form = SCOrderingForm(request.POST)
    rankingObject = TestInfo()
    rankingObject.save()
    testId = int(rankingObject.testId)
    rankingObject.testType = 'EUM-O'
    populateSCRankings(form, rankingObject, EUM_O_defaultOrder)
    print(testId)
    return render(request, 'eum_o/SI_ranking.html', {'testId': testId})

def o_save_si_ordering(request):
    testId = request.GET.get('testId', None)
    print(testId)
    form = SIOrderingForm(request.POST)
    if testId is not None:
        rankingObject = TestInfo.objects.get(testId=testId)
        populateSIRankings(form, rankingObject, EUM_O_defaultOrder)
    else:
        return HttpResponse("testId is missing in the URL parameters.")
    return render(request, 'eum_o/OP_ranking.html', {'testId': testId})

def o_save_op_ordering(request):
    form = OPOrderingForm(request.POST)
    testId = request.GET.get('testId', None)
    if testId is not None:
        rankingObject = TestInfo.objects.get(testId=testId)
        populateOPRankings(form, rankingObject, EUM_O_defaultOrder)
    else:
        return HttpResponse("testId is missing in the URL parameters.")
    return redirect(saved)

# common population
@transaction.atomic
def populateSCRankings(form, rankingObject, defaultOrder):
    if form.is_valid():
        ordered_ids = form.cleaned_data["ordering"][1:-1].split(',')
        with transaction.atomic():
            for adjective in defaultOrder:
                rankingObject.SC[adjective] = ordered_ids.index(adjective) + 1

        rankingObject.save()
        return

@transaction.atomic
def populateSIRankings(form, rankingObject, defaultOrder):
    if form.is_valid():
        ordered_ids = form.cleaned_data["ordering"][1:-1].split(',')
        with transaction.atomic():
            for adjective in defaultOrder:
                rankingObject.SI[adjective] = ordered_ids.index(adjective) + 1
        rankingObject.save()
        return

@transaction.atomic
def populateOPRankings(form, rankingObject, defaultOrder):
    if form.is_valid():
        ordered_ids = form.cleaned_data["ordering"][1:-1].split(',')
        with transaction.atomic():
            for adjective in defaultOrder:
                rankingObject.OP[adjective] = ordered_ids.index(adjective) + 1
        rankingObject.save()
        return

