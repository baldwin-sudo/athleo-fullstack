from flask import Blueprint, jsonify
from app.models import Classement, Utilisateur

classement_bp = Blueprint('classement', __name__)

@classement_bp.route('/classements', methods=['GET'])
def get_classements():
    classements = Classement.query.order_by(Classement.classement.asc()).all()
    result = []
    for c in classements:
        user = Utilisateur.query.get(c.id_utilisateur)
        if user:
            result.append({
                'rang': c.classement,
                'id_utilisateur': user.id,
                'nom': user.nom,
                'prenom': user.prenom,
                'username': user.username,
                'points_total': user.points_total,
            })
    return jsonify(result), 200
