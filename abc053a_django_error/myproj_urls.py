from django.urls import path, include

urlpatterns = [
    # 他のURLパターンがある場合はここに追加
    path('', include('myapp.urls')),
]
