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
  country: null,
  year: null,
  director: null,
  actors: [],
  poster: null,
  epgId: null,
  audioTracks: [],
  subtitles: [],
  seasons: [],
  catalogEnabled: true,
  streamEnabled: false,
  stream: { enabled: false, status: 'INACTIVE' },
  // Téléchargement VOD explicite et séparé de la lecture LIVE.
  // Aucun fichier n'est exposé tant que downloadEnabled n'est pas true.
  downloadEnabled: false,
  videoFilePath: null,
  channelId: extra.channelId ?? extra.originalChannel ?? null,
  originalChannel: extra.originalChannel ?? null,
  studio: extra.studio ?? null,
  category: extra.category ?? (type === 'movie' ? 'film' : 'programme'),
  ...extra
});

// Téléfilms Nickelodeon live-action : catalogue VOD/EPG, sans animation.
const NICK_LIVE_ACTION = [
  ["NICK-MA-001","iCarly va au Japon","iGo to Japan",2008,"Comédie, Jeunesse, Aventure","Carly, Sam et Freddie s'envolent pour le Japon après avoir été nommés à un prix international de web-émissions, mais leur voyage vire au désastre.",["Miranda Cosgrove","Jennette McCurdy","Nathan Kress","Jerry Trainor"]],
  ["NICK-MA-002","iCarly & Victorious : Le Crossover","iParty with Victorious",2011,"Comédie, Musical, Jeunesse","Carly et ses amis découvrent que le nouveau petit ami de Carly sort aussi avec Tori Vega, ce qui mène à une fête géante inter-séries.",["Miranda Cosgrove","Victoria Justice","Jennette McCurdy","Leon Thomas III"]],
  ["NICK-MA-003","Drake & Josh à Hollywood","Drake & Josh Go Hollywood",2006,"Comédie, Aventure","Drake et Josh se retrouvent à Los Angeles après une erreur qui les plonge dans une affaire de fausse monnaie.",["Drake Bell","Josh Peck","Miranda Cosgrove"]],
  ["NICK-MA-004","Joyeux Noël Drake & Josh","Merry Christmas, Drake & Josh",2008,"Comédie, Famille, Noël","Drake et Josh doivent offrir le meilleur Noël possible à une famille d'accueil.",["Drake Bell","Josh Peck","Miranda Cosgrove"]],
  ["NICK-MA-005","Professeur malgré lui","Gym Teacher: The Movie",2008,"Comédie","Un ancien athlète devenu professeur tente de motiver ses élèves et de retrouver sa réputation.",["Christopher Meloni","Nathan Kress"]],
  ["NICK-MA-006","Spectacular!","Spectacular!",2009,"Comédie, Musical","Un jeune rockeur rejoint une chorale rivale pour participer à un concours national.",["Tammin Sursok","Nolan Gerard Funk","Victoria Justice"]],
  ["NICK-MA-007","Le Vampire du quartier","The Boy Who Cried Werewolf",2010,"Comédie, Fantastique","Une adolescente hérite d'un manoir en Roumanie et découvre une mystérieuse transformation.",["Victoria Justice","Chase Ellison","Brooke Shields"]],
  ["NICK-MA-008","Le Boycott d'Avoir Trop de Devoirs","Best Player",2011,"Comédie, Jeunesse","Deux joueurs s'affrontent pour devenir les meilleurs à un jeu vidéo en ligne.",["Jerry Trainor","Jennette McCurdy"]],
  ["NICK-MA-009","Big Time Movie","Big Time Movie",2012,"Comédie, Action, Musical","Big Time Rush arrive à Londres et se retrouve mêlé à une mission d'espionnage.",["Kendall Schmidt","James Maslow","Carlos PenaVega","Logan Henderson"]],
  ["NICK-MA-010","Rags","Rags",2012,"Comédie, Musical, Romance","Une relecture musicale du conte de Cendrillon centrée sur un jeune artiste.",["Keke Palmer","Max Schneider"]],
  ["NICK-MA-011","Arnaque à la carte","Swindle",2013,"Comédie, Action","Un groupe d'adolescents prépare un casse pour récupérer une carte de baseball.",["Jennette McCurdy","Ariana Grande","Noah Crawford","Ciara Bravo"]],
  ["NICK-MA-012","Nicky Deuce","Nicky Deuce",2013,"Comédie, Action","Un jeune garçon passe l'été à Brooklyn et se fait passer pour un caïd.",["Noah Munck","Steve Schirripa","Michael Imperioli"]],
  ["NICK-MA-013","La Poisse !","Jinxed",2013,"Comédie, Famille","Une adolescente tente de briser une malédiction familiale.",["Ciara Bravo","Jacob Bertrand","Elena Kampouris"]],
  ["NICK-MA-014","Santa Hunters","Santa Hunters",2014,"Comédie, Famille, Noël","Des enfants construisent un dispositif pour filmer le Père Noël.",["Benjamin Flores Jr.","Breanna Yde","Mace Coronel"]],
  ["NICK-MA-015","One Crazy Cruise","One Crazy Cruise",2015,"Comédie","Une famille recomposée vit une aventure chaotique sur un bateau de croisière.",["Rio Mangini","Brec Bassinger","Ella Anderson"]],
  ["NICK-MA-016","Rufus","Rufus",2016,"Comédie, Famille","Un chien devient humain grâce à une amulette magique et intègre l'école.",["Jace Norman","Davis Cleveland","Haley Tju"]],
  ["NICK-MA-017","Rufus 2","Rufus 2",2017,"Comédie, Famille","Le chien devenu humain vit de nouvelles péripéties au collège.",["Jace Norman","Davis Cleveland","Haley Tju"]],
  ["NICK-MA-018","Legends of the Hidden Temple","Legends of the Hidden Temple",2016,"Aventure, Action","Trois frères et sœurs se retrouvent au cœur d'une aventure inspirée du jeu télévisé.",["Isabela Merced","Colin Critchley","Jet Jurgensmeyer"]],
  ["NICK-MA-019","Pris au piège","Blurt!",2018,"Comédie, Fantastique","Après un accident de réalité virtuelle, un collégien dit à voix haute tout ce qu'il pense.",["Jace Norman","JoJo Siwa","Daniella Perkins"]],
  ["NICK-MA-020","Bixler High Private Eye","Bixler High Private Eye",2019,"Comédie, Mystère","Un jeune détective enquête sur la disparition de son père.",["Jace Norman","Ariel Martin"]],
  ["NICK-MA-021","The J Team","The J Team",2021,"Musical, Famille","JoJo Siwa doit se réinventer après avoir été évincée de son académie de danse.",["JoJo Siwa","Tiera Skovbye","Kiara Groulx"]],
  ["NICK-MA-022","Bienvenue chez les Loud : Le Film de Noël","A Loud House Christmas",2021,"Comédie, Famille, Noël","Lincoln prépare les fêtes avec sa grande famille.",["Wolfgang Schaeffer","Javier Muñoz","Brian Stepanek"]],
  ["NICK-MA-023","Monster High : Le Film","Monster High: The Movie",2022,"Fantastique, Musical","Clawdeen Wolf intègre Monster High et tente de trouver sa place.",["Miia Harris","Ceci Balagot","Nayah Damasen"]],
  ["NICK-MA-024","Monster High 2","Monster High 2",2023,"Fantastique, Musical","Clawdeen, Draculaura et Frankie affrontent de nouvelles menaces à Monster High.",["Miia Harris","Ceci Balagot","Nayah Damasen"]],
  ["NICK-MA-025","A Really Haunted Loud House","A Really Haunted Loud House",2023,"Comédie, Famille, Fantastique","Lincoln et Clyde vivent une aventure surnaturelle pendant Halloween.",["Wolfgang Schaeffer","Jelah Ashed","Brian Stepanek"]],
  ["NICK-MA-026","Le Retour des Thunderman","The Thundermans Return",2024,"Comédie, Super-héros, Famille","La famille Thunderman revient après la série originale pour une nouvelle mission.",["Kira Kosarin","Jack Griffo","Addison Riecke","Diego Velazquez"]]
].map(x => makeProgram(x[0], x[1], "movie", { originalTitle:x[2], year:x[3], genre:x[4].split(", "), description:x[5], actors:x[6], country:"États-Unis", network:"Nickelodeon", category:"nickelodeon-live-action", epgId:"epg."+x[0].toLowerCase(), audioTracks:[], subtitles:[], streamEnabled:false, stream:{enabled:false,status:"INACTIVE"} }));

// Métadonnées éditoriales des films demandées pour les fiches VOD.
// Les URLs de lecture restent désactivées tant qu'un flux VOD autorisé n'est pas configuré.
const FILM_METADATA = {
  'film-high-school-musical': { year: 2006, country: 'États-Unis', director: 'Kenny Ortega', actors: ['Zac Efron', 'Vanessa Hudgens', 'Ashley Tisdale', 'Lucas Grabeel'] },
  'film-hocus-pocus': { year: 1993, country: 'États-Unis', director: 'Kenny Ortega', actors: ['Bette Midler', 'Sarah Jessica Parker', 'Kathy Najimy'] },
  'film-rasta-rockett': { year: 1993, country: 'États-Unis', director: 'Jon Turteltaub', actors: ['John Candy', 'Leon Robinson', 'Doug E. Doug', 'Rawle D. Lewis'] },
  'film-pirates-des-caraibes-maleddiction-du-black-pearl': { year: 2003, country: 'États-Unis', director: 'Gore Verbinski', actors: ['Johnny Depp', 'Geoffrey Rush', 'Orlando Bloom', 'Keira Knightley'] },
  'film-le-roi-lion': { year: 1994, country: 'États-Unis', director: 'Roger Allers, Rob Minkoff', actors: ['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones', 'Moira Kelly'] },
  'film-aladdin': { year: 1992, country: 'États-Unis', director: 'Ron Clements, John Musker', actors: ['Scott Weinger', 'Robin Williams', 'Linda Larkin', 'Jonathan Freeman'] },
  'film-la-reine-des-neiges': { year: 2013, country: 'États-Unis', director: 'Chris Buck, Jennifer Lee', actors: ['Kristen Bell', 'Idina Menzel', 'Jonathan Groff', 'Josh Gad'] },
  'film-zootopie': { year: 2016, country: 'États-Unis', director: 'Byron Howard, Rich Moore, Jared Bush', actors: ['Ginnifer Goodwin', 'Jason Bateman', 'Idris Elba', 'Jenny Slate'] },
  'film-mulan': { year: 1998, country: 'États-Unis', director: 'Tony Bancroft, Barry Cook', actors: ['Ming-Na Wen', 'Eddie Murphy', 'BD Wong', 'Miguel Ferrer'] },
  'film-raiponce': { year: 2010, country: 'États-Unis', director: 'Nathan Greno, Byron Howard', actors: ['Mandy Moore', 'Zachary Levi', 'Donna Murphy', 'Ron Perlman'] },
  'film-bob-leponge-le-film': { year: 2004, country: 'États-Unis', director: 'Stephen Hillenburg, Mark Osborne', actors: ['Tom Kenny', 'Clancy Brown', 'Rodger Bumpass', 'Bill Fagerbakke'] },
  'film-razmoket-a-paris': { year: 2000, country: 'États-Unis', director: 'Stig Bergqvist, Paul Demeyer', actors: ['Elizabeth Daily', 'Christine Cavanaugh', 'Kath Soucie', 'Phil Proctor'] },
  'film-jimmy-neutron-un-garcon-genial': { year: 2001, country: 'États-Unis', director: 'John A. Davis', actors: ['Debi Derryberry', 'Mark DeCarlo', 'Megan Cavanagh', 'Jeffrey Garcia'] },
  'film-rango': { year: 2011, country: 'États-Unis', director: 'Gore Verbinski', actors: ['Johnny Depp', 'Isla Fisher', 'Abigail Breslin', 'Ned Beatty'] },
  'film-teenage-mutant-ninja-turtles-mutant-mayhem': { year: 2023, country: 'États-Unis', director: 'Jeff Rowe', actors: ['Micah Abbey', 'Shamon Brown Jr.', 'Nicolas Cantu', 'Brady Noon'] },
  'film-chroniques-de-spiderwick': { year: 2008, country: 'États-Unis', director: 'Mark Waters', actors: ['Freddie Highmore', 'Sarah Bolger', 'Mary-Louise Parker', 'David Strathairn'] },
  'film-lemony-snicket': { year: 2004, country: 'États-Unis', director: 'Brad Silberling', actors: ['Jim Carrey', 'Meryl Streep', 'Jude Law', 'Emily Browning'] },
  'film-dc-superman-1978': { year: 1978, country: 'États-Unis', director: 'Richard Donner', actors: ['Christopher Reeve', 'Marlon Brando', 'Gene Hackman', 'Margot Kidder'] },
  'film-dc-the-dark-knight': { year: 2008, country: 'États-Unis, Royaume-Uni', director: 'Christopher Nolan', actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Michael Caine'] },
  'film-dc-man-of-steel': { year: 2013, country: 'États-Unis, Royaume-Uni', director: 'Zack Snyder', actors: ['Henry Cavill', 'Amy Adams', 'Michael Shannon', 'Russell Crowe'] },
  'film-dc-wonder-woman': { year: 2017, country: 'États-Unis, Chine, Hong Kong', director: 'Patty Jenkins', actors: ['Gal Gadot', 'Chris Pine', 'Connie Nielsen', 'Robin Wright'] },
  'film-dc-the-batman-2022': { year: 2022, country: 'États-Unis', director: 'Matt Reeves', actors: ['Robert Pattinson', 'Zoë Kravitz', 'Paul Dano', 'Jeffrey Wright'] },
  'film-dc-batman-mask-of-the-phantasm': { year: 1993, country: 'États-Unis', director: 'Eric Radomski, Bruce Timm', actors: ['Kevin Conroy', 'Dana Delany', 'Hart Bochner', 'Stacy Keach'] },
  'film-dc-justice-league-dark': { year: 2017, country: 'États-Unis', director: 'Jay Oliva', actors: ['Matt Ryan', 'Camilla Luddington', 'Jason O’Mara', 'Nicholas Turturro'] },
  'film-dc-justice-league-flashpoint-paradox': { year: 2013, country: 'États-Unis', director: 'Jay Oliva', actors: ['Justin Chambers', 'C. Thomas Howell', 'Kevin McKidd', 'Michael B. Jordan'] },
  'film-dc-teen-titans-go-le-film': { year: 2018, country: 'États-Unis', director: 'Aaron Horvath, Peter Rida Michail', actors: ['Greg Cipes', 'Scott Menville', 'Khary Payton', 'Tara Strong'] }
};

// Schéma commun des séries : les saisons/épisodes peuvent être alimentés par l'EPG
// et restent directement lisibles par l'interface VOD.
const FILM_DESCRIPTIONS = {
  'film-le-roi-lion': "Simba, jeune lion destiné à devenir roi, doit retrouver sa place après la mort de son père Mufasa.",
  'film-aladdin': "Aladdin, un jeune homme pauvre, découvre une lampe magique et rencontre un génie capable d'exaucer ses vœux.",
  'film-la-reine-des-neiges': "Elsa possède un pouvoir qui plonge son royaume dans un hiver éternel. Anna part à sa recherche pour sauver Arendelle.",
  'film-zootopie': "Judy Hopps, première lapine policière de Zootopie, s'allie au renard Nick Wilde pour résoudre une mystérieuse affaire.",
  'film-mulan': "Mulan prend la place de son père dans l'armée impériale et doit défendre la Chine tout en cachant son identité.",
  'film-raiponce': "Raiponce, une jeune fille aux cheveux extraordinaires, quitte sa tour pour découvrir le monde et ses origines.",
  'film-pirates-des-caraibes-maleddiction-du-black-pearl': "Le capitaine Jack Sparrow s'allie à Will Turner pour sauver Elizabeth Swann et récupérer le Black Pearl.",
  'film-high-school-musical': "Troy et Gabriella découvrent leur passion commune pour la musique et bouleversent les habitudes de leur lycée.",
  'film-hocus-pocus': "Trois sorcières reviennent à Salem après des siècles et menacent la ville lors de la nuit d'Halloween.",
  'film-rasta-rockett': "Une équipe jamaïcaine de bobsleigh se forme contre toute attente et tente de participer aux Jeux olympiques.",
  'film-bob-leponge-le-film': "Bob l'Éponge et Patrick partent dans une aventure pour retrouver la couronne du roi Neptune et sauver M. Krabs.",
  'film-razmoket-a-paris': "Les Razmoket accompagnent leurs parents à Paris et vivent une nouvelle aventure pleine de péripéties.",
  'film-jimmy-neutron-un-garcon-genial': "Jimmy Neutron doit sauver les adultes de Retroville après leur enlèvement par des extraterrestres.",
  'film-rango': "Rango, un caméléon domestique, devient malgré lui le shérif d'une ville du désert confrontée à une mystérieuse pénurie d'eau.",
  'film-teenage-mutant-ninja-turtles-mutant-mayhem': "Quatre tortues mutantes adolescentes cherchent à être acceptées par les humains tout en affrontant un mystérieux criminel.",
  'film-chroniques-de-spiderwick': "Les frères Grace découvrent un monde fantastique peuplé de créatures lorsqu'ils emménagent dans une vieille demeure.",
  'film-lemony-snicket': "Trois orphelins doivent échapper au comte Olaf, qui convoite leur fortune et tente de s'emparer de leur héritage.",
  'film-dc-superman-1978': "Clark Kent découvre son héritage kryptonien et devient Superman pour protéger l'humanité.",
  'film-dc-the-dark-knight': "Batman affronte le Joker, un criminel qui plonge Gotham dans une escalade de chaos et de violence.",
  'film-dc-man-of-steel': "Clark Kent découvre ses origines kryptoniennes et doit choisir comment utiliser ses pouvoirs pour protéger la Terre.",
  'film-dc-wonder-woman': "Diana quitte son île amazonienne et découvre le monde des humains en pleine Première Guerre mondiale.",
  'film-dc-the-batman-2022': "Batman enquête sur une série de meurtres qui révèle une conspiration profondément enracinée à Gotham.",
  'film-dc-batman-mask-of-the-phantasm': "Batman enquête sur l'apparition d'un mystérieux justicier qui exécute les criminels de Gotham.",
  'film-dc-justice-league-dark': "Batman réunit des héros dotés de pouvoirs surnaturels pour combattre une menace magique.",
  'film-dc-justice-league-flashpoint-paradox': "Flash modifie accidentellement la réalité et découvre un monde alternatif au bord de la guerre.",
  'film-dc-teen-titans-go-le-film': "Les Teen Titans partent à Hollywood pour obtenir leur propre film et affrontent un ennemi capable de contrôler la réalité."
};

function buildSeriesSeasons(occurrences) {
  const seasons = new Map();
  for (const occurrence of (Array.isArray(occurrences) ? occurrences : [])) {
    const seasonNumber = Number(occurrence.seasonNumber);
    const episodeNumber = Number(occurrence.episodeNumber);
    if (!Number.isInteger(seasonNumber) || seasonNumber < 1 || !Number.isInteger(episodeNumber) || episodeNumber < 1) continue;
    if (!seasons.has(seasonNumber)) seasons.set(seasonNumber, new Map());
    seasons.get(seasonNumber).set(episodeNumber, {
      episode_number: episodeNumber,
      title: occurrence.title || occurrence.subtitle || ('Épisode ' + episodeNumber),
      description: occurrence.description || '',
      duration: occurrence.durationMinutes ? (occurrence.durationMinutes + ' min') : null,
      epg_id: occurrence.occurrenceId ? ('epg_occ_' + occurrence.occurrenceId) : null,
      playback_url: null,
      audio_tracks: [],
      subtitles: []
    });
  }
  return Array.from(seasons.entries()).sort(function(a,b){return a[0]-b[0];}).map(function(entry){
    return { season_number: entry[0], episodes: Array.from(entry[1].values()).sort(function(a,b){return a.episode_number-b.episode_number;}) };
  });
}

function enrichProgram(program, occurrences) {
  const metadata = program.type === 'movie' ? (FILM_METADATA[program.programId] || {}) : (SERIES_METADATA[program.programId] || {});
  const description = program.description || FILM_DESCRIPTIONS[program.programId] || (program.type === 'show' ? (program.title + ' — fiche catalogue StreamLive.') : '');
  const seasons = program.type === 'movie' ? [] : buildSeriesSeasons(occurrences);
  const channelId = program.channelId || program.originalChannel || null;
  const epgId = program.epgId || (channelId ? ('epg.' + channelId + '.' + program.programId) : null);
  return Object.assign({}, program, metadata, { channelId: channelId, epgId: epgId, description: description, seasons: seasons.length ? seasons : (Array.isArray(program.seasons) ? program.seasons : []), audioTracks: Array.isArray(program.audioTracks) ? program.audioTracks : [], subtitles: Array.isArray(program.subtitles) ? program.subtitles : [] });
}

const SERIES_METADATA = {
  'bob-leponge': { country: 'États-Unis', actors: ['Tom Kenny', 'Clancy Brown', 'Bill Fagerbakke'] },
  'razmoket': { country: 'États-Unis', actors: ['Elizabeth Daily', 'Nancy Cartwright', 'Kath Soucie'] },
  'hey-arnold': { country: 'États-Unis', actors: ['Francesca Marie Smith', 'Phillip Van Dyke', 'Justin Shenkarow'] },
  'mes-parrains-magiques': { country: 'États-Unis', actors: ['Tara Strong', 'Susan Blakeslee', 'Daran Norris'] },
  'danny-phantom': { country: 'États-Unis', actors: ['David Kaufman', 'Grey DeLisle', 'Colleen O’Shaughnessey'] },
  'jimmy-neutron': { country: 'États-Unis', actors: ['Debi Derryberry', 'Mark DeCarlo', 'Megan Cavanagh'] },
  'bienvenue-chez-les-loud': { country: 'États-Unis', actors: ['Grant Palmer', 'Catherine Taber', 'Liliana Mumy'] },
  'icarly': { country: 'États-Unis', actors: ['Miranda Cosgrove', 'Jennette McCurdy', 'Nathan Kress'] },
  'drake-et-josh': { country: 'États-Unis', actors: ['Drake Bell', 'Josh Peck', 'Miranda Cosgrove'] },
  'victorious': { country: 'États-Unis', actors: ['Victoria Justice', 'Leon Thomas III', 'Matt Bennett'] },
  'big-time-rush': { country: 'États-Unis', actors: ['Kendall Schmidt', 'James Maslow', 'Carlos PenaVega', 'Logan Henderson'] },
  'les-thunderman': { country: 'États-Unis', actors: ['Kira Kosarin', 'Jack Griffo', 'Addison Riecke'] },
  'henry-danger': { country: 'États-Unis', actors: ['Jace Norman', 'Cooper Barnes', 'Riele Downs'] },
  'anubis': { country: 'Royaume-Uni, Belgique, États-Unis', actors: ['Nathalia Ramos', 'Brad Kavanagh', 'Ana Mulvoy Ten'] },
  'avatar-le-dernier-maitre-de-lair': { country: 'États-Unis', actors: ['Zach Tyler Eisen', 'Mae Whitman', 'Jack DeSena'] },
  'legende-de-korra': { country: 'États-Unis', actors: ['Janet Varney', 'Seychelle Gabriel', 'David Faustino'] },
  'paw-patrol': { country: 'Canada', actors: ['Devan Cohen', 'Owen Mason', 'Kallan Holley'] },
  'dora': { country: 'États-Unis, Canada', actors: ['Fátima Ptacek', 'Regan Mizrahi', 'Marc Weiner'] },
  'wonder-pets': { country: 'États-Unis', actors: ['Sophie Zamchick', 'Teala Dunn', 'Danica Lee'] },
  'hannah-montana': { country: 'États-Unis', actors: ['Miley Cyrus', 'Emily Osment', 'Billy Ray Cyrus'] },
  'wizards-of-waverly-place': { country: 'États-Unis', actors: ['Selena Gomez', 'David Henrie', 'Jake T. Austin'] },
  'phineas-et-ferb': { country: 'États-Unis', actors: ['Vincent Martella', 'Thomas Brodie-Sangster', 'Ashley Tisdale'] },
  'kim-possible': { country: 'États-Unis', actors: ['Christy Carlson Romano', 'Will Friedle', 'Nancy Cartwright'] },
  'gravity-falls': { country: 'États-Unis', actors: ['Jason Ritter', 'Kristen Schaal', 'Alex Hirsch'] },
  'star-butterfly': { country: 'États-Unis', actors: ['Eden Sher', 'Adam McArthur', 'Alan Tudyk'] },
  'owl-house': { country: 'États-Unis', actors: ['Sarah-Nicole Robles', 'Wendie Malick', 'Alex Hirsch'] },
  'amphibia': { country: 'États-Unis', actors: ['Brenda Song', 'Justin Felbinger', 'Bill Farmer'] },
  'jessie': { country: 'États-Unis', actors: ['Debby Ryan', 'Peyton List', 'Cameron Boyce'] },
  'kc-clandestine': { country: 'États-Unis', actors: ['Zendaya', 'Veronica Dunne', 'Kamil McFadden'] },
  'mickey-mouse-clubhouse': { country: 'États-Unis', actors: ['Bret Iwan', 'Russi Taylor', 'Bill Farmer'] },
  'doc-mcstuffins': { country: 'États-Unis', actors: ['Kiara Muhammad', 'Loretta Devine', 'Jess Harnell'] },
  'pj-masks': { country: 'France, Royaume-Uni', actors: ['Jacob Ewaniuk', 'Kyle Harrison Breitkopf', 'Addison Chandler'] },
  'sofia-the-first': { country: 'États-Unis', actors: ['Ariel Winter', 'Darcy Rose Byrnes', 'Zach Callison'] },
  'gumball': { country: 'Royaume-Uni, Allemagne, États-Unis, Irlande', actors: ['Jacob Hopkins', 'Teresa Gallagher', 'Kyla Rae Kowalewski'] },
  'adventure-time': { country: 'États-Unis', actors: ['Jeremy Shada', 'John DiMaggio', 'Tom Kenny'] },
  'teen-titans-go': { country: 'États-Unis', actors: ['Scott Menville', 'Greg Cipes', 'Khary Payton'] },
  'dexters-laboratory': { country: 'États-Unis', actors: ['Christine Cavanaugh', 'Kat Cressida', 'Jeff Bennett'] },
  'powerpuff-girls': { country: 'États-Unis', actors: ['Cathy Cavadini', 'Tara Strong', 'E. G. Daily'] },
  'ben-10': { country: 'États-Unis', actors: ['Tara Strong', 'Meagan Smith', 'Paul Eiding'] },
  'steven-universe': { country: 'États-Unis', actors: ['Zach Callison', 'Estelle', 'Michaela Dietz'] },
  'regular-show': { country: 'États-Unis', actors: ['J. G. Quintel', 'William Salyers', 'Sam Marin'] },
  'craig-of-the-creek': { country: 'États-Unis', actors: ['Philip Solomon', 'Michael Croner', 'Georgie Kidder'] },
  'we-bare-bears': { country: 'États-Unis', actors: ['Eric Edelstein', 'Bobby Moynihan', 'Demetri Martin'] },
  'miraculous': { country: 'France, Corée du Sud, Japon', actors: ['Cristina Vee', 'Bryce Papenbrook', 'Keith Silverstein'] },
  'tchoupi-et-doudou': { country: 'France', actors: ['Helena Coppejans', 'Jennifer Baré', 'Sophie Landresse'] },
  'cest-pas-sorcier': { country: 'France', actors: ['Fred Courant', 'Jamy Gourmaud', 'Sabine Quindou'] },
  'il-etait-une-fois-la-vie': { country: 'France', actors: ['Roger Carel', 'Annie Balestra', 'Alain Dorval'] },
  'il-etait-une-fois-lhomme': { country: 'France', actors: ['Roger Carel', 'Annie Balestra'] },
  'mysterieuses-cites-dor': { country: 'France, Japon', actors: ['Jackie Berger', 'Isabelle Ganz', 'Jean-Pierre Leroux'] },
  'tintin': { country: 'France, Canada', actors: ['Colin O’Meara', 'David Fox', 'Wayne Robson'] },
  'wakfu': { country: 'France', actors: ['Fanny Bloc', 'Thomas Guitard', 'Patrick Béthune'] },
  'lou': { country: 'France', actors: ['Léa Gabriele', 'Margaux Laplace', 'Clara Quilichini'] },
  '1-jour-1-question': { country: 'France', actors: [] },
  'oggy-et-les-cafards': { country: 'France', actors: ['Don Michael Paul', 'Hugues Le Bars'] },
  'totally-spies': { country: 'France, Canada', actors: ['Jennifer Hale', 'Andrea Baker', 'Katie Griffin'] },
  'code-lyoko': { country: 'France', actors: ['Mirabelle Kirkland', 'Barbara Weber-Scaff', 'Matthew Géczy'] },
  'martin-mystere': { country: 'France, Canada', actors: ['Samuel Vincent', 'Kelly Sheridan', 'Terry Klassen'] },
  'inspecteur-gadget': { country: 'France, Canada, États-Unis', actors: ['Don Adams', 'Frank Welker', 'Bernard Carez'] }
};

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
    ['paw-patrol', 'Paw Patrol'], ['dora', 'Dora'], ['wonder-pets', 'Wonder Pets'],
    ['peppa-pig', 'Peppa Pig']
  ],
  'disney-channel': [
    ['hannah-montana', 'Hannah Montana'], ['wizards-of-waverly-place', 'Wizards of Waverly Place'],
    ['phineas-et-ferb', 'Phinéas et Ferb'], ['kim-possible', 'Kim Possible'],
    ['gravity-falls', 'Gravity Falls'], ['star-butterfly', 'Star Butterfly'],
    ['owl-house', 'Owl House'], ['amphibia', 'Amphibia'], ['jessie', 'Jessie'],
    ['kc-clandestine', 'K.C. Clandestine']
  ],
  'disney-xd': [
    ['star-wars-rebels', 'Star Wars Rebels'], ['avengers-assemble', 'Marvel : Avengers Rassemblement'],
    ['spider-man-disney-xd', 'Spider-Man'], ['ducktales-2017', 'DuckTales'],
    ['kick-buttowski', 'Kick Buttowski : Suburban Daredevil'],
    ['lab-rats', 'Lab Rats'], ['mighty-med', 'Mighty Med'],
    ['pair-of-kings', 'Pair of Kings'], ['zack-cody-suite-life-on-deck', 'La Vie de croisière de Zack et Cody'],
    ['phineas-ferb-milo', 'La Loi de Milo Murphy']
  ],
  'disney-junior': [
    ['mickey-mouse-clubhouse', 'Mickey Mouse Clubhouse'], ['doc-mcstuffins', 'Doc McStuffins'],
    ['pj-masks', 'PJ Masks'], ['sofia-the-first', 'Sofia the First'],
    ['bluey', 'Bluey']
  ],
  'cartoon-network': [
    ['gumball', 'Gumball'], ['adventure-time', 'Adventure Time'], ['teen-titans-go', 'Teen Titans Go!'],
    ['dexters-laboratory', "Dexter's Laboratory"], ['powerpuff-girls', 'Powerpuff Girls'],
    ['ben-10', 'Ben 10'], ['steven-universe', 'Steven Universe'], ['regular-show', 'Regular Show'],
    ['craig-of-the-creek', 'Craig of the Creek'], ['we-bare-bears', 'We Bare Bears'],
    ['hilda', 'Hilda'], ['trollhunters', 'Trollhunters']
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
    ['oggy-et-les-cafards', 'Oggy et les Cafards'], ['totally-spies', 'Totally Spies!'], ['code-lyoko', 'Code Lyoko'],
    ['chica-vampiro', 'Chica Vampiro'], ['molang', 'Molang']
  ],
  'm6': [
    ['martin-mystere', 'Martin Mystère'], ['inspecteur-gadget', 'Inspecteur Gadget']
  ],
  'rti-1': [
    ['journal-televise-20h', 'Journal Télévisé 20H', 'news']
  ],
  'rti-2': [
    ['rti2-info', 'RTI 2 Info', 'news'], ['rti2-culture', 'RTI 2 Culture', 'show']
  ],
  'la-3': [
    ['la3-magazine', 'La 3 Magazine', 'show'], ['la3-culture', 'La 3 Culture', 'show']
  ]
};

const UNASSIGNED_CATALOG = [];

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
    result[channelId] = entries.map(([id, title, type]) => enrichProgram(makeProgram(id, title, type, { originalChannel: channelId })));
  }
  for (const [channelId, entries] of Object.entries(FILM_CATALOG)) {
    result[channelId] = [...(result[channelId] || []), ...entries.map(program => enrichProgram({ ...program, originalChannel: channelId }))];
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

const nickelodeonLiveAction = NICK_LIVE_ACTION;

nickelodeonLiveAction.push(makeProgram("NICK-MA-027", "A Fairly Odd Movie: Grow Up, Timmy Turner!", "movie", {
  originalTitle: "A Fairly Odd Movie: Grow Up, Timmy Turner!", year: 2011,
  genre: ["Comédie", "Fantastique", "Jeunesse"],
  description: "Timmy Turner doit faire face aux conséquences de ses vœux alors qu’il approche de l’âge adulte.",
  actors: ["Drake Bell", "Daniella Monet", "Jason Alexander", "Cheryl Hines"], country: "États-Unis",
  network: "Nickelodeon", category: "nickelodeon-live-action", epgId: "epg.nick-ma-027",
  audioTracks: [], subtitles: [], streamEnabled: false, stream: { enabled: false, status: "INACTIVE" }
}));

module.exports = {
  channelPrograms,
  nickelodeonLiveAction,
  unassignedPrograms,
  dcReserve: DC_RESERVE,
  assignProgramToChannel,
  enrichProgram,
  buildSeriesSeasons
};
