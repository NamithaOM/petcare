# Generated by Django 5.2 on 2025-04-29 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0034_orderitem_deliverystatus_customerrefund'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctorbooking',
            name='cancellation_reason',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='groomingbooking',
            name='cancellation_reason',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='trainerbooking',
            name='cancellation_reason',
            field=models.TextField(blank=True, null=True),
        ),
    ]
