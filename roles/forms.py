from django import forms

class CollaborationForm(forms.Form):
    name = forms.CharField(max_length=100, label='Your Name')
    studentID = forms.IntegerField(label='Your Student ID')
    roles = forms.ChoiceField(
        choices=[
            ('President', 'Vice President'),
            ('Secretary', 'Treasurer'),
            ('Member', 'Marketing'),
        ],
        label='Role',
        widget=forms.RadioSelect,
    )
    
    