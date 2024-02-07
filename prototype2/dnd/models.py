from django.db import models 

# class New(models.Model):
#     adjective = models.CharField(max_length = 30, default = "null")
#     order = models.CharField(max_length = 300, blank=False, default="null")

class Ranking(models.Model):
    Emotional = models.JSONField(default = dict())
    Cautious = models.JSONField(default = dict())
    Gracious = models.JSONField(default = dict())
    Sacrificing = models.JSONField(default = dict())
    Rational = models.JSONField(default = dict())
