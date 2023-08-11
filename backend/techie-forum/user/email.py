from django.core.mail import EmailMessage
from django.template.loader import render_to_string
import threading


# Create multi-threading object for sending email concurrently
class EmailThread(threading.Thread):
    def __init__(self, email):
        threading.Thread.__init__(self)
        self.emai = email

    def run(self) -> None:
        self.emai.send()


class EmailSender:
    def __init__(self):
        pass

    @staticmethod
    def send_email(data) -> None:
        email = EmailMessage(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[data["to_email"]],
        )

        EmailThread(email).start()

    @staticmethod
    def compose_verification_email(route, user, token):
        verify_url = route + "verify-email/" + user.username + "?token=" + str(token)

        email_subject = "Email Verification"
        email_body = render_to_string(
            "../templates/emails/email-verification.html",
            {"username": user.username, "verify_url": verify_url},
        )

        return {
            "email_subject": email_subject,
            "email_body": email_body,
            "to_email": user.email,
        }

    @staticmethod
    def compose_delete_account_notice(user):
        email_subject = "Delete Account Notification"
        email_body = render_to_string(
            "../templates/emails/email-verification.html",
            {"username": user.username, "exp_days": 30},
        )
        return {
            "email_subject": email_subject,
            "email_body": email_body,
            "to_email": user.email,
        }

    @staticmethod
    def compose_reset_password_notice(user, reset_url):
        email_subject = "Reset Password"
        email_body = render_to_string(
            "../templates/emails/reset-password-notice.html",
            {"username": user.username, "reset_url": reset_url},
        )

        return {
            "email_subject": email_subject,
            "email_body": email_body,
            "to_email": user.email,
        }
