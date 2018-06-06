from rest_framework import serializers

# Register your models here.
from .models import List, Card

class CardSerializer(serializers.ModelSerializer):

	class Meta:
		model = Card
		fields = ('id','title', 'description', 'parent_list')



class ListSerializer(serializers.ModelSerializer):
	cards = CardSerializer(many=True, read_only=True)
	class Meta:
		model = List
		fields = ('id','name','cards')

