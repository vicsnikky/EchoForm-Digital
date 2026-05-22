# SchoolPulse Django Backend Plan

## 1. Project Setup
- **Framework:** Django 5.x
- **API Engine:** Django REST Framework (DRF)
- **Authentication:** DRF SimpleJWT
- **Database:** PostgreSQL (Production), SQLite (Local)

## 2. Core Models (models.py)

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class School(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField()
    logo = models.ImageField(upload_to='schools/logos/')
    stamp = models.ImageField(upload_to='schools/stamps/')
    signature = models.ImageField(upload_to='schools/signatures/')
    created_at = models.DateTimeField(auto_now_add=True)

class User(AbstractUser):
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='users')
    phone = models.CharField(max_length=20, blank=True)
    roles = models.JSONField(default=list) # List of roles: ['admin', 'bursar', etc]

class Student(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    admission_no = models.CharField(max_length=50, unique=True)
    full_name = models.CharField(max_length=255)
    current_class = models.CharField(max_length=50)
    total_fees_due = models.DecimalField(max_digits=12, decimal_places=2, default=1000.00)
    
    @property
    def balance(self):
        payments = self.payments.all().aggregate(models.Sum('amount'))['amount__sum'] or 0
        return self.total_fees_due - payments

class Payment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='payments')
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    reference = models.CharField(max_length=100, unique=True)
```

## 3. Multi-tenancy Enforcement
To ensure data security, create a `TenantMiddleware` that detects the school context and a `TenantModelManager` that automatically filters every query:

```python
# managers.py
from django.db import models

class TenantManager(models.Manager):
    def get_queryset(self):
        # In a real app, you'd pull school_id from a thread-local variable set by middleware
        return super().get_queryset().filter(school_id=current_school_id)
```

## 4. API Endpoints (views.py)
- `POST /api/token/` - Login and get JWT.
- `GET /api/students/` - List students for the current school.
- `POST /api/payments/` - Record a payment.
- `GET /api/reports/debtors/` - Get students where `balance > 0`.

## 5. Deployment on Railway
1. **Dockerfile:** Railway will detect Django, but a `Dockerfile` gives you more control.
2. **Environment Variables:**
   - `DATABASE_URL` (Provided by Railway Postgres)
   - `SECRET_KEY`
   - `DEBUG=False`
   - `CORS_ALLOWED_ORIGINS` (Point to your Vercel URL)
3. **Storage:** Use `django-storages` with Amazon S3 or Google Cloud Storage for the media files (stamp/logo).
