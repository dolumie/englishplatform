document.addEventListener('DOMContentLoaded', function() {
    const testsContainer = document.getElementById('cards-grid');
    testsContainer.innerHTML = '';

    // Временно вручную добавляем тесты
    const tests = [
        { id: 1, topic: 'Present Simple', type: 'Grammar', questionsCount: 2, isCompleted: false },
        { id: 2, topic: 'Present Perfect', type: 'Grammar', questionsCount: 3, isCompleted: false },
        { id: 3, topic: 'Conditionals', type: 'Grammar', questionsCount: 4, isCompleted: false },
        { id: 4, topic: 'Past Simple', type: 'Grammar', questionsCount: 2, isCompleted: false },
        { id: 5, topic: 'Present Continuous', type: 'Grammar', questionsCount: 3, isCompleted: false },
        { id: 6, topic: 'Winter', type: 'Vocabulary', questionsCount: 5, isCompleted: false }
    ];

    tests.forEach(test => {
        const card = document.createElement('a');
        card.className = 'test-card';
        card.href = `quiz.html?testId=${test.id}`;
        card.dataset.testId = test.id;

        card.innerHTML = 
            `<div class="card-header">
                <h3>${test.topic}</h3>
            </div>
            <div class="card-body">
                <p class="test-type">Type: ${test.type}</p>
                <p class="questions-count">Questions: ${test.questionsCount}</p>
            </div>`;

        testsContainer.appendChild(card);
    });
});