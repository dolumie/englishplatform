document.addEventListener('DOMContentLoaded', function() {
    const testsContainer = document.getElementById('cards-grid');
    testsContainer.innerHTML = '';


    function openTestenter(testId) {
        window.location.href = `/testner?test_id=${testId}`;
    }

    
    // const tests = [
    //     { id: 1, topic: 'Present Simple', type: 'Grammar', questionsCount: 2, isCompleted: false },
    //     { id: 2, topic: 'Present Perfect', type: 'Grammar', questionsCount: 3, isCompleted: false },
    //     { id: 3, topic: 'Conditionals', type: 'Grammar', questionsCount: 4, isCompleted: false },
    //     { id: 4, topic: 'Past Simple', type: 'Grammar', questionsCount: 2, isCompleted: false },
    //     { id: 5, topic: 'Present Continuous', type: 'Grammar', questionsCount: 3, isCompleted: false },
    //     { id: 6, topic: 'Winter', type: 'Vocabulary', questionsCount: 5, isCompleted: false }
    // ];

    fetch('api/get-tests')
        .then(response => response.json())
        .then(data => {
            const tests = data.tests;
            tests.forEach(test => {
                const card = document.createElement('div');  
                card.className = 'test-card';
                card.dataset.testId = test.id;

                
                const testContent = test.content;
                const questionsCount = testContent.questions_count || testContent.Questions.length;

                card.innerHTML = 
                    `<div class="card-header">
                        <h3>${test.test_title}</h3>
                    </div>
                    <div class="card-body">
                        <p class="test-type">Type: Grammar Test</p>
                        <p class="questions-count">Questions: ${questionsCount}</p>
                    </div>`;

                
                card.addEventListener('click', () => openTestenter(test.id));
                card.style.cursor = 'pointer';  
                
                testsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching tests:', error);
        });
});