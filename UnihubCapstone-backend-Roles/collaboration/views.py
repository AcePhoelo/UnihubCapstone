from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.template.loader import render_to_string  


from .forms import CollaborationForm

def index(request):
    if request.method == 'POST':
        form = CollaborationForm(request.POST)
        
        if form.is_valid():
            sender_email = form.cleaned_data['email']  
            receiver_email = form.cleaned_data['receiver_email']  
            email_subject = form.cleaned_data['subject']
            message_content = form.cleaned_data['content']  
            name = form.cleaned_data['name']
            
            html = render_to_string('collaboration/emails/collaborationform.html', {
                'name': name,
                'email': sender_email,
                'content': message_content
            })

            send_mail(
                subject=email_subject,
                message=message_content,
                from_email=sender_email,
                recipient_list=[receiver_email],
                html_message=html,
            )
            
            return redirect('index')
    else:
        form = CollaborationForm()
    
    return render(request, 'collaboration/index.html', {
        'form': form,
    })

