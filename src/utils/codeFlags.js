export const flags = [
  { name: "Poland", abv: "pl" },
  { name: "Portugal", abv: "pt" },
  { name: "Spain", abv: "es" },
  { name: "Ecuador", abv: "ec" },
  { name: "England", abv: "gb" },
  { name: "Senegal", abv: "sn" },
  { name: "Netherlands", abv: "nl" },
  { name: "Wales", abv: "wa" },
  { name: "Argentina", abv: "ar" },
  { name: "Tunisia", abv: "tn" },
  { name: "Mexico", abv: "mx" },
  { name: "France", abv: "fr" },
  { name: "Australia", abv: "au" },
  { name: "Morocco", abv: "ma" },
  { name: "Croatia", abv: "hr" },
  { name: "Japan", abv: "jp" },
  { name: "Costa Rica", abv: "cr" },
  { name: "Belgium", abv: "be" },
  { name: "Canada", abv: "ca" },
  { name: "Switzerland", abv: "ch" },
  { name: "Cameroon", abv: "cm" },
  { name: "South Korea", abv: "kr" },
  { name: "Ghana", abv: "gh" },
  { name: "Brazil", abv: "br" },
  { name: "Serbia", abv: "rs" },
  { name: "Iran", abv: "ir" },
  { name: "Germany", abv: "de" },
  { name: "Denmark", abv: "dk" },
  { name: "Uruguay", abv: "uy" },
  { name: "USA", abv: "us" },
  { name: "Qatar", abv: "qa" },
  { name: "Saudi Arabia", abv: "sa" },
];

export const getFlagAway = (awayName) => {
  const flag = flags.find(
    (elemento) => elemento.name === awayName && elemento.abv
  );
  return flag?.abv;
};

export const getFlagHome = (homeName) => {
  const flag = flags.find(
    (elemento) => elemento.name === homeName && elemento.abv
  );
  return flag?.abv;
};
