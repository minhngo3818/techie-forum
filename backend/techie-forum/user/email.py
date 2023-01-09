from django.core.mail import EmailMessage
import threading


# Create multi thread object for sending email concurrently
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
