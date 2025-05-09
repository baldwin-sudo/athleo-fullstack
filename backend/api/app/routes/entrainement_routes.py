from flask import Blueprint, request, jsonify
from app.models import Objectif, Entrainement
from app import db

entrainement_bp = Blueprint('entrainement', __name__)

@entrainement_bp.route('/add/<int:id>', methods=['POST'])
def ajouter_entrainement(id):
    data = request.json
    type_entrainement = data.get('type_entrainement', 'inconnu')
    duree = data.get('duree', 0)

    objectif = Objectif.query.get(id)
    entrainement = Entrainement.query.get(id)

    if not objectif or not entrainement:
        return jsonify({'message': 'Objectif ou entraînement non trouvé'}), 404

    entrainement.duree += duree
    entrainement.type_entrainement = type_entrainement  

    objectif.valeur_actuelle += duree
    if objectif.valeur_actuelle >= objectif.valeur_cible:
        objectif.status = True

    db.session.commit()
    return jsonify({
        'message': f'{duree} minutes ajoutées au type "{type_entrainement}"',
        'duree_totale': entrainement.duree,
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200

@entrainement_bp.route('/remove/<int:id>', methods=['POST'])
def supprimer_entrainement(id):
    data = request.json
    duree = data.get('duree', 0)

    objectif = Objectif.query.get(id)
    entrainement = Entrainement.query.get(id)

    if not objectif or not entrainement:
        return jsonify({'message': 'Objectif ou entraînement non trouvé'}), 404

    entrainement.duree = max(entrainement.duree - duree, 0)
    objectif.valeur_actuelle = max(objectif.valeur_actuelle - duree, 0)

    if objectif.valeur_actuelle < objectif.valeur_cible:
        objectif.status = False

    db.session.commit()
    return jsonify({
        'message': f'{duree} minutes supprimées',
        'duree_totale': entrainement.duree,
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200

@entrainement_bp.route('/reset/<int:id>', methods=['POST'])
def reset_entrainement(id):
    objectif = Objectif.query.get(id)
    entrainement = Entrainement.query.get(id)

    if not objectif or not entrainement:
        return jsonify({'message': 'Objectif ou entraînement non trouvé'}), 404

    objectif.valeur_actuelle = 0
    objectif.status = False
    entrainement.duree = 0

    db.session.commit()
    return jsonify({'message': 'Objectif et entraînement réinitialisés'}), 200
