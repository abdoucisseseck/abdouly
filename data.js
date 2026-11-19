/* =====================================================
   data.js — TOUT ce que tu peux modifier est ici.
   (questions, réactions, lettre, numéro WhatsApp)
   ===================================================== */

// 1) WHATSAPP -------------------------------------------------
// Numéro au format international, SANS "+" ni espaces. Ex : "221771234567"
// Numéro d'Abdou (Sénégal, +221) : le lien ouvre directement sa conversation.
const WHATSAPP_NUMBER = "221767250943";

// Message prérempli (elle peut le modifier avant d'envoyer)
const WHATSAPP_MESSAGE = "Abdouly 😂❤️ J'ai terminé ton jeu et je suis arrivée jusqu'au message secret…";

// 2) QUESTIONS ------------------------------------------------
// correct = position de la bonne réponse dans "options" (0 = première).
// good / bad = messages après bonne / mauvaise réponse (facultatif : sinon message aléatoire).
// fusion: true = déclenche l'animation ABdOUly ❤️
// Les questions 6 à 10 sont des EMPLACEMENTS : remplace-les par les tiennes.
const QUIZ = [
  {
    q: "Quel est mon prénom ?",
    options: ["Amadou", "Abdou", "Ali", "Assane"],
    correct: 1,
    good: "Je savais que tu allais trouver.",
    bad: "Hmm, tu hésites ? 😂 Réessaie dans ta tête…"
  },
  {
    q: "Quel est ton vrai prénom ?",
    options: ["Awa", "Oumy", "Ouly", "Fatou"],
    correct: 2,
    good: "Évidemment. Facile, celle-là.",
    bad: "Tu ne connais pas ton propre prénom ? 👀"
  },
  {
    q: "Quels sont tes surnoms ?",
    options: ["Poulo", "Peul bou nice", "Ouly", "Tous ces noms"],
    correct: 3,
    good: "Pas mal, Poulo.",
    bad: "Pas faux… mais il y avait plus complet. 😏"
  },
  {
    q: "Quel jour du mois es-tu née ?",
    options: ["24", "25", "26", "27"],
    correct: 1,
    good: "25 pour toi… 26 pour moi. Un seul jour nous sépare. 👀",
    bad: "Raté… mais ce n'était pas loin. Attention, le prochain niveau est un peu plus difficile."
  },
  {
    q: "Que donne la fusion de Abdou et Ouly ?",
    options: ["Oulybou", "ABdOUly", "Abdou Ouly", "Abouly"],
    correct: 1,
    fusion: true,
    good: "Tu te rapproches du secret…",
    bad: "Hmm… ce n'est pas ça. Mais regarde bien ce qui vient d'apparaître. ✨"
  },

  // ---- QUESTIONS 6 À 10 : Ouly ❤️ ----
  {
    q: "Qu'est-ce qui te fait le plus craquer chez un homme ?",
    options: [
      "Son intelligence et sa façon de penser",
      "Son attention et ses petites preuves d'amour",
      "Sa confiance en lui et son charisme",
      "Sa capacité à me faire rire"
    ],
    correct: 1,
    good: "Les petites attentions… noté. 👀",
    bad: "Intéressant… mais je pense que tu caches autre chose. 😏"
  },
  {
    q: "Dans une relation, qu'est-ce qui est le plus important pour toi ?",
    options: [
      "Passer tout mon temps avec mon homme",
      "Garder ma liberté tout en étant profondément aimée",
      "Recevoir des cadeaux régulièrement",
      "Ne jamais avoir de désaccord"
    ],
    correct: 1,
    good: "Liberté et amour : l'équilibre parfait.",
    bad: "Hmm, je ne suis pas sûr que ce soit vraiment toi, Poulo. 😂"
  },
  {
    q: "Comment aimerais-tu qu'un homme te montre son amour ?",
    options: [
      "En m'écrivant et en prenant de mes nouvelles même sans raison",
      "En me laissant totalement tranquille",
      "En me faisant de grandes déclarations devant tout le monde",
      "En étant jaloux pour me prouver qu'il tient à moi"
    ],
    correct: 0,
    good: "Un petit message sans raison… je retiens. 🤭",
    bad: "Vraiment ? J'avais une autre idée de ta réponse… 👀"
  },
  {
    q: "Si tu as besoin de liberté et que ton homme te manque en même temps, tu préfères quoi ?",
    options: [
      "Qu'il comprenne mon besoin d'espace sans douter de mon amour",
      "Qu'il m'interdise de sortir",
      "Qu'il boude jusqu'à ce que je revienne",
      "Qu'il fasse semblant de ne pas tenir à moi"
    ],
    correct: 0,
    good: "Comprendre sans douter. Tu te rapproches du secret…",
    bad: "Pas sûr que tu penses vraiment ça. 😂"
  },
  {
    q: "Quel genre d'homme pourrait vraiment faire battre ton cœur ?",
    options: [
      "Un homme froid, mystérieux et distant",
      "Un homme attentionné, rassurant, drôle et qui respecte ma liberté",
      "Un homme qui veut tout contrôler dans ma vie",
      "Un homme qui ne parle jamais de ses sentiments"
    ],
    correct: 1,
    good: "Dernière question validée… ✨",
    bad: "Hmm, je ne te crois pas tout à fait. 😏"
  }
];

// 3) MESSAGES PAR DÉFAUT (utilisés si une question n'a pas de good/bad)
const GOOD_MESSAGES = [
  "Je savais que tu allais trouver.",
  "Pas mal, Poulo.",
  "Tu connais certains détails mieux que je ne le pensais. 👀",
  "Tu te rapproches du secret…"
];
const BAD_MESSAGES = [
  "Hmm, tu hésites ? 😂",
  "Mauvaise réponse… mais le jeu continue. 😏",
  "Attention, le prochain niveau est un peu plus difficile.",
  "Intéressant choix… 👀"
];

// 4) RÉACTIONS FINALES
const FINAL_REACTIONS = [
  { label: "😂 Tu es vraiment bizarre.", msg: "Bizarre, mais avec style. Je prends. 😎" },
  { label: "❤️ C'était adorable.", msg: "Alors mission accomplie. Merci, Poulo. ✨" },
  { label: "👀 Abdou, on doit parler.", msg: "Ça tombe bien : j'ai beaucoup de temps. 🤭" }
];

// 5) LA LETTRE (un élément = un paragraphe)
const LETTER = [
  "Poulo,",
  "Je voulais te faire quelque chose de différent, quelque chose que tu ne découvrirais pas simplement en ouvrant une conversation WhatsApp.",
  "Il y a des petits détails qui me font sourire : ton prénom, tes surnoms, ton 25, mon 26… et cette petite fusion de nos deux prénoms qui a donné naissance à ABdOUly.",
  "Ce sont peut-être de simples coïncidences, mais j'aime bien ces petits détails.",
  "Je ne sais pas toujours comment exprimer certaines choses, alors j'ai préféré créer cette petite expérience pour toi.",
  "Je voulais simplement te faire sourire, te surprendre, et te dire que tu occupes une place particulière dans mes pensées.",
  "Sans pression, sans obligation de réponse particulière. Juste un message sincère.",
  "— Abdou ❤️"
];
