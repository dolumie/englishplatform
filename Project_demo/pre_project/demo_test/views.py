from django.shortcuts import render
import random
from django.http import JsonResponse
# Create your views here.

def Main(request):
    return render(request,"index.html")

def Tests(request):
    return render(request,"tests.html")

def Testner(request):
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

class Question:
    def __init__(self):
        self.Num_Right_Answer = 0
        self.Question = str()
        self.Answers = list(4)

class Json_test:
    def __init__(self):
        self.questions_count = 0
        self.Questions =list()
        
