from django import forms
from .models import Member

class UpdatePositionForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['position', 'custom_position']
        widgets = {
            'position': forms.Select(attrs={'class': 'form-control'}),
            'custom_position': forms.TextInput(attrs={'class': 'form-control'}),
        }