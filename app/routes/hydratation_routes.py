from flask import Blueprint, request, jsonify
from app.models import Objectif, Hydratation
from app import db

hydratation_bp = Blueprint('hydratation', __name__)

@hydratation_bp.route('/add-glass/<int:id>', methods=['POST'])
def add_glass(id):
    objectif = Objectif.query.get(id)
    if not objectif or not objectif.hydratation:
        return jsonify({'message': 'Objectif hydratation non trouvé'}), 404
    
    objectif.valeur_actuelle += 0.25  # 1 verre huwa 0.25 L
    if objectif.valeur_actuelle >= objectif.valeur_cible:
        objectif.status = True
    db.session.commit()

    return jsonify({
        'message': 'Verre ajouté',
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200

@hydratation_bp.route('/remove-glass/<int:id>', methods=['POST'])
def remove_glass(id):
    objectif = Objectif.query.get(id)
    if not objectif or not objectif.hydratation:
        return jsonify({'message': 'Objectif hydratation non trouvé'}), 404

    if objectif.valeur_actuelle >= 0.25:
        objectif.valeur_actuelle -= 0.25
    else:
        objectif.valeur_actuelle = 0.0

    if objectif.valeur_actuelle < objectif.valeur_cible:
        objectif.status = False

    db.session.commit()

    return jsonify({
        'message': 'Verre supprimé',
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200

@hydratation_bp.route('/progress/<int:id>', methods=['GET'])
def get_progress(id):
    objectif = Objectif.query.get(id)
    if not objectif or not objectif.hydratation:
        return jsonify({'message': 'Objectif hydratation non trouvé'}), 404

    pourcentage = (objectif.valeur_actuelle / objectif.valeur_cible) * 100 if objectif.valeur_cible else 0

    return jsonify({
        'valeur_actuelle': objectif.valeur_actuelle,
        'valeur_cible': objectif.valeur_cible,
        'status': objectif.status,
        'progression': f'{pourcentage:.2f}%'
    }), 200

@hydratation_bp.route('/reset/<int:id>', methods=['POST'])
def reset_hydratation(id):
    objectif = Objectif.query.get(id)
    if not objectif or not objectif.hydratation:
        return jsonify({'message': 'Objectif hydratation non trouvé'}), 404

    objectif.valeur_actuelle = 0
    objectif.status = False
    db.session.commit()

    return jsonify({'message': 'Objectif hydratation réinitialisé'}), 200