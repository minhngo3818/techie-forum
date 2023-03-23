from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import threading


# Create multi-threading object for sending email concurrently
class EmailThread(threading.Thread):
    def __init__(self, email):
        threading.Thread.__init__(self)
        self.emai = email

    def run(self) -> None:
        self.emai.send()


class EmailSender:
    @staticmethod
    def send_email(data) -> None:
        email = EmailMessage(
            subject=data["email_subject"],
            body=data["email_body"],
            to=[data["to_email"]],
        )

        EmailThread(email).start()

    @staticmethod
    def compose_verification_email(request, user, token):
        current_site = get_current_site(request).domain
        path = reverse("email-verification")
        email_verification_url = (
                "http://" + current_site + path + "?token=" + str(token)
        )

        email_subject = "Email Verification"
        email_body = (
                "Welcome {} to our lair, \n\n".format(user.username)
                + "Just one more step. Access the link below to verify your email:\n\n"
                + email_verification_url
                + "\n\n"
                + "Best,\n"
                + "The Techies Forum Team"
        )

        return {
            "email_subject": email_subject,
            "email_body": email_body,
            "to_email": user.email,
        }
