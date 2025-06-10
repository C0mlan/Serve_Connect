import pyotp
from django.core.mail import EmailMessage
import threading




class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject= data['email_subject'], body=data['email_body'], to=[data['to_email']])
        email.content_subtype = 'html' 
        EmailThread(email).start()


class EmailThread(threading.Thread):
    
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)
    def run(self):
        self.email.send()


def generate_otp():
    secret = pyotp.random_base32() 
    totp = pyotp.TOTP(secret)
    return totp.now()

