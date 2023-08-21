from rest_framework.views import Response, exception_handler
from http import HTTPStatus


def custom_exception_handler(exception, context) -> Response:
    """
    Custom API exception handler. Response multiple error contexts and include payload.
    """

    response = exception_handler(exception, context)

    if response is not None:
        error_payload = {"errors": {}}
        error_list = {}

        for label, message in response.data.items():
            error_list[label] = str(message[0])

        error_payload["errors"] = error_list
        response.data = error_payload

    return response
