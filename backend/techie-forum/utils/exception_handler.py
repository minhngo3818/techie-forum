from rest_framework.views import Response, exception_handler
from http import HTTPStatus


def custom_exception_handler(exception, context) -> Response:
    """
    Custom API exception handler. Response multiple error contexts and include payload.
    """

    response = exception_handler(exception, context)

    if response is not None:
        http_code_message = {s.value: s.description for s in HTTPStatus}
        status_code = response.status_code
        error_payload = {"error": {"status_code": 0, "message": "", "details": {}}}
        error_list = {}

        for label, message in response.data.items():
            error_list[label] = message

        error = error_payload["error"]
        error["status_code"] = status_code
        error["message"] = http_code_message[status_code]
        error["details"] = error_list
        response.data = error_payload

    return response
