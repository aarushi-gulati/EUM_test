from django import forms

class OrderingForm(forms.Form):
    ordering = forms.CharField(max_length=300)
class SIOrderingForm(forms.Form):
    ordering = forms.CharField(max_length=300)

class SCOrderingForm(forms.Form):
    ordering = forms.CharField(max_length=300)

class OPOrderingForm(forms.Form):
    ordering = forms.CharField(max_length=300)
