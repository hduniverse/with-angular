from rest_framework import serializers

# Register your models here.
from .models import List, Card

class CardSerializer(serializers.ModelSerializer):

	class Meta:
		model = Card
		fields = '__all__'



class ListSerializer(serializers.ModelSerializer):
	cards = serializers.SlugRelatedField(many=True, read_only=True,slug_field='title')
	class Meta:
		model = List
		fields = ('name','cards')

