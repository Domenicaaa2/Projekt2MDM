function analyzeBird() {
    alert("Button wurde geklickt!");  // Nur zu Testzwecken
    var fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Bitte wählen Sie ein Bild aus.');
        return;
    }
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('image', file);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        let resultsHTML = '<h3>Ergebnis:</h3>';
        data.forEach(item => {
            resultsHTML += `<div class="resultItem"><span>${item.className}</span>: ${(item.probability * 100).toFixed(2)}%</div>`;
        });
        document.getElementById('result').innerHTML = resultsHTML;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = '<p style="color: red;">Fehler bei der Vogelanalyse.</p>';
    });
}
document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('analyzeButton');
    if (button) {
        button.addEventListener('click', analyzeBird);
    }
});


