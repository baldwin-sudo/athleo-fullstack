from flask import Blueprint, request, jsonify
from app.models import Objectif, Pas
from app import db

pas_bp = Blueprint('pas', __name__)

@pas_bp.route('/add/<int:id>', methods=['POST'])
def ajouter_pas(id):
    data = request.json
    nombre_pas = data.get('nombre_pas', 0)

    objectif = Objectif.query.get(id)
    pas = Pas.query.get(id)

    if not objectif or not pas:
        return jsonify({'message': 'Objectif ou pas non trouvé'}), 404

    objectif.valeur_actuelle += nombre_pas
    if objectif.valeur_actuelle >= objectif.valeur_cible:
        objectif.status = True

    db.session.commit()
    return jsonify({
        'message': f'{nombre_pas} pas ajoutés',
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200

@pas_bp.route('/remove/<int:id>', methods=['POST'])
def supprimer_pas(id):
    data = request.json
    nombre_pas = data.get('nombre_pas', 0)

    objectif = Objectif.query.get(id)
    pas = Pas.query.get(id)

    if not objectif or not pas:
        return jsonify({'message': 'Objectif ou pas non trouvé'}), 404

    objectif.valeur_actuelle = max(objectif.valeur_actuelle - nombre_pas, 0)
    if objectif.valeur_actuelle < objectif.valeur_cible:
        objectif.status = False

    db.session.commit()
    return jsonify({
        'message': f'{nombre_pas} pas supprimés',
        'valeur_actuelle': objectif.valeur_actuelle,
        'status': objectif.status
    }), 200

@pas_bp.route('/reset/<int:id>', methods=['POST'])
def reset_pas(id):
    objectif = Objectif.query.get(id)
    pas = Pas.query.get(id)

    if not objectif or not pas:
        return jsonify({'message': 'Objectif ou pas non trouvé'}), 404

    objectif.valeur_actuelle = 0
    objectif.status = False

    db.session.commit()
    return jsonify({'message': 'Objectif de pas réinitialisé'}), 200
