"""
URL configuration for project_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from pathlib import Path
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
# from django.views.generic import TemplateView
import os
from django.shortcuts import render
BASE_DIR = Path(__file__).resolve().parent.parent


def index_view(request):
    return render(request, 'index.html')


urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/quizapp/", include("quizapp.urls")),  # API routes
    path("api/quizapp2/", include("quizapp2.urls")),  # API routes
    path("api/hw01/", include("hw01.urls")),  # API routes
    path('', index_view, name='index'),  # added
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=BASE_DIR.joinpath(settings.BASE_DIR, "frontend/dist"))
