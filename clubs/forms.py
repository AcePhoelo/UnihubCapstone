from django import forms
from .models import Member

class UpdatePositionForm(forms.ModelForm):
    class Meta:
        model = Member
        fields = ['position', 'custom_position']
        widgets = {
            'position': forms.Select(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Select a position',
                }
            ),
            'custom_position': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': 'Enter a custom position (optional)',
                }
            ),
        }
        help_texts = {
            'position': 'Select a predefined position from the dropdown.',
            'custom_position': 'Enter a custom position if applicable (e.g., "Director of Marketing").',
        }

    def clean_custom_position(self):
        custom_position = self.cleaned_data.get('custom_position')
        if custom_position and len(custom_position) > 100:
            raise forms.ValidationError("Custom position must not exceed 100 characters.")
        return custom_position