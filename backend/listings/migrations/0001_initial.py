# Generated by Django 4.1.5 on 2023-01-27 23:50

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('location', django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326)),
                ('description', models.TextField(blank=True, null=True)),
                ('area', models.CharField(blank=True, choices=[('Inner London', 'Inner London'), ('Inner London', 'Inner London')], max_length=20, null=True)),
                ('borough', models.CharField(blank=True, max_length=50, null=True)),
                ('listing_type', models.CharField(choices=[('House', 'House'), ('Apartment', 'Apartment'), ('Office', 'Office')], max_length=20)),
                ('property_status', models.CharField(blank=True, choices=[('Sale', 'Sale'), ('Rent', 'Rent')], max_length=20, null=True)),
                ('price', models.DecimalField(decimal_places=0, max_digits=50)),
                ('rental_frequency', models.CharField(blank=True, choices=[('Month', 'Month'), ('Week', 'Week'), ('Day', 'Day')], max_length=20, null=True)),
                ('rooms', models.IntegerField(blank=True, null=True)),
                ('furnished', models.BooleanField(default=False)),
                ('pool', models.BooleanField(default=False)),
                ('elevator', models.BooleanField(default=False)),
                ('cctv', models.BooleanField(default=False)),
                ('parking', models.BooleanField(default=False)),
                ('date_posted', models.TimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
