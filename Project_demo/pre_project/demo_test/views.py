from django.shortcuts import render, get_object_or_404
import random
from django.http import JsonResponse
from demo_test.models import Tests as TestsModel
from django.core import serializers
import json
# Create your views here.

def Main(request):
    return render(request,"index.html")

def TestsView(request):
    return render(request,"tests.html")

def Testner(request):
    test_id = request.GET.get('test_id')
    if test_id:
        test = get_object_or_404(TestsModel, id=test_id)
        # Convert test data to JSON for the template
        test_data = {
            'id': test.id,
            'test_title': test.test_title,
            'content': test.content,
            'created': test.created.isoformat(),
            'updated': test.updated.isoformat()
        }
        return render(request, "testenter.html", {'test_data': json.dumps(test_data)})
    return render(request, "testenter.html")

def Dictionary(request):
    return render(request,"dictionary.html")

def Quiz(request):
    return render(request,"testenter.html")


class Dictionary_en_ru:
    def __init__(self):
        self.dictionary = []
        with open("..\\ENRUS.txt", "r") as file:
            list_words = file.readlines()
            for line in range(0,len(list_words)-1,2):
                 self.dictionary.append((list_words[line], list_words[line+1]))
    def dicti(self):
        return self.dictionary

def Update_Word(request):
    dictionary=Dictionary_en_ru()
    dect = dictionary.dicti()
    random_pair = random.choice(dect)
    return JsonResponse({'word':random_pair[0],'translate':random_pair[1]})
def Get_dictionary(request):
    dictionary=Dictionary_en_ru()
    dect = dictionary.dicti()
    return JsonResponse({'dictionary':dect})
def Get_tests(request):
    tests = TestsModel.objects.all()
    tests_data = []
    for test in tests:
        tests_data.append({
            'id': test.id,
            'test_title': test.test_title,
            'content': test.content,
            'created': test.created.isoformat(),
            'updated': test.updated.isoformat()
        })
    return JsonResponse({'tests': tests_data})
def Get_test(request, test_id):
    test = get_object_or_404(TestsModel, id=test_id)
    test_data = {
        'id': test.id,
        'test_title': test.test_title,
        'content': test.content,
        'created': test.created.isoformat(),
        'updated': test.updated.isoformat()
    }
    return JsonResponse(test_data)

class Question:
    def __init__(self):
        self.Num_Right_Answer = 0
        self.Question = str()
        self.Answers = list(4)

class Json_test:
    def __init__(self):
        self.questions_count = 0
        self.Questions =list()
        
