

---
django-admin startproject myproj
同じ名前のホルダが親子でできてしまう
cd myproj
python manage.py startapp myapp
子のmyprojとmyappが並列
---
python manage.py migrate
python manage.py runserver
http://127.0.0.1:8000/

The install worked successfully! Congratulations!
---

# setting myapp

Djangoアプリケーションを作成し、そのアプリケーションを表示するためには、次の手順が必要です。

URLsを設定する

myproj/urls.pyファイルを開き、以下のように記述します。

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),
]

この設定により、myapp/に対するリクエストがmyapp.urlsに渡されるようになります。

myapp/urls.pyを作成する

myapp/urls.pyファイルを作成し、以下のように記述します。

from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]

ビューを作成する

myapp/views.pyファイルを開き、indexビューを作成します。

from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, Django!")

---
after setting myapp

cd myproj
python manage.py runserver

http://127.0.0.1:8000/myapp/



---
---
---
---
---
---
---

