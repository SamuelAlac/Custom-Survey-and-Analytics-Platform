# Custom Survey and Analytics Platform
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/SamuelAlac/Custom-Survey-and-Analytics-Platform)

This repository contains a full-stack web application designed for creating, distributing, and analyzing custom surveys within an educational context. It provides distinct interfaces and functionalities for Teachers/Admins and Students, facilitating seamless feedback collection and data-driven insights.

The backend is built with Django Rest Framework, offering a robust API for user management, survey creation, and response handling. The frontend is a modern and responsive single-page application built with React, TypeScript, and Vite, featuring a dynamic survey builder and rich data visualizations.

## Features

### For Teachers & Admins
- **Secure Authentication**: Role-based login for teachers and administrators.
- **Survey Management Dashboard**: An overview of total surveys, active surveys, and total responses. Includes a real-time response timeline chart.
- **Dynamic Survey Builder**: An intuitive drag-and-drop interface to create complex surveys.
- **Multiple Question Types**: Supports Short Answer, Multiple Choice, and Likert Scale questions.
- **Survey Assignment**: Assign surveys to specific student sections with configurable due dates and response editability.
- **Comprehensive Analytics**: View aggregated survey results through interactive data visualizations, including pie charts for multiple-choice questions, bar charts for Likert scales, and word clouds for open-ended text responses.
- **Individual Response Review**: Browse and manage individual student submissions for any given survey.

### For Students
- **Secure Registration & Login**: Students can register with email verification and log in to their personal dashboard.
- **Personalized Dashboard**: View assigned surveys categorized as Pending, Completed, or Past Due.
- **Intuitive Survey Interface**: A clean, multi-page form for completing and submitting survey responses.
- **Response History**: Access and review previously submitted responses.
- **Profile Management**: View personal information, including section and email.

## Tech Stack

### Backend
- **Framework**: Django, Django REST Framework
- **Authentication**: Simple JWT for token-based authentication
- **Database**: SQLite (default), compatible with PostgreSQL
- **API Testing**: REST Client files for VS Code, Postman

### Frontend
- **Framework/Library**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: TanStack Query
- **Routing**: React Router
- **HTTP Client**: Axios
- **Data Visualization**: Chart.js, react-chartjs-2, react-d3-cloud
- **UI**: React Hook Form, React Hot Toast, DND Kit for drag-and-drop
- **Integration Testing**: Selenium

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- Python 3.8+ and Pip
- Node.js and npm

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SamuelAlac/Custom-Survey-and-Analytics-Platform.git
    cd Custom-Survey-and-Analytics-Platform/backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # For Windows
    python -m venv .venv
    .\.venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Create a `.env` file** in the `backend` directory and add the following environment variables. For development, the console email backend is recommended.

    ```env
    DJANGO_SECRET_KEY='your-strong-secret-key-here'
    DJANGO_DEBUG=True
    DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
    DATABASE_URL=sqlite:///db.sqlite3

    # Use this for development to see emails in the console
    EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

    # Or configure a real SMTP server for email verification
    # EMAIL_HOST=smtp.your-email-provider.com
    # EMAIL_PORT=587
    # EMAIL_USE_TLS=True
    # EMAIL_HOST_USER='your-email@example.com'
    # EMAIL_HOST_PASSWORD='your-app-password'
    ```

5.  **Apply database migrations:**
    ```bash
    python manage.py migrate
    ```

6.  **Create a superuser (optional, for admin access):**
    ```bash
    python manage.py createsuperuser
    ```

7.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```
    The backend API will be available at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    # From the root project directory
    cd frontend
    ```

2.  **Install npm dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env.local` file** in the `frontend` directory with the following content:
    ```env
    VITE_API_BASE_URL=http://127.0.0.1:8000/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.
