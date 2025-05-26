
def otp_email_html(username, otp):
   return f'''<h2>Email Verification OTP</h2><br><br>
                            <h3> 
                             <p>Hi {username},</p><br>
                             <p>Your One-Time Password (OTP) for email verification is: <strong>{otp}<strong>.</p><br>
                             <p>Please use this code to verify your account.Thank you.</p><br>
                             </h3>
                             <br><br><br>
                             '''