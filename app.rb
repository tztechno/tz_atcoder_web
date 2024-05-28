require 'sinatra'

get '/' do
  <<-HTML
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>abc077b</title>
  </head>
  <body>
      <h1>abc053a</h1>
      <p>
          すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
      </p>
      <form id="squareForm">
          <label for="N">Select your rate:</label>
          <input type="range" name="N" id="N" min="0" max="5000" value="1200" required>
          <span id="rateValue">1200</span> <!-- Span to display selected value -->
          <br>
          <input type="submit" value="Submit">
      </form>

      <p id="output"></p>

      <script>
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
              document.getElementById('output').innerText = "RATE: " + N + "\\nCONTEST: " + ANS;
          });
      </script>

  </body>
  </html>
  HTML
end
