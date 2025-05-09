from . import db

class Utilisateur(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50))
    prenom = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(50))
    age = db.Column(db.Integer)
    taille = db.Column(db.Float)
    points_total = db.Column(db.Integer, default=0)
    image = db.Column(db.String(50))
    avatar = db.Column(db.String(50))

    niveau = db.relationship('Niveau', backref='utilisateur', uselist=False)
    badge = db.relationship('Badge', backref='utilisateur', uselist=False)
    points = db.relationship('Points', backref='utilisateur')
    classements = db.relationship('Classement', backref='utilisateur')
    journees = db.relationship('Journee', backref='utilisateur')

class Objectif(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    valeur_cible = db.Column(db.Float)
    valeur_actuelle = db.Column(db.Float)
    status = db.Column(db.Boolean)

    hydratation = db.relationship('Hydratation', backref='objectif', uselist=False)
    sommeil = db.relationship('Sommeil', backref='objectif', uselist=False)
    pas = db.relationship('Pas', backref='objectif', uselist=False)
    poids = db.relationship('Poids', backref='objectif', uselist=False)
    nutrition = db.relationship('Nutrition', backref='objectif', uselist=False)
    posture = db.relationship('Posture', backref='objectif', uselist=False)
    entrainement = db.relationship('Entrainement', backref='objectif', uselist=False)
    points = db.relationship('Points', backref='objectif')

# Objectifs spécialisés
class Hydratation(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('objectif.id'), primary_key=True)

class Sommeil(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('objectif.id'), primary_key=True)

class Pas(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('objectif.id'), primary_key=True)

class Poids(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('objectif.id'), primary_key=True)

class Nutrition(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('objectif.id'), primary_key=True)
    proteines = db.Column(db.Float)
    glucides = db.Column(db.Float)
    lipides = db.Column(db.Float)

class Posture(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('objectif.id'), primary_key=True)
    posture_description = db.Column(db.String(255))

class Entrainement(db.Model):
    id = db.Column(db.Integer, db.ForeignKey('objectif.id'), primary_key=True)
    type_entrainement = db.Column(db.String(100))
    duree = db.Column(db.Integer)

# Points & autres
class Points(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_utilisateur = db.Column(db.Integer, db.ForeignKey('utilisateur.id'))
    id_objectif = db.Column(db.Integer, db.ForeignKey('objectif.id'))
    points_obtenus = db.Column(db.Integer)
    date = db.Column(db.DateTime, server_default=db.func.now())

class Classement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_utilisateur = db.Column(db.Integer, db.ForeignKey('utilisateur.id'))
    classement = db.Column(db.Integer)

class Journee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, server_default=db.func.now())
    id_utilisateur = db.Column(db.Integer, db.ForeignKey('utilisateur.id'))
    id_points = db.Column(db.Integer, db.ForeignKey('points.id'))
    points_journaliers = db.Column(db.Integer)

class Niveau(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_utilisateur = db.Column(db.Integer, db.ForeignKey('utilisateur.id'))
    label = db.Column(db.String(255))

class Badge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_utilisateur = db.Column(db.Integer, db.ForeignKey('utilisateur.id'))
    label = db.Column(db.String(255))