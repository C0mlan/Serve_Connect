from .utils import Util
from .email_template import otp_email_html


def send_otp_email(username, email, otp):
    email_body = otp_email_html(username, otp)
    data = {
        'email_subject': 'Email Verification OTP',
        'email_body': email_body,
        'to_email': email,
    }
    
    Util.send_email(data)