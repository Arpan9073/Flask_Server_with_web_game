# Flask Python Project

This is a simple Flask web application project.

## Project Structure

```
Flask_python/
├── app.py
├── requirements.txt
├── static/
│   └── main.js
├── templates/
│   └── index.html
└── README.md
```

## Description

- **app.py**: Main Flask application. Serves the home page at `/` using the template in `templates/index.html`.
- **requirements.txt**: Lists all Python dependencies required to run the project.
- **static/main.js**: JavaScript file loaded by the HTML template. (Contains client-side logic or assets.)
- **templates/index.html**: HTML template rendered for the home page.


## Requirements


-  **Python version required:** `3.13.3` or higher
- **pip version required:** `26.0.1` or higher


## Setup Instructions

1. **Clone the repository**
	```sh
	git clone <repository-url>
	cd Flask_python
	```

2. **Create and activate a virtual environment (recommended)**
	```sh
	python -m venv .env
	# On Windows:
	.env\Scripts\activate
	# On macOS/Linux:
	source .env/bin/activate
	```

3. **Install dependencies**
	```sh
	pip install -r requirements.txt
	```

4. **Run the application**
	```sh
	python app.py
	```
	The app will be available at [http://localhost:5000](http://localhost:5000) by default.


The main dependencies are:

```
blinker==1.9.0
click==8.3.1
colorama==0.4.6
Flask==3.1.3
itsdangerous==2.2.0
Jinja2==3.1.6
MarkupSafe==3.0.3
Werkzeug==3.1.6
```

## Notes

- The project uses Flask's default development server. For production, consider using a WSGI server like Gunicorn or uWSGI.
- Static files (JS, CSS, images) should be placed in the `static/` directory.
- HTML templates should be placed in the `templates/` directory.

---
Feel free to modify and extend this project as needed!)
