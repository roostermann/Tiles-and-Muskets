export interface InfantryInfo {
  id: string;
  country: string;
  regimentName: string;
  image: string;
  flagEmoji: string;
  colorTheme: string;
  era: string;
  uniformDetail: string;
  funFact: string;
  extendedFact: string;
  notableBattle: string;
}

export const INFANTRY_DATA: InfantryInfo[] = [
  {
    id: "british",
    country: "Great Britain",
    regimentName: "33rd Regiment of Foot (The Redcoats)",
    image: "/British_Infantry.png",
    flagEmoji: "🇬🇧",
    colorTheme: "border-red-600 bg-red-950/40 text-red-400",
    era: "1803–1815",
    uniformDetail: "Vibrant scarlet red coat, white criss-crossed crossbelts, white trousers, and Belgic shako with a white-over-red tuft plume.",
    funFact: "British line infantry trained rigorously to fire up to 3 to 4 volleys per minute using their .75 caliber 'Brown Bess' musket—faster than any continental army. Their steady two-rank firing line at Waterloo formed the legendary 'Thin Red Line'.",
    extendedFact: "Unlike continental armies which fought in dense three-deep ranks, Wellington deployed his British line infantry two ranks deep and frequently stationed them just behind reverse slopes to shelter them from French artillery until the final volley.",
    notableBattle: "Battle of Waterloo (1815) & Battle of Salamanca (1812)"
  },
  {
    id: "french",
    country: "French Empire",
    regimentName: "84e Régiment d'Infanterie de Ligne",
    image: "/French_Infantry.png",
    flagEmoji: "🇫🇷",
    colorTheme: "border-blue-600 bg-blue-950/40 text-blue-400",
    era: "1804–1815",
    uniformDetail: "Imperial blue 'habit-veste' coat with square white chest lapels, red collar and cuffs, tall shako with red pompon and tricolor cockade.",
    funFact: "Napoleon's French line infantry marched at a swift 120 paces per minute (compared to the standard European 75-90 paces). This rapid marching speed allowed Napoleon to outmaneuver coalition armies across Europe.",
    extendedFact: "Each French line battalion carried a gilded bronze Imperial Eagle ('Aigle') blessed by Napoleon. Regiments defended their Eagles to the last man, as losing an eagle to the enemy was considered the ultimate military disgrace.",
    notableBattle: "Battle of Austerlitz (1805) & Battle of Wagram (1809)"
  },
  {
    id: "russian",
    country: "Russian Empire",
    regimentName: "Preobrazhensky & Semenovsky Musketeers",
    image: "/Russian_Infantry.png",
    flagEmoji: "🇷🇺",
    colorTheme: "border-emerald-600 bg-emerald-950/40 text-emerald-400",
    era: "1805–1814",
    uniformDetail: "Dark forest-green coat with red stand-up collar and cuffs, white summer trousers, and tall black Kiwer shako with imperial brass badge and tri-color pompon.",
    funFact: "Russian line infantry were legendary for their unwavering stoicism under cannon fire and fierce bayonet assaults, guided by General Suvorov's famous maxim: 'The bullet is a fool, the bayonet is a fine lad!'",
    extendedFact: "During Napoleon's 1812 invasion of Russia, the Russian line infantry endured catastrophic artillery bombardment at the Battle of Borodino without breaking, holding the vital Raevsky redoubt and Bagration flèches against waves of French infantry.",
    notableBattle: "Battle of Borodino (1812) & Battle of Leipzig (1813)"
  },
  {
    id: "prussian",
    country: "Kingdom of Prussia",
    regimentName: "Preußische Linieninfanterie (Regiment No. 1)",
    image: "/Prussian_Infantry.png",
    flagEmoji: "🇩🇪",
    colorTheme: "border-indigo-600 bg-indigo-950/40 text-indigo-400",
    era: "1806–1815",
    uniformDetail: "Deep Prussian-blue coat, yellow collar and turnbacks, tall black shako, and the iconic light blue rolled blanket coat strapped across the chest.",
    funFact: "Following Prussia's disastrous defeat in 1806, military reformers Scharnhorst and Gneisenau completely redesigned Prussian infantry tactics, abolishing corporal punishment and creating a citizen-army reserve (Landwehr) that helped defeat Napoleon.",
    extendedFact: "Prussian line infantry wore their grey or light-blue blanket rolls diagonally over their chests. This not only served as their portable bedroll during forced marches but also provided modest ballistic padding against spent musket balls and shrapnel.",
    notableBattle: "Battle of Leipzig (1813) & Battle of Waterloo (1815)"
  },
  {
    id: "habsburg",
    country: "Austrian Empire (Habsburgs)",
    regimentName: "Kaiserliche Infanterie-Regimenter",
    image: "/Habsburg_Infantry.png",
    flagEmoji: "🇦🇹",
    colorTheme: "border-amber-500 bg-amber-950/40 text-amber-300",
    era: "1805–1814",
    uniformDetail: "Iconic pearl-white wool coat with yellow collar and cuffs, white breeches, and the Austrian black-leather Casquet helmet with brass-and-yellow crest.",
    funFact: "The Austrian line regiments spoke over ten different native languages (German, Hungarian, Czech, Polish, Italian, Croatian, and more). Regiments relied on universal drum cadences and standardized German command phrases to maneuver in unison.",
    extendedFact: "At the Battle of Aspern-Essling in 1809, Archduke Charles personally seized the standard of the Zach Infantry Regiment and rallied his Austrian line infantry forward, inflicting Napoleon's first major personal battlefield defeat.",
    notableBattle: "Battle of Aspern-Essling (1809) & Battle of Wagram (1809)"
  },
  {
    id: "spanish",
    country: "Kingdom of Spain",
    regimentName: "Regimiento de Infantería de Línea 'La Princesa'",
    image: "/Spanish_Infantry.png",
    flagEmoji: "🇪🇸",
    colorTheme: "border-yellow-600 bg-yellow-950/40 text-yellow-400",
    era: "1808–1814",
    uniformDetail: "Classic royal blue coat with red facings and collar, white waistcoat, and black bicorne hat cocked sideways with a prominent red cockade.",
    funFact: "In 1808 at the Battle of Bailén, Spanish regular line infantry under General Castaños defeated French General Dupont's imperial corps—forcing 17,000 French troops to surrender in Napoleon's first catastrophic capitulation in Europe!",
    extendedFact: "The ferocious Spanish resistance sparked the Peninsular War and coined the term 'guerrilla' (little war). Spanish regular line regiments fought alongside British and Portuguese allies and held out during legendary sieges at Zaragoza and Gerona.",
    notableBattle: "Battle of Bailén (1808) & Siege of Zaragoza (1808–1809)"
  },
  {
    id: "portuguese",
    country: "Kingdom of Portugal",
    regimentName: "Infantaria de Linha (Regimento No. 19)",
    image: "/Portuguese_Infantry.png",
    flagEmoji: "🇵🇹",
    colorTheme: "border-teal-600 bg-teal-950/40 text-teal-400",
    era: "1809–1814",
    uniformDetail: "Dark bottle-green/blue coat laced with distinct horizontal white chest bars, pure white trousers, and tall black Barretina shako with white top rim.",
    funFact: "Retrained by British Marshal William Carr Beresford into Wellington's Anglo-Portuguese Army, Portuguese line infantry became so fierce and dependable in battle that the Duke of Wellington affectionately called them the 'Fighting Cocks of my Army'.",
    extendedFact: "Portuguese line infantry fought side-by-side integrated directly into Wellington's divisions in the Peninsular campaigns, marching over 2,000 miles from the Lines of Torres Vedras all the way across the Pyrenees into southern France.",
    notableBattle: "Battle of Bussaco (1810) & Battle of Vitoria (1813)"
  },
  {
    id: "swedish",
    country: "Kingdom of Sweden",
    regimentName: "Svea Livgarde & Swedish Line Regiments",
    image: "/Swedish_Infantry.png",
    flagEmoji: "🇸🇪",
    colorTheme: "border-sky-500 bg-sky-950/40 text-sky-400",
    era: "1808–1814",
    uniformDetail: "Dark blue coat with bright yellow collar, cuffs, and waist sash, grey/slate trousers, and tall black shako with brass chevron plate and yellow feather plume.",
    funFact: "Sweden's infantry was organized under the 'Indelningsverket' (Allotment System). Soldiers were citizen-farmers living on dedicated cottages ('soldattorp') in peacetime, ready to mobilize in full uniform within 24 hours when war broke out.",
    extendedFact: "In 1813, former French Marshal Jean Bernadotte—now Crown Prince Carl Johan of Sweden—commanded the Coalition's Army of the North. His Swedish infantry fought decisively against Napoleon's forces at Grossbeeren and the gigantic 'Battle of the Nations' at Leipzig.",
    notableBattle: "Battle of Leipzig (1813) & Battle of Grossbeeren (1813)"
  }
];
