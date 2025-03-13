FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

RUN pip install uv

WORKDIR /app

COPY requirements.txt /app/

# RUN curl -sSf https://rye.astral.sh/get | RYE_NO_AUTO_INSTALL=1 RYE_INSTALL_OPTION="--yes" bash
RUN PYTHONDONTWRITEBYTECODE=1 uv pip install --no-cache-dir --system -r requirements.txt
# RUN uv pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD [ "gunicorn", "app.wsgi" ]