from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tests(models.Model):
    test_title = models.CharField(max_length=250)
    content = models.JSONField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class PassTests(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    test = models.ForeignKey(Tests,on_delete=models.CASCADE)
    reated = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)