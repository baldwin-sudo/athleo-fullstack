from flask import Blueprint, jsonify
from .models import Utilisateur
from . import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({'message': 'Bienvenue dans l\'API Objectifs !'})

@main.route('/utilisateurs')
def get_utilisateurs():
    utilisateurs = Utilisateur.query.all()
    return jsonify([{
        'id': u.id,
        'nom': u.nom,
        'prenom': u.prenom,
        'username': u.username
    } for u in utilisateurs])