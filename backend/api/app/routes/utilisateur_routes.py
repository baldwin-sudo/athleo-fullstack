from flask import Blueprint, request, jsonify
from app.models import Utilisateur, Poids, Niveau, Badge, Classement, Objectif
from app import db

utilisateur_bp = Blueprint('utilisateur', __name__)

@utilisateur_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    if Utilisateur.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Nom d’utilisateur déjà utilisé'}), 409

    new_user = Utilisateur(
        nom=data['nom'],
        prenom=data['prenom'],
        username=data['username'],
        password=data['password'],  
        age=data['age'],
        taille=data['taille']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur créé avec succès'}), 201

@utilisateur_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = Utilisateur.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({'message': 'Connexion réussie', 'id': user.id}), 200
    return jsonify({'message': 'Identifiants incorrects'}), 401

@utilisateur_bp.route('/update_image/<int:id>', methods=['PUT'])
def update_image(id):
    data = request.json
    user = Utilisateur.query.get(id)
    if user:
        user.image = data['image']
        db.session.commit()
        return jsonify({'message': 'Image mise à jour'}), 200
    return jsonify({'message': 'Utilisateur non trouvé'}), 404

@utilisateur_bp.route('/update_avatar/<int:id>', methods=['PUT'])
def update_avatar(id):
    data = request.json
    user = Utilisateur.query.get(id)
    if user:
        user.avatar = data['avatar']
        db.session.commit()
        return jsonify({'message': 'Avatar mis à jour'}), 200
    return jsonify({'message': 'Utilisateur non trouvé'}), 404

@utilisateur_bp.route('/poids/<int:id>', methods=['GET'])
def afficher_poids(id):
    user = Utilisateur.query.get(id)
    if user:
        poids = Poids.query.join(Objectif).filter(Objectif.id == Poids.id, Objectif.id == Poids.id, Objectif.id == Poids.id).first()
        return jsonify({'poids': poids.valeur_actuelle if poids else None}), 200
    return jsonify({'message': 'Utilisateur non trouvé'}), 404

@utilisateur_bp.route('/taille/<int:id>', methods=['GET'])
def afficher_taille(id):
    user = Utilisateur.query.get(id)
    if user:
        return jsonify({'taille': user.taille}), 200
    return jsonify({'message': 'Utilisateur non trouvé'}), 404

@utilisateur_bp.route('/niveau/<int:id>', methods=['GET'])
def get_niveau(id):
    user = Utilisateur.query.get(id)
    if user and user.niveau:
        return jsonify({'niveau': user.niveau.label}), 200
    return jsonify({'message': 'Niveau non trouvé'}), 404

@utilisateur_bp.route('/classement/<int:id>', methods=['GET'])
def get_classement(id):
    user = Utilisateur.query.get(id)
    if user and user.classements:
        classement = user.classements[-1].classement 
        return jsonify({'classement': classement}), 200
    return jsonify({'message': 'Classement non trouvé'}), 404

@utilisateur_bp.route('/badge/<int:id>', methods=['GET'])
def get_badge(id):
    user = Utilisateur.query.get(id)
    if user and user.badge:
        return jsonify({'badge': user.badge.label}), 200
    return jsonify({'message': 'Badge non trouvé'}), 404
