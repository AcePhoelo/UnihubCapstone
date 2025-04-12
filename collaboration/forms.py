from django import forms

class CollaborationForm(forms.Form):
    name = forms.CharField(max_length=100, label='Your Name')
    email = forms.EmailField(label='Your Email')
    receiver_email = forms.EmailField(label='Receiver Email')
    subject = forms.CharField(max_length=200, label='Subject')
    content = forms.CharField(widget=forms.Textarea, label='Your Message')
    
    