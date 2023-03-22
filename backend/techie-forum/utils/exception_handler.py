from rest_framework.views import Response, exception_handler
from http import HTTPStatus


def custom_exception_handler(exception, context) -> Response:
    """
    Custom API exception handler. Response multiple error contexts and include payload.
    """

    response = exception_handler(exception, context)

    if response is not None:
        error_payload = {"details": {}}
        error_list = {}

        for label, message in response.data.items():
            error_list[label] = message

        error_payload["details"] = error_list
        response.data = error_payload

    return response
