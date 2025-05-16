"""
URL configuration for pre_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from demo_test import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.Main,name='main'),
    path('api/update-word',views.Update_Word,name="update_word"),
    path('tests',views.TestsView,name="tests"),
    path('testner',views.Testner,name="testner"),
    path('api/get-dictionary',views.Get_dictionary,name="get_dictionary"),
    path('dictionary',views.Dictionary,name="dictionary"),
    path('api/get-tests',views.Get_tests,name="get_tests"),
    path('api/get-test/<int:test_id>',views.Get_test,name="get_test_id")
]
