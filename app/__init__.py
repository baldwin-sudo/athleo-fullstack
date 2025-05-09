from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# Initialisation des extensions Flask
db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    
    # Configuration de la base de données MySQL
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/athleo'
    app.config['SECRET_KEY'] = 'f83c1a8f934be9d62f7a10c8d5ee0d12'
    
    # Initialisation des extensions
    db.init_app(app)
    login_manager.init_app(app)
    
    # Enregistrement des routes
    from .routes import main
    app.register_blueprint(main)
    
    from .routes.utilisateur_routes import utilisateur_bp
    from .routes.objectif_routes import objectif_bp

    app.register_blueprint(utilisateur_bp, url_prefix='/utilisateur')
    app.register_blueprint(objectif_bp, url_prefix='/objectif')
    
    
    return app