from flask import Blueprint, request, jsonify
from app.models import Utilisateur, Objectif, Points
from app import db

objectif_bp = Blueprint('objectif', __name__)

@objectif_bp.route('/update/<int:id>', methods=['PUT'])
def update_objectif(id):
    data = request.json
    objectif = Objectif.query.get(id)
    if not objectif:
        return jsonify({'message': 'Objectif non trouvé'}), 404

    if 'valeur_actuelle' in data:
        objectif.valeur_actuelle = data['valeur_actuelle']
    if 'status' in data:
        objectif.status = data['status']
    
    db.session.commit()
    return jsonify({'message': 'Objectif mis à jour avec succès'}), 200

@objectif_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete_objectif(id):
    objectif = Objectif.query.get(id)
    if not objectif:
        return jsonify({'message': 'Objectif non trouvé'}), 404
    
    db.session.delete(objectif)
    db.session.commit()
    return jsonify({'message': 'Objectif supprimé avec succès'}), 200

@objectif_bp.route('/status/<int:id>', methods=['GET'])
def get_status_objectif(id):
    objectif = Objectif.query.get(id)
    if not objectif:
        return jsonify({'message': 'Objectif non trouvé'}), 404
    
    return jsonify({'status': objectif.status}), 200

@objectif_bp.route('/points/<int:id>', methods=['GET'])
def points_par_objectif(id):
    objectif = Objectif.query.get(id)
    if not objectif:
        return jsonify({'message': 'Objectif non trouvé'}), 404
    
    points = Points.query.filter_by(id_objectif=id).all()
    total_points = sum(point.points_obtenus for point in points)
    
    return jsonify({'total_points': total_points}), 200
