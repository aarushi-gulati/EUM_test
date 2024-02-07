from django.db import models

class TestInfo(models.Model):
    testId = models.AutoField(primary_key=True)
    testType = models.CharField(max_length=5)
    practitionerName = models.CharField(max_length=50, default="abhay.phadnis@gmail.com")
    userName = models.CharField(max_length=50, default="Asokan")
    SC = models.JSONField(default = dict())
    SI = models.JSONField(default = dict())
    OP = models.JSONField(default = dict())