# Generated by Django 2.1.1 on 2018-09-27 21:13

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0003_auto_20180924_1350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audio',
            name='audio_file',
            field=models.FileField(upload_to='audios', validators=[django.core.validators.FileExtensionValidator(['mp3'])]),
        ),
        migrations.AlterField(
            model_name='audio',
            name='collection',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='artists.Collection'),
        ),
        migrations.AlterField(
            model_name='audio',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='audio',
            name='genre',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='artists.Genre'),
        ),
        migrations.AlterField(
            model_name='collection',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='collection',
            name='genre',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='artists.Genre'),
        ),
        migrations.AlterField(
            model_name='freesounduser',
            name='profile_picture',
            field=models.ImageField(upload_to='profile_pictures'),
        ),
    ]