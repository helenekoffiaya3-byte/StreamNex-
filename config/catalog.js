/**
 * StreamLive catalogue éditorial statique.
 *
 * Le catalogue est indépendant des flux vidéo :
 * - catalogEnabled=true : visible dans le catalogue.
 * - streamEnabled=false : aucune lecture vidéo activée par ce catalogue.
 * - stream.enabled=false/status=INACTIVE : flux volontairement inactif.
 *
 * Les films sont classés par marque/catalogue éditorial, pas présentés
 * comme une preuve de droits de diffusion ou de flux disponible.
 */

const makeProgram = (id, title, type = 'show', extra = {}) => ({
  programId: id,
  title,
  type,
  description: '',
  poster: null,
  catalogEnabled: true,
  streamEnabled: false,
  stream: { enabled: false, status: 'INACTIVE' },
  originalChannel: extra.originalChannel ?? null,
  studio: extra.studio ?? null,
  category: extra.category ?? (type === 'movie' ? 'film' : 'programme'),
  ...extra
});

const CHANNEL_CATALOG = {
  'nickelodeon': [
    ['bob-leponge', "Bob l'Éponge"], ['razmoket', 'Les Razmoket'], ['hey-arnold', 'Hé Arnold !'],
    ['mes-parrains-magiques', 'Mes parrains sont magiques'], ['danny-phantom', 'Danny Fantôme'],
    ['jimmy-neutron', 'Jimmy Neutron'], ['bienvenue-chez-les-loud', 'Bienvenue chez les Loud'],
    ['icarly', 'iCarly'], ['drake-et-josh', 'Drake & Josh'], ['victorious', 'Victorious'],
    ['big-time-rush', 'Big Time Rush'], ['les-thunderman', 'Les Thunderman'],
    ['henry-danger', 'Henry Danger'], ['anubis', 'Anubis'],
    ['avatar-le-dernier-maitre-de-lair', "Avatar, le dernier maître de l'air"],
    ['legende-de-korra', 'La Légende de Korra']
  ],
  'nickelodeon-junior': [
    ['paw-patrol', 'Paw Patrol'], ['dora', 'Dora'], ['wonder-pets', 'Wonder Pets']
  ],
  'disney-channel': [
    ['hannah-montana', 'Hannah Montana'], ['wizards-of-waverly-place', 'Wizards of Waverly Place'],
    ['phineas-et-ferb', 'Phinéas et Ferb'], ['kim-possible', 'Kim Possible'],
    ['gravity-falls', 'Gravity Falls'], ['star-butterfly', 'Star Butterfly'],
    ['owl-house', 'Owl House'], ['amphibia', 'Amphibia'], ['jessie', 'Jessie'],
    ['kc-clandestine', 'K.C. Clandestine']
  ],
  'disney-junior': [
    ['mickey-mouse-clubhouse', 'Mickey Mouse Clubhouse'], ['doc-mcstuffins', 'Doc McStuffins'],
    ['pj-masks', 'PJ Masks'], ['sofia-the-first', 'Sofia the First']
  ],
  'cartoon-network': [
    ['gumball', 'Gumball'], ['adventure-time', 'Adventure Time'], ['teen-titans-go', 'Teen Titans Go!'],
    ['dexters-laboratory', "Dexter's Laboratory"], ['powerpuff-girls', 'Powerpuff Girls'],
    ['ben-10', 'Ben 10'], ['steven-universe', 'Steven Universe'], ['regular-show', 'Regular Show'],
    ['craig-of-the-creek', 'Craig of the Creek'], ['we-bare-bears', 'We Bare Bears']
  ],
  'tfou': [
    ['miraculous', 'Miraculous'], ['tchoupi-et-doudou', 'Tchoupi et Doudou']
  ],
  'france-3': [
    ['cest-pas-sorcier', "C'est pas sorcier"], ['il-etait-une-fois-la-vie', 'Il était une fois... la Vie'],
    ['il-etait-une-fois-lhomme', "Il était une fois... l'Homme"],
    ['mysterieuses-cites-dor', "Les Mystérieuses Cités d'Or"], ['tintin', 'Tintin'],
    ['wakfu', 'Wakfu'], ['lou', 'Lou!'], ['1-jour-1-question', '1 jour, 1 question']
  ],
  'gulli': [
    ['oggy-et-les-cafards', 'Oggy et les Cafards'], ['totally-spies', 'Totally Spies!'], ['code-lyoko', 'Code Lyoko']
  ],
  'm6': [
    ['martin-mystere', 'Martin Mystère'], ['inspecteur-gadget', 'Inspecteur Gadget']
  ],
  'rti-1': [
    ['journal-televise-20h', 'Journal Télévisé 20H', 'news']
  ]
};

const UNASSIGNED_CATALOG = [
  ['bluey', 'Bluey'], ['hilda', 'Hilda'], ['trollhunters', 'Trollhunters'],
  ['chica-vampiro', 'Chica Vampiro'], ['peppa-pig', 'Peppa Pig'], ['molang', 'Molang']
];

const FILM_CATALOG = {
  'disney-channel': [
    ['high-school-musical', 'High School Musical'],
    ['hocus-pocus', 'Hocus Pocus'],
    ['rasta-rockett', 'Rasta Rockett'],
    ['pirates-des-caraibes-maleddiction-du-black-pearl', 'Pirates des Caraïbes : La Malédiction du Black Pearl'],
    ['le-roi-lion', 'Le Roi Lion'], ['aladdin', 'Aladdin'], ['la-reine-des-neiges', 'La Reine des Neiges'],
    ['zootopie', 'Zootopie'], ['mulan', 'Mulan'], ['raiponce', 'Raiponce']
  ].map(([id, title]) => makeProgram('film-' + id, title, 'movie', { studio: 'Disney', category: 'film' })),

  'nickelodeon': [
    ['bob-leponge-le-film', "Bob l'Éponge, le film"],
    ['razmoket-a-paris', 'Les Razmoket à Paris'],
    ['jimmy-neutron-un-garcon-genial', 'Jimmy Neutron : Un garçon génial'],
    ['rango', 'Rango'],
    ['teenage-mutant-ninja-turtles-mutant-mayhem', 'Ninja Turtles: Teenage Years'],
    ['chroniques-de-spiderwick', 'Les Chroniques de Spiderwick'],
    ['lemony-snicket', 'Lemony Snicket : Les Désastreuses Aventures des orphelins Baudelaire']
  ].map(([id, title]) => makeProgram('film-' + id, title, 'movie', { studio: 'Nickelodeon Movies', category: 'film' }))
};

const DC_RESERVE = [
  ['superman-1978', 'Superman (1978)'],
  ['the-dark-knight', 'The Dark Knight : Le Chevalier Noir'],
  ['man-of-steel', 'Man of Steel'],
  ['wonder-woman', 'Wonder Woman'],
  ['the-batman-2022', 'The Batman'],
  ['batman-mask-of-the-phantasm', 'Batman: Mask of the Phantasm'],
  ['justice-league-dark', 'Justice League Dark'],
  ['justice-league-flashpoint-paradox', 'Justice League : Le Paradoxe Flashpoint'],
  ['teen-titans-go-le-film', 'Teen Titans Go! Le Film']
].map(([id, title]) => makeProgram('film-dc-' + id, title, 'movie', {
  studio: 'DC',
  category: 'film',
  originalChannel: null
}));

function buildChannelPrograms() {
  const result = {};
  for (const [channelId, entries] of Object.entries(CHANNEL_CATALOG)) {
    result[channelId] = entries.map(([id, title, type]) =>
      makeProgram(id, title, type, { originalChannel: channelId })
    );
  }
  for (const [channelId, entries] of Object.entries(FILM_CATALOG)) {
    result[channelId] = [...(result[channelId] || []), ...entries.map(program => ({
      ...program,
      originalChannel: channelId
    }))];
  }
  return result;
}

const channelPrograms = buildChannelPrograms();
const unassignedPrograms = UNASSIGNED_CATALOG.map(([id, title]) =>
  makeProgram(id, title, 'show', { originalChannel: null })
);

function assignProgramToChannel(channels, unassignedPrograms, programId, targetChannelId) {
  const channel = channels.find(c => c.channelId === targetChannelId);

  if (!channel) {
    return { success: false, reason: 'Chaîne cible introuvable' };
  }

  if (!Array.isArray(channel.programs)) {
    return { success: false, reason: 'Structure de programmes invalide' };
  }

  const programIndex = unassignedPrograms.findIndex(p => p.programId === programId);

  if (programIndex === -1) {
    return { success: false, reason: 'Programme introuvable dans la réserve' };
  }

  const alreadyExists = channel.programs.some(p => p.programId === programId);

  if (alreadyExists) {
    return { success: false, reason: 'Le programme existe déjà sur cette chaîne' };
  }

  const [program] = unassignedPrograms.splice(programIndex, 1);
  program.originalChannel = targetChannelId;
  channel.programs.push(program);

  return { success: true, updatedChannel: channel };
}

module.exports = {
  channelPrograms,
  unassignedPrograms,
  dcReserve: DC_RESERVE,
  assignProgramToChannel
};
