from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.http import JsonResponse
from .forms import CollaborationForm
import json


# MODIFIED CODE - USE THIS ONE 
# @csrf_exempt
# def index(request):
#     if request.method == 'POST':
#         print("Form submitted!")  # Debugging form submission
#         form = CollaborationForm(request.POST)
        
#         if form.is_valid():
#             print("Form is valid!")  # Debugging valid form
#             club_name = form.cleaned_data['your_club']
#             sender_email = form.cleaned_data['name']  # Sender's email
#             receiver_email = form.cleaned_data['receiver_email']
#             message_content = form.cleaned_data['content']
            
#             # Render the email template with dynamic data
#             html = render_to_string('collaboration/emails/collaborationform.html', {
#                 'club_name': club_name,
#                 'name': sender_email,
#                 'content': message_content,
#             })

#             try:
#                 send_mail(
#                     subject=f"Collaboration Request from {club_name}",
#                     message=message_content,
#                     from_email=sender_email,  # Use the sender's input email here
#                     recipient_list=[receiver_email],
#                     html_message=html,
#                 )
#                 print("Email sent successfully!")  # Debugging email success
#                 return redirect('index')  # Redirect to the same page after submission
#             except Exception as e:
#                 print(f"Error sending email: {e}")  # Debugging email error
#                 return render(request, 'collaboration/index.html', {
#                     'form': form,
#                     'error': f"Failed to send email: {e}"
#                 })
#         else:
#             print("Form is invalid:", form.errors)  # Debugging invalid form
#             return render(request, 'collaboration/index.html', {
#                 'form': form,
#                 'error': "There were errors in your form submission."
#             })
#     else:
#         form = CollaborationForm()
#         print("Rendering empty form.")  # Debugging GET request

#     return render(request, 'collaboration/index.html', {'form': form})

@csrf_exempt
def send_email(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            your_club = data.get('your_club')
            sender_email = data.get('name')
            receiver_email = data.get('receiver_email')
            content = data.get('content')

            subject = f"Collaboration Request from {your_club}"
            send_mail(
                subject=subject,
                message=content,
                from_email=sender_email,
                recipient_list=[receiver_email],
            )
            return JsonResponse({'message': 'Email sent successfully!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)

# OLD CODE
# def index(request):
#     if request.method == 'POST':
#         print("Form submitted!")  # Debugging form submission
#         form = CollaborationForm(request.POST)
        
#         if form.is_valid():
#             print("Form is valid!")  # Debugging valid form
#             sender_email = form.cleaned_data['name']
#             receiver_email = form.cleaned_data['receiver_email']
#             email_subject = form.cleaned_data['subject']
#             message_content = form.cleaned_data['content']
            
#             html = render_to_string('collaboration/emails/collaborationform.html', {
#                 'name': sender_email,
#                 'content': message_content
#             })

#             try:
#                 send_mail(
#                     subject=email_subject,
#                     message=message_content,
#                     from_email=settings.DEFAULT_FROM_EMAIL,
#                     recipient_list=[receiver_email],
#                     html_message=html,
#                 )
#                 print("Email sent successfully!")  # Debugging email success
#                 return redirect('index')  # Redirect to the same page after submission
#             except Exception as e:
#                 print(f"Error sending email: {e}")  # Debugging email error
#                 return render(request, 'collaboration/index.html', {
#                     'form': form,
#                     'error': f"Failed to send email: {e}"
#                 })
#         else:
#             print("Form is invalid:", form.errors)  # Debugging invalid form
#             return render(request, 'collaboration/index.html', {
#                 'form': form,
#                 'error': "There were errors in your form submission."
#             })
#     else:
#         form = CollaborationForm()
#         print("Rendering empty form.")  # Debugging GET request

#     return render(request, 'collaboration/index.html', {
#         'form': form,
#     })