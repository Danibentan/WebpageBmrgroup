FROM python:3.12-alpine

WORKDIR /app

COPY index.html marcas.html app.js app-marcas.js styles.css script.js ./
COPY assets ./assets

EXPOSE 8080

CMD ["sh", "-c", "python -m http.server ${PORT:-8080} -d /app"]
