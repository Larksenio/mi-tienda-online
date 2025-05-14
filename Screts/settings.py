import os
from pathlib import Path

# ─────────────────────────────
# Paths
# ─────────────────────────────
BASE_DIR = Path(__file__).resolve().parent.parent


# ─────────────────────────────
# Seguridad
# ─────────────────────────────
SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "django-insecure-1o&@%ro-toaj-kebx856#6gz2z$!tdljwwpcm!*pl1v3k_%ydj"
)

DEBUG = os.getenv("DEBUG", "False") == "True"          # ← por defecto False

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")


# ─────────────────────────────
# Apps
# ─────────────────────────────
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "corsheaders",
    "core",
]


# ─────────────────────────────
# Middleware
# ─────────────────────────────
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",

    # WhiteNoise *justo* después de Security
    "whitenoise.middleware.WhiteNoiseMiddleware",

    # CORS debe ir encima de CommonMiddleware
    "corsheaders.middleware.CorsMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# ─────────────────────────────
# CORS
# ─────────────────────────────
raw_origins = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "https://mi-tienda-frontend.onrender.com"          # ← valor por defecto
)
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in raw_origins.split(",")]

# Si prefieres modo abierto en desarrollo local:
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True


# ─────────────────────────────
# Templates & URL conf
# ─────────────────────────────
ROOT_URLCONF = "Screts.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "Screts.wsgi.application"


# ─────────────────────────────
# Database (SQLite por defecto)
# ─────────────────────────────
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
# En producción real conviene usar PostgreSQL → Render facilita el add‑on gratuito


# ─────────────────────────────
# Archivos estáticos & media
# ─────────────────────────────
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# WhiteNoise optimizado
STATICFILES_STORAGE = (
    "whitenoise.storage.CompressedManifestStaticFilesStorage"
)

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"


# ─────────────────────────────
# Otros ajustes
# ─────────────────────────────
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
