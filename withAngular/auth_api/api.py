from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator


from rest_framework import status, views
from rest_framework.response import Response

from .serializers import UserSerializer


class LoginView(views.APIView):
 	#view needs a post method to handle a post request from the browser

 	@method_decorator(csrf_protect)
 	def post(self,request):
 		#authenticate using django auth app method
 		user = authenticate(
 			username =request.data.get("username"),
 			password = request.data.get("password"))

 		#if authentication failed, return a 401 response
 		if user is None or not user.is_active:
 			return Response({
 					'status' : 'Unauthorised',
 					'message' : 'Username or password incorrect'
 				}, status=status.HTTP_401_UNAUTHORIZED)

 		#else, use djange auth app login method and return a json reporesentation of the user object
		#a session for this user is created in the database
		#a session id cookie sent to the browser 		
 		login(request,user)
 		return Response(UserSerializer(user).data)

class LogoutView(views.APIView):

	def get(self, request):
		logout(request)
		return Response({}, status=status.HTTP_204_NO_CONTENT)







