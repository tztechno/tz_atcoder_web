// Get elements
var slider = document.getElementById('N');
var output = document.getElementById('rateValue');

// Display the default value
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = this.value;
};

document.getElementById('squareForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    var N = parseInt(document.getElementById('N').value);
    var ANS;
    if (N < 1200) {
        ANS = "ABC";
    } else {
        ANS = "ARC";
    }
    document.getElementById('output').innerText = "RATE: " + N + "\nCONTEST: " + ANS;
});