import json
from django.core.management.base import BaseCommand
from demo_test.models import Tests

class Command(BaseCommand):
    help = 'Import tests from Tests.json file'

    def handle(self, *args, **kwargs):
        try:
            with open('pre_project/demo_test/import_tests/Tests.json', 'r') as file:
                tests_data = json.load(file)
                
                for i, test in enumerate(tests_data, 1):
                    Tests.objects.create(
                        test_title=f"English Test {i}",
                        content=test
                    )
                    self.stdout.write(self.style.SUCCESS(f'Successfully imported test {i}'))
                
                self.stdout.write(self.style.SUCCESS('All tests have been imported successfully'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error importing tests: {str(e)}')) 