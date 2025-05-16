
class Dictionary_en_ru:
    def __init__(self):
        self.dictionary = dict()

    def convert(self):
        with open("C:\\Users\\Student\\Documents\\Project_demo\\ENRUS.txt", "r") as file:
            list_words = file.readlines()
            for line in range(0,len(list_words)-1,2):
                self.dictionary[list_words[line]] = list_words[line+1]
                

class Question:
    def __init__(self):
        self.Num_Right_Answer = 0
        self.Question = str()
        self.Answers = list(4)

class Json_test:
    def __init__(self):
        self.questions_count = 0
        self.Questions =list()
        
