----------------------------

pip install fastapi uvicorn

main.py編集

uvicorn main:app --reload

http://127.0.0.1:8000

----------------------------

pip install jinja2
pip install python-multipart

cd myapp
uvicorn main:app --reload

http://127.0.0.1:8000

---

submitされた値の流れについて説明してこの構成では、フォームの submit イベントが発生すると、以下の流れで処理が行われます。

document.getElementById('squareForm').addEventListener('submit', function (event) { ... }) によって、フォーム送信時のイベントリスナーが設定されています。
フォームが送信されると、event.preventDefault(); が実行され、デフォルトのフォーム送信動作が抑制されます。これにより、ページが再読み込みされることを防ぎます。
var N = parseInt(document.getElementById('N').value); によって、スライダーの値が整数値として取得されます。
if (N < 1200) { ... } else { ... } の条件分岐で、レートの値に基づいて ANS 変数に "ABC" または "ARC" が代入されます。
document.getElementById('output').innerText = "RATE: " + N + "\nCONTEST: " + ANS; によって、レートの値と対応するコンテストの名前が <p id="output"></p> 要素の innerText プロパティに設定され、ページ上に表示されます。

つまり、フォームの送信時に JavaScript のイベントリスナーが実行され、スライダーの値を取得し、その値に基づいてコンテストの名前を決定し、その結果をページ上に表示するという流れになっています。
この処理はクライアントサイド (ブラウザ) で行われており、サーバーへのリクエストは送られていません。フォームの送信によってページが再読み込みされることはありません。


---

この例ではmain.pyはプロセスに直接関わっていません。
提供されたコードは純粋なクライアントサイド(ブラウザ側)のJavaScriptコードであり、サーバー側の処理は含まれていません。
main.pyは、FastAPIアプリケーションを構築し、テンプレートをレンダリングして静的ファイル(script.jsとstyle.css)を提供する役割を果たしますが、フォームの送信とレスポンスの処理そのものには関与していません。
フォームの送信イベントはJavaScriptのイベントリスナーによって処理され、サーバーへのリクエストは送られません。つまり、main.pyはこのプロセスには関係しておらず、クライアントサイドのJavaScriptコードのみで動作しています。
main.pyの役割は、FastAPIアプリケーションを初期化し、リクエストに応じてテンプレートをレンダリングして静的ファイルを提供することです。フォームの送信処理そのものは、クライアントサイドのJavaScriptコードが完全に担当しています。

---
