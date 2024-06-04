###
### 実行：python xxxx.py
### 課題：数字の表示がfloat
### 

import flet as ft

def main(page: ft.Page):
    page.title = "ABC053A"
    
    txt = ft.Text("""
すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
""")
    page.add(txt)
    
    rate = ft.Slider(value=400, min=0, max=3000, label="Select your rate!")
    page.add(rate)
    
    result = ft.Column()
    page.add(result)
    
    def rate_changed(e):
        result.controls = [
            ft.Text(f"Your rate: {rate.value}"),
            ft.Text(f"Your contest: {'ABC' if rate.value < 1200 else 'ARC'}")
        ]
        page.update()
            
    rate.on_change = rate_changed
    rate_changed(None)

ft.app(target=main, view=ft.AppView.WEB_BROWSER)

### ft.app(target=main) # window が開く
