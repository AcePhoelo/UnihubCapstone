from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .forms import CollaborationForm

def index(request):
    if request.method == 'POST':
        form = CollaborationForm(request.POST)
        
        if form.is_valid():
            name = form.cleaned_data['name']  
            student_id = form.cleaned_data['studentID']  
            role = form.cleaned_data['roles']  
        
            print(f"Name: {name}, Student ID: {student_id}, Role: {role}")
    
            return redirect('index')
    else:
        form = CollaborationForm()
    
    return render(request, 'collaboration/index.html', {
        'form': form,
    })