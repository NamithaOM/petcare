# Generated by Django 5.2 on 2025-04-28 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0026_customerdata_gender'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='deliverystatus',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
