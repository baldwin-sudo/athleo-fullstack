from flask import Blueprint, request, jsonify
from app.models import Objectif, Sommeil
from app import db

sommeil_bp = Blueprint('sommeil', __name__)

@sommeil_bp.route('/add/<int:id>', methods=['POST'])
def ajouter_sommeil(id):
    objectif = Objectif.query.get(id)
    if not objectif or not objectif.sommeil:
        return jsonify({'message': 'Objectif sommeil non trouvé'}), 404

    objectif.valeur_actuelle += 0.5  # 30 minu
    if objectif.valeur_actuelle >= objectif.valeur_cible:
        objectif.status = True

    db.session.commit()
    return jsonify({
        'message': '30 minutes de sommeil ajoutées',
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200

@sommeil_bp.route('/remove/<int:id>', methods=['POST'])
def supprimer_sommeil(id):
    objectif = Objectif.query.get(id)
    if not objectif or not objectif.sommeil:
        return jsonify({'message': 'Objectif sommeil non trouvé'}), 404

    objectif.valeur_actuelle = max(objectif.valeur_actuelle - 0.5, 0)
    if objectif.valeur_actuelle < objectif.valeur_cible:
        objectif.status = False

    db.session.commit()
    return jsonify({
        'message': '30 minutes de sommeil supprimées',
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200


@sommeil_bp.route('/reset/<int:id>', methods=['POST'])
def reset_sommeil(id):
    objectif = Objectif.query.get(id)
    if not objectif or not objectif.sommeil:
        return jsonify({'message': 'Objectif sommeil non trouvé'}), 404

    objectif.valeur_actuelle = 0
    objectif.status = False
    db.session.commit()
    return jsonify({'message': 'Objectif sommeil réinitialisé'}), 200
