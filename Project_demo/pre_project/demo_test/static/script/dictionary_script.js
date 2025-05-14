const navigation_alphabet = document.getElementById("nav_alpha");
const content = document.getElementById("content");
content.classList.add("dictionary-content");
let dictionary = [];

// Create popup elements
const popup = document.createElement("div");
popup.classList.add("translation-popup");
popup.style.display = "none";
popup.style.position = "fixed";
popup.style.padding = "15px";
popup.style.backgroundColor = "white";
popup.style.border = "1px solid #ccc";
popup.style.borderRadius = "5px";
popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
popup.style.zIndex = "1000";

// Create close button for popup
const closeButton = document.createElement("button");
closeButton.textContent = "×";
closeButton.style.position = "absolute";
closeButton.style.right = "5px";
closeButton.style.top = "5px";
closeButton.style.border = "none";
closeButton.style.background = "none";
closeButton.style.fontSize = "20px";
closeButton.style.cursor = "pointer";
popup.appendChild(closeButton);

// Create content container for popup
const popupContent = document.createElement("div");
popup.appendChild(popupContent);

// Add popup to body
document.body.appendChild(popup);

// Close popup when clicking outside
document.addEventListener("click", (e) => {
    if (!popup.contains(e.target) && !e.target.classList.contains("word")) {
        popup.style.display = "none";
    }
});

// Close popup when clicking close button
closeButton.addEventListener("click", () => {
    popup.style.display = "none";
});

function displayWords(letter) {
    // Clear previous content
    content.innerHTML = '';
    
    // Check if dictionary is loaded
    if (dictionary.length === 0) {
        content.innerHTML = '<p>Loading dictionary... Please try again in a moment.</p>';
        return;
    }

    let filtered_dictionary = filter_dictionary(letter);
    
    if (filtered_dictionary.length === 0) {
        content.innerHTML = '<p>No words found starting with ' + letter + '</p>';
        return;
    }

    filtered_dictionary.forEach(wordPair => {
        const word_element = document.createElement("div");
        word_element.classList.add("word");
        const englishWord = wordPair[0];
        const translation = wordPair[1];
        word_element.textContent = englishWord;
        
        // Add click event for popup
        word_element.addEventListener("click", (e) => {
            e.stopPropagation();
            
            // Set popup content
            popupContent.innerHTML = `
                <div style="margin-bottom: 10px;">
                    <strong>English:</strong> ${englishWord}
                </div>
                <div>
                    <strong>Translation:</strong> ${translation}
                </div>
            `;
            
            // Position popup near the clicked word
            const rect = word_element.getBoundingClientRect();
            popup.style.left = `${rect.left}px`;
            popup.style.top = `${rect.bottom + 5}px`;
            
            // Show popup
            popup.style.display = "block";
        });

        content.appendChild(word_element);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Fetch dictionary data with error handling
    fetch("api/get-dictionary")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            dictionary = data.dictionary;
            // Display words starting with 'A' by default
            displayWords('A');
        })
        .catch(error => {
            console.error('Error loading dictionary:', error);
            alert('Failed to load dictionary. Please try again later.');
        });

    let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    
    alphabet.forEach(letter => {
        const letter_element = document.createElement("button");
        letter_element.classList.add("letter");
        letter_element.textContent = letter;
        
        // Add active class to 'A' by default
        if (letter === 'A') {
            letter_element.classList.add('active');
        }
        
        letter_element.addEventListener("click", () => {
            // Remove active class from all letters
            document.querySelectorAll('.letter').forEach(el => el.classList.remove('active'));
            // Add active class to clicked letter
            letter_element.classList.add('active');
            
            displayWords(letter);
        });
        
        navigation_alphabet.appendChild(letter_element);
    });
});

function filter_dictionary(letter) {
    return dictionary.filter(wordPair => 
        wordPair[0].charAt(0).toUpperCase() === letter.toUpperCase()
    );
}

