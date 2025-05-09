from flask import Blueprint, request, jsonify
from app.models import Utilisateur
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
        password=data['password'],  # À sécuriser avec hash plus tard
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