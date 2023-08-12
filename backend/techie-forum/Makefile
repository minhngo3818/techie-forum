# define env
VENV:=venv

all: venv

$(VENV)/bin/activate: requirements.txt
	python3 -m venv $(VENV)
	./$(VENV)/bin/pip install -r requirements.txt

venv: $(VENV)/bin/activate

freeze:
	pip list --format=freeze > requirements.txt

celery-worker:
	celery -A techies worker -l info

celery-beat:
	celery -A techies beat -l info

run:
	python3 manage.py runserver

migrations:
	python3 manage.py makemigrations

migrate:
	python3 manage.py migrate

collect-static:
	python3 manage.py collectstatic

shell:
	python3 manage.py shell

format:
	black **/*.py

clean:
	rm -rf $(VENV)
	find . -type f -name '*.pyc' -delete