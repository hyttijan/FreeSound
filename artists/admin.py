from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from django import forms
# Register your models here.


class FreeSoundUserCreationForm(forms.ModelForm):
    class Meta:
        model = FreeSoundUser
        fields = ('email',)

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(FreeSoundUserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class FreeSoundUserAdmin(UserAdmin):
    # The forms to add and change user instances
    add_form = FreeSoundUserCreationForm
    list_display = ("username",)
    ordering = ("email",)

    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_name','profile_picture')}),
        )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'first_name', 'last_name', 'is_superuser', 'is_staff', 'is_active','profile_picture')}
            ),
        )

    filter_horizontal = ()


admin.site.register(FreeSoundUser, FreeSoundUserAdmin)
admin.site.register(Genre)
admin.site.register(Collection)
admin.site.register(Audio)
