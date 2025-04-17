
# # MODIFIED CODE
# from django import forms

# class CollaborationForm(forms.Form):
#     name = forms.CharField(max_length=100, label='Your Name')
#     receiver_email = forms.EmailField(label='Receiver Email')
#     your_club = forms.ChoiceField(
#         choices=[
#             ('CBC', 'CBC'),
#             ('CSSC', 'CSSC'),
#             ('CMC', 'CMC'),
#             ('CSCC', 'CSCC'),
#             ('KUNCI', 'KUNCI'),
#         ],
#         label='Your Club'
#     )
#     content = forms.CharField(widget=forms.Textarea(attrs={'placeholder': 'Short Message'}), label='Short Message')



# OLD CODE
# from django import forms

# class CollaborationForm(forms.Form):
#     name = forms.CharField(max_length=100, label='Your Name')
#     receiver_email = forms.EmailField(label='Receiver Email')
#     subject = forms.CharField(max_length=200, label='Subject')
#     content = forms.CharField(widget=forms.Textarea, label='Your Message')

'''
1. Content change to Short Message
2. Receiver will be taken from the Club Leader of the current page
3. Provide a list in the Your Club (from Subject become a dropdown list of clubs)

" Collaboration Request from <club name>" -> example of the subject 



'''

#______________________SisaKode______________________#
# email = forms.EmailField(label='Your Email')


