from django.shortcuts import render, get_object_or_404, redirect
from .models import Member
from .forms import UpdatePositionForm

def update_position(request, member_id):
    member = get_object_or_404(Member, id=member_id)
    if request.method == 'POST':
        form = UpdatePositionForm(request.POST, instance=member)
        if form.is_valid():
            form.save()
            return redirect('member_list')  # Redirect to a list of members or another page
    else:
        form = UpdatePositionForm(instance=member)
    return render(request, 'roles/roleform.html', {'form': form, 'member': member})

def member_list(request):
    members = Member.objects.all()
    return render(request, 'roles/memberlist.html', {'members': members})