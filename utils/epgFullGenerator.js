/**
 * EPG synthétique complet de StreamLive.
 *
 * Ce générateur fournit exactement 20 créneaux / 24 h / chaîne lorsque
 * aucune grille éditoriale réelle n'est disponible. Il ne crée jamais
 * de disponibilité LIVE et ne prétend pas représenter une programmation
 * réellement diffusée.
 */

const CATEGORY_TEMPLATES = {
  National: [
    "Le Journal du Matin", "Talk-show : Grand Format", "Magazine de la Région",
    "Série Phare : Destins Croisés", "Le Grand Débat", "Journal Télévisé 13h",
    "Divertissement : Scènes de Rire", "Documentaire Découverte",
    "Série Dramatique : L'Héritage", "Magazine de la Consommation",
    "Le Grand Interview", "Journal Télévisé 20h", "Film Culte du Soir",
    "Show Musical", "Talk de Fin de Soirée", "Reportage Spécial",
    "Série Jeunesse & Famille", "Le Sport en Question",
    "Cinéma d'Auteur", "Nuit Blanche : Rediffusions"
  ],
  Info: [
    "Morning News en Direct", "Le Flash Info", "Éco & Finances",
    "Géopolitique : L'Enjeu Mondial", "Le Grand Journal d'Information",
    "Débat : Face à l'Actu", "Météo Internationale", "Technologie & Avenir",
    "Reportage Grand Format", "Le Journal des Marchés",
    "Politique : Les Coulisses", "Point Presse International",
    "L'Invité du Jour", "Cybersécurité & Société", "Culture & Monde",
    "Sport Info : Résultats", "Regard sur la Planète", "Édition Spéciale Soir",
    "La Chronique des Analyses", "Nuit Info : Le Récapitulatif"
  ],
  Jeunesse: [
    "Réveil en Chansons Animées", "Aventures du Matin", "Mission Pat' Patrouille",
    "Créatures et Aventures", "Le Monde de l'Animation", "Comédie Familiale",
    "Série Live-Action", "La Grande Aventure", "Mystères et Secrets",
    "Histoires pour Petits", "Aventures avec les Héros", "Clips et Musique Jeunesse",
    "Super-Héros en Action", "Atelier Bricolage et Dessin",
    "Le Royaume Enchanté", "Aventure Anime", "Le Monde Fantastique",
    "Comédie Familiale Après-Midi", "Histoires pour s'endormir",
    "Soirée Animée : Le Film"
  ],
  Films: [
    "Blockbuster Action", "Novelas : Amour & Trahison",
    "Série Policière : Enquête sous tension", "Thriller Nocturne",
    "Comédie Romantique : Coup de Foudre", "Drame Historique : Les Empires",
    "Cinéma Indépendant : Talents", "Classique du Cinéma",
    "Série Fantastique : Mondes Oubliés", "Le Mag des Nouveautés Ciné",
    "Action Mania : Opération Spéciale", "Telenovela : Destins Brisés",
    "Science-Fiction : Horizon", "Le Club des Cinéphiles",
    "Film d'Animation", "Série Thriller : Le Complot",
    "Western : La Loi de l'Ouest", "Midnight Movie",
    "Série d'Épouvante et Frissons", "Le Grand Marathon des Séries"
  ],
  Biblical: [
    "Morning Prayer : Bien démarrer la journée", "Étude Biblique",
    "Louange Matinale", "Enseignement de Foi et Victoire",
    "Témoignages et Guérisons", "Le Journal Chrétien",
    "Jeunesse : Parole Vivante", "Concert Gospel",
    "Questions sur la Foi", "Lumière sur l'Écriture",
    "Documentaire : Sur les pas des Prophètes", "Débat Spirituel",
    "Culte / Spécial", "Sagesse pour le Quotidien",
    "Chants de Sion", "Mission et Évangélisation",
    "Prière d'Intercession du Soir", "Méditation Nocturne",
    "Histoires de la Bible pour Enfants", "Nuit de Veillée et Paix"
  ]
};

// Grille A+ Ivoire fournie par le catalogue éditorial du projet.
const A_PLUS_IVOIRE = [
  ["Talk du Matin : Réveil Africain", 60],
  ["Ma Famille", 90],
  ["MTV Shuga Babi", 60],
  ["Les Larmes de l'Amour", 60],
  ["Cœurs Brisés", 60],
  ["Défends tes 50 000", 60],
  ["Le Journal d'A+", 60],
  ["Les Coups de la Vie", 90],
  ["Pakgne", 60],
  ["Allô Tribunal", 60],
  ["Invisibles", 60],
  ["Le Choix de Marianne", 60],
  ["Assaba", 60],
  ["Or Noir", 60],
  ["Le Mystère d'Akwaba", 90],
  ["Comédie Club Africa", 60],
  ["Nuits d'Abidjan", 60],
  ["Cinéma Africain : Le Grand Écran", 90],
  ["Intégrale Séries : Rediffusion de la Semaine", 120],
  ["A+ Music Night", 120]
];

const DURATIONS = [60, 90, 60, 60, 60, 60, 60, 90, 60, 60, 60, 60, 60, 60, 90, 60, 60, 90, 120, 120];

function formatTime(totalMinutes) {
  const minutes = ((totalMinutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

function scheduleFor(channel) {
  if (channel?.id === "a-plus-ivoire") return A_PLUS_IVOIRE;
  const titles = CATEGORY_TEMPLATES[channel?.group] || CATEGORY_TEMPLATES.National;
  return titles.map((title, index) => [title, DURATIONS[index]]);
}

function generateFullCatalogPrograms(channel, options = {}) {
  const count = Number.isInteger(options.count) ? options.count : 20;
  const safeCount = Math.max(1, Math.min(count, 20));
  const schedule = scheduleFor(channel).slice(0, safeCount);
  const startMinutes = Number.isInteger(options.startMinutes) ? options.startMinutes : 360;
  const programs = [];
  let cursor = startMinutes;

  for (let index = 0; index < schedule.length; index += 1) {
    const [title, durationMinutes] = schedule[index];
    const startTime = formatTime(cursor);
    const endTime = formatTime(cursor + durationMinutes);

    programs.push({
      programId: `epgfull-${channel.id}-${String(index + 1).padStart(2, "0")}`,
      channelId: channel.id,
      epgId: `epg.${channel.id}.prog-${index + 1}`,
      title,
      type: channel.group === "Films" ? "movie" : "show",
      description: `Grille EPG synthétique de ${channel.name} — ${title}.`,
      startTime,
      endTime,
      startAtTime: startTime,
      endAtTime: endTime,
      duration: `${durationMinutes} min`,
      generated: true,
      source: "synthetic-full-epg",
      catalogEnabled: true,
      streamEnabled: false,
      stream: { enabled: false, status: "INACTIVE" }
    });

    cursor += durationMinutes;
  }

  return programs;
}

module.exports = {
  CATEGORY_TEMPLATES,
  generateFullCatalogPrograms
};
