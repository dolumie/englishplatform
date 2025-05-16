import sys
import os
import django
import json
from demo_test.models import Tests

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pre_project.settings")
django.setup()


try:
    with open(r'C:\Users\alex\Desktop\Project_demo\pre_project\demo_test\import_tests\Tests.json', 'r', encoding='utf-8') as f:  
        tests = json.load(f)
        print(f"Найдено {len(tests)} тестов для импорта.")

        for i, test in enumerate(tests, start=1):
            try:
                # 3. Проверяем, что test - это словарь (если JSON содержит список объектов)
                if not isinstance(test, dict):
                    print(f"Ошибка: данные теста {i} не являются словарём!")
                    continue

                # 4. Создаём запись с проверкой валидации
                new_test = Tests.objects.create(
                    test_title=f"Test {i}",
                    content=test
                )
                new_test.full_clean()  # Проверяем валидность данных
                print(f"Добавлен тест {i}: ID {new_test.id}")
            except Exception as e:
                print(f"Ошибка при сохранении теста {i}: {e}")

except FileNotFoundError:
    print("Файл 'Tests.json' не найден! Убедитесь, что он лежит в той же папке.")
except json.JSONDecodeError:
    print("Ошибка: файл 'Tests.json' не является валидным JSON!")
except Exception as e:
    print(f"Неизвестная ошибка: {e}")