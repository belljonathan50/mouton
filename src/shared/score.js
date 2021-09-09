// score definition
const score = {
  title: 'Nescient Mater Virgo Virum - Jean Mouton (1459-1522)',
  duration: 5 * 60, 
  parts: {
    // links

    'Superius 2': {
      type: 'performer',
      file: 'https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/S1.mp4',
    },
        'Superius': {
      type: 'performer',
      file: 'https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/A1.mp4',
    },
    'Contra 2': {
      type: 'performer',
      file: 'videos/https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/S2.mp4',
    },

    'Contra': {
      type: 'performer',
      file: 'videos/https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/A2.mp4',
    },
    'Tenor 2': {
      type: 'performer',
      file: 'https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/T1.mp4',
    },
    'Tenor': {
      type: 'performer',
      file: 'https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/T2.mp4',
    },
    'Bassus 2': {
      type: 'performer',
      file: 'https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/B1.mp4',
    },
    'Bassus': {
      type: 'performer',
      file: 'https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/B2.mp4',
    },

    'fullscore': {
      type: 'env',
      file: 'https://filedn.eu/lltUiQG4GqOY4BJ1MkC9ndR/test2.mp4',
    },
    // env
  },
  sections: {

    alpha: {
      time: 0,
      label: "Page 1",
    },
    qalpha: {
      time: 24,
      label: "Page 2",
    },
    beta: {
      time: 52,
      label: "Page 3",
    },
   bwdeta: {
      time: 76,
      label: "Page 4",
    },
    gamma: {
      time: 104,
      label: "Page 5",
    },
    delta: {
      time: 132,
      label: "Page 6",
    },
      epsi: {
      time: 161,
      label: "Page 7",
    },
      kepsi: {
      time: 192,
      label: "Page 8",
    },
    epsilon: {
      time: 222,
      label: "Page 9",
    },
    dzeta: {
      time: 251,
      label: "Page 10",
    },
    eta: {
      time: 273,
      label: "Page 11",
    },
  },
};

export default score;
