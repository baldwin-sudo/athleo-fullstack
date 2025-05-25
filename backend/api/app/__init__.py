from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS

# Initialisation des extensions Flask
db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__,)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Configuration de la base de données MySQL
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/athleo'
    app.config['SECRET_KEY'] = 'f83c1a8f934be9d62f7a10c8d5ee0d12'
    
    # Initialisation des extensions
    db.init_app(app)
    login_manager.init_app(app)
    
    # Enregistrement des routes
    from app.routes.main import main
    app.register_blueprint(main)
    
    from app.routes.utilisateur_routes import utilisateur_bp
    from app.routes.objectif_routes import objectif_bp
    from app.routes.hydratation_routes import hydratation_bp
    from app.routes.sommeil_routes import sommeil_bp
    from app.routes.entrainement_routes import entrainement_bp
    from app.routes.pas_routes import pas_bp
    from app.routes.classement_routes import classement_bp

    app.register_blueprint(utilisateur_bp, url_prefix='/utilisateur')
    app.register_blueprint(objectif_bp, url_prefix='/objectif')
    app.register_blueprint(hydratation_bp, url_prefix='/hydratation')
    app.register_blueprint(sommeil_bp, url_prefix='/sommeil')
    app.register_blueprint(entrainement_bp, url_prefix='/entrainement')
    app.register_blueprint(pas_bp, url_prefix='/pas')
    app.register_blueprint(classement_bp, url_prefix='/classement')
    return app