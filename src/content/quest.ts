import type { Quest, Language, AnimalId } from '../types';
export const quest: Quest = {
  title: 'First Mother',
  intro: [
    'You are a child of the First Mother, standing beside all of her other children. The First Mother commands, “Kids, come here. I am going to send each of you to a different place.”',
    'You see that she has black paint and white clay to paint each of you with.',
  ],
  choice:
    'Many of the children cry out, “Mom, where are you sending us?” She responds, “I am the one who knows where to send you.” The First Mother begins transforming her children into animals and sending them off.',
  ending: [
    'The First Mother now says, “What shall I become? Now I have sent off all my children. Now who will I live with? I will live inside a hole in the Earth. I will just go to look for a mountain, and as I look for a way into the mountain I will find a hole. And when I find it I will stay in there becoming a Tayag, someone who now lives inside the Earth.”',
    'Thus, when she had sent all her children away and she was left alone, she went to sit inside a hole in the earth.',
  ],
  animals: {
    toucan: {
      label: 'Toucan',
      kichwa: 'sikwanga',
      color: 'coral',
      scene:
        'The First Mother paints you with white and red clay. She says, “Now you will become the sikwanga (meaning ‘toucan’). Go sing in that tree! Otherwise you may go across the sea.” She throws you up into the air and you spring to life in your new form. She says, “Now you will all live in the forest. Now you will have to live looking for your own food. From now on, your food will be different. You will no longer eat with me.”',
      question: 'What is the Kichwa word for “toucan”?',
      choices: ['charapa', 'sikwanga', 'apangura'],
      answer: 1,
      phrase: 'Sikwanga muyuta mikun.',
      translation: 'The toucan eats fruit.',
      finding: 'A “muyu” is a seed or fruit. Find and take a picture of muyu.',
    },
    monkey: {
      label: 'Monkey',
      kichwa: 'sikana',
      color: 'purple',
      scene:
        'The First Mother paints you black and says, “Now go! I am going to be left alone.” You begin to sikana (meaning ‘to climb’) up a tree and jump. She says, “Now you will all live in the forest. Now you will have to live looking for your own food. From now on, your food will be different. You will no longer eat with me.”',
      question: 'What is the Kichwa word for “to climb”?',
      choices: ['sikana', 'waytana', 'puñuna'],
      answer: 0,
      phrase: 'Sikani.',
      translation: 'I climb.',
      finding: 'A “waska” is a vine or rope. Find and take a picture of waska.',
    },
    squirrel: {
      label: 'Squirrel',
      kichwa: 'lomocha',
      color: 'coral',
      scene:
        'The First Mother says, “You come here.” She paints you and sends you off. “You will look for muyu (meaning ‘seed/fruit’) or nuts to eat. What hard nuts you will live eating!” You go away crying to your mother. She says, “Now you will all live in the forest. Now you will have to live looking for your own food. From now on, your food will be different. You will no longer eat with me.”',
      question: 'What is the Kichwa word for “seed/fruit”?',
      choices: ['muyu', 'yaku', 'panga'],
      answer: 0,
      phrase: 'Lomocha muyuta mikun.',
      translation: 'The squirrel eats seed/fruit.',
      finding: '“Allpa” means dirt or earth. Find and take a picture of allpa.',
    },
    snail: {
      label: 'Snail',
      kichwa: 'alimanda',
      color: 'green',
      scene:
        'The First Mother says, “Come here.” She puts you inside metal shells. “Now you will all go live in the water,” she says. She releases you into the water, where you move alimanda (meaning ‘slowly’). She says, “Now you will all live in the forest. Now you will have to live looking for your own food. From now on, your food will be different. You will no longer eat with me.”',
      question: 'What is the Kichwa word for “slowly”?',
      choices: ['ukta', 'alimanda', 'chunlla'],
      answer: 1,
      phrase: 'Alimanda purini.',
      translation: 'I walk slowly.',
      finding: 'A “panga” is a leaf. Find and take a picture of panga.',
    },
    crab: {
      label: 'River crab',
      kichwa: 'apangura',
      color: 'coral',
      scene:
        'You come to the First Mother and say, “Mom. Where will my house keep things? You called me here. What will I eat?” She says, “You will live looking for food in the water.” You are released into the water and become an apangura (meaning ‘Amazonian river crab’). She says, “Now you will all live in the forest. Now you will have to live looking for your own food. From now on, your food will be different. You will no longer eat with me.”',
      question: 'What is the Kichwa word for “Amazonian river crab”?',
      choices: ['sikwanga', 'apangura', 'charapa'],
      answer: 1,
      phrase: 'Apangura yakui kawsan.',
      translation: 'The river crab lives in water.',
      finding: '“Yaku” means water. Find and take a picture of yaku.',
    },
    woodpecker: {
      label: 'Woodpecker',
      kichwa: 'ruya',
      color: 'purple',
      scene:
        'The First Mother says to you, “Hurry! Come! You are a strong guy.” She paints you beautifully and says, “Now go! You are stronger than anyone else.” She throws you up into the air toward a ruya (meaning ‘tree’), and you go off. She says, “Now you will all live in the forest. Now you will have to live looking for your own food. From now on, your food will be different. You will no longer eat with me.”',
      question: 'What is the Kichwa word for “tree”?',
      choices: ['yaku', 'panga', 'ruya'],
      answer: 2,
      phrase: 'Ruyata takan.',
      translation: 'It taps/pecks the tree.',
      finding: '“Kara” means bark. Find a tree and take a picture of kara.',
    },
    turtle: {
      label: 'Turtle',
      kichwa: 'charapa',
      color: 'green',
      scene:
        'The First Mother takes her time painting you, and then sends you off. You go downriver and become a charapa (meaning ‘turtle’). She says, “Now you will all live in the forest. Now you will have to live looking for your own food. From now on, your food will be different. You will no longer eat with me.”',
      question: 'What is the Kichwa word for “turtle”?',
      choices: ['charapa', 'kushillu', 'apangura'],
      answer: 0,
      phrase: 'Charapa yakui kawsan.',
      translation: 'The turtle lives in water.',
      finding: 'A “yaku” is water. Find and take a picture of yaku.',
    },
  },
};
const spanish = {
  intro: [
    'Eres hija o hijo de la Primera Madre y estás junto a todos sus otros hijos. La Primera Madre ordena: “Niños, vengan aquí. Voy a enviar a cada uno a un lugar diferente.”',
    'Ves que tiene pintura negra y arcilla blanca para pintar a cada uno de ustedes.',
  ],
  choice:
    'Muchos de los niños preguntan llorando: “Mamá, ¿adónde nos envías?”. Ella responde: “Yo sé adónde enviarles”. La Primera Madre empieza a transformar a sus hijos en animales y a enviarlos lejos.',
  ending: [
    'La Primera Madre dice: “¿En qué me convertiré? Ya envié lejos a todos mis hijos. ¿Con quién viviré ahora? Viviré dentro de un agujero en la Tierra. Buscaré una montaña y, al buscar una entrada, encontraré un agujero. Cuando lo encuentre, me quedaré allí y me convertiré en una Tayag, alguien que vive dentro de la Tierra.”',
    'Así, cuando había enviado lejos a todos sus hijos y se quedó sola, fue a sentarse dentro de un agujero en la tierra.',
  ],
  animals: {
    toucan: {
      label: 'Tucán',
      scene:
        'La Primera Madre te pinta con arcilla blanca y roja. Dice: “Ahora te convertirás en sikwanga, que significa ‘tucán’. ¡Ve a cantar en ese árbol! Si no, puedes cruzar el mar”. Te arroja al aire y cobras vida en tu nueva forma. Dice: “Ahora todos vivirán en el bosque. Tendrán que buscar su propia comida. Su alimento será diferente. Ya no comerán conmigo”.',
      question: '¿Cuál es la palabra kichwa para ‘tucán’?',
      translation: 'El tucán come fruta.',
      finding: 'Un “muyu” es una semilla o fruta. Encuentra y toma una foto de un muyu.',
    },
    monkey: {
      label: 'Mono',
      scene:
        'La Primera Madre te pinta de negro y dice: “¡Ahora ve! Voy a quedarme sola”. Empiezas a sikana, que significa ‘trepar’, por un árbol y saltas. Ella dice: “Ahora todos vivirán en el bosque. Tendrán que buscar su propia comida. Su alimento será diferente. Ya no comerán conmigo”.',
      question: '¿Cuál es la palabra kichwa para ‘trepar’?',
      translation: 'Yo trepo.',
      finding: 'Un “waska” es una liana o cuerda. Encuentra y toma una foto de un waska.',
    },
    squirrel: {
      label: 'Ardilla',
      scene:
        'La Primera Madre dice: “Ven aquí”. Te pinta y te envía lejos. “Buscarás muyu, que significa ‘semilla o fruta’, o nueces para comer. ¡Vivirás comiendo nueces duras!”. Te alejas llorando de tu madre. Ella dice: “Ahora todos vivirán en el bosque. Tendrán que buscar su propia comida. Su alimento será diferente. Ya no comerán conmigo”.',
      question: '¿Cuál es la palabra kichwa para ‘semilla o fruta’?',
      translation: 'La ardilla come semillas o fruta.',
      finding: '“Allpa” significa tierra o suelo. Encuentra y toma una foto de allpa.',
    },
    snail: {
      label: 'Caracol',
      scene:
        'La Primera Madre dice: “Ven aquí”. Te pone dentro de conchas de metal. “Ahora todos vivirán en el agua”, dice. Te libera en el agua, donde avanzas alimanda, que significa ‘lentamente’. Ella dice: “Ahora todos vivirán en el bosque. Tendrán que buscar su propia comida. Su alimento será diferente. Ya no comerán conmigo”.',
      question: '¿Cuál es la palabra kichwa para ‘lentamente’?',
      translation: 'Camino lentamente.',
      finding: 'Un “panga” es una hoja. Encuentra y toma una foto de un panga.',
    },
    crab: {
      label: 'Cangrejo de río',
      scene:
        'Te acercas a la Primera Madre y preguntas: “Mamá, ¿dónde guardará cosas mi casa? Me llamaste aquí. ¿Qué comeré?”. Ella dice: “Vivirás buscando comida en el agua”. Te libera en el agua y te conviertes en un apangura, un cangrejo de río amazónico. Dice: “Ahora todos vivirán en el bosque. Tendrán que buscar su propia comida. Su alimento será diferente. Ya no comerán conmigo”.',
      question: '¿Cuál es la palabra kichwa para ‘cangrejo de río amazónico’?',
      translation: 'El cangrejo de río vive en el agua.',
      finding: '“Yaku” significa agua. Encuentra y toma una foto de yaku.',
    },
    woodpecker: {
      label: 'Pájaro carpintero',
      scene:
        'La Primera Madre te dice: “¡Rápido! ¡Ven! Eres fuerte”. Te pinta bellamente y dice: “¡Ahora ve! Eres más fuerte que todos”. Te arroja al aire hacia una ruya, que significa ‘árbol’, y te vas. Ella dice: “Ahora todos vivirán en el bosque. Tendrán que buscar su propia comida. Su alimento será diferente. Ya no comerán conmigo”.',
      question: '¿Cuál es la palabra kichwa para ‘árbol’?',
      translation: 'Golpea el árbol con el pico.',
      finding: '“Kara” significa corteza. Encuentra un árbol y toma una foto de kara.',
    },
    turtle: {
      label: 'Tortuga',
      scene:
        'La Primera Madre se toma su tiempo para pintarte y luego te envía lejos. Bajas por el río y te conviertes en una charapa, que significa ‘tortuga’. Ella dice: “Ahora todos vivirán en el bosque. Tendrán que buscar su propia comida. Su alimento será diferente. Ya no comerán conmigo”.',
      question: '¿Cuál es la palabra kichwa para ‘tortuga’?',
      translation: 'La tortuga vive en el agua.',
      finding: 'Un “yaku” es agua. Encuentra y toma una foto de yaku.',
    },
  },
};
export function activeQuest(language: Language): Quest {
  if (language === 'en') return quest;
  return {
    ...quest,
    ...spanish,
    animals: Object.fromEntries(
      Object.entries(quest.animals).map(([id, animal]) => [
        id,
        { ...animal, ...spanish.animals[id as AnimalId] },
      ]),
    ) as Quest['animals'],
  };
}
