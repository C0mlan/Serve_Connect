from .utils import Util
from .email_template import otp_email_html, forgot_password_html


def send_otp_email(username, email, otp):
    email_body = otp_email_html(username, otp)
    data = {
        'email_subject': 'Email Verification OTP',
        'email_body': email_body,
        'to_email': email,
    }
    
    Util.send_email(data)

def forgot_password_email(username, email, otp):
    email_body = forgot_password_html(username, otp)
    subject = "EMAIL FORGOT_PASSWORD OTP"
    data = {
        'email_subject': subject,
        'email_body': email_body,
        'to_email': email,
    }
    
    Util.send_email(data)