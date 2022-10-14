export const flags = [
  { country: "Poland", abv: "pl" },
  { country: "Portugal", abv: "pt" },
  { country: "Spain", abv: "es" },
  { country: "Ecuador", abv: "ec" },
  { country: "England", abv: "gb" },
  { country: "Senegal", abv: "sn" },
  { country: "Netherlands", abv: "nl" },
  { country: "Wales", abv: "wa" },
  { country: "Argentina", abv: "ar" },
  { country: "Tunisia", abv: "tn" },
  { country: "Mexico", abv: "mx" },
  { country: "France", abv: "fr" },
  { country: "Australia", abv: "au" },
  { country: "Morocco", abv: "ma" },
  { country: "Croatia", abv: "hr" },
  { country: "Japan", abv: "jp" },
  { country: "Costa Rica", abv: "cr" },
  { country: "Belgium", abv: "be" },
  { country: "Canada", abv: "ca" },
  { country: "Switzerland", abv: "ch" },
  { country: "Cameroon", abv: "cm" },
  { country: "South Korea", abv: "kr" },
  { country: "Ghana", abv: "gh" },
  { country: "Brazil", abv: "br" },
  { country: "Serbia", abv: "rs" },
  { country: "Iran", abv: "ir" },
  { country: "Germany", abv: "de" },
  { country: "Denmark", abv: "dk" },
  { country: "Uruguay", abv: "uy" },
  { country: "USA", abv: "us" },
  { country: "Qatar", abv: "qa" },
  { country: "Saudi Arabia", abv: "sa" },
];

export const getFlag = (country) => {
  const flag = flags.find(
    (elemento) => elemento.country === country && elemento.abv
  );
  return flag?.abv;
};
