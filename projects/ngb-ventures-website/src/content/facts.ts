/**
 * Export & making-in-India trivia. Each fact is general, well-documented knowledge with a named source.
 * Keep statements conservative (no precise shares or rankings that change year to year).
 */
export type Fact = { statement: string; answer: boolean; explain: string; source: string };

export const facts: Fact[] = [
  { statement: "India is the world's largest producer of spices.", answer: true, explain: "India produces, consumes and exports more spices than any other country, with dozens of varieties grown across its climates.", source: "Spices Board of India" },
  { statement: "Darjeeling Tea was the first product registered as a Geographical Indication (GI) in India.", answer: true, explain: "Its GI certificate is No. 1, dated 29 October 2004. Only tea grown and processed in the defined Darjeeling area can carry the name.", source: "Geographical Indications Registry, India" },
  { statement: "Most of the world's jute is grown in Brazil.", answer: false, explain: "India is the world's largest jute producer, with West Bengal at the heart of the crop. Bangladesh comes next.", source: "FAO" },
  { statement: "Incoterms® rules are written by each country's customs authority.", answer: false, explain: "They're published by the International Chamber of Commerce (ICC). The current edition is Incoterms® 2020, used worldwide in sales contracts.", source: "International Chamber of Commerce" },
  { statement: "Moradabad in Uttar Pradesh is nicknamed 'Peetal Nagri', the Brass City.", answer: true, explain: "Generations of metalworkers made it one of India's best-known clusters for brass and metal homeware.", source: "Moradabad Metal Craft GI registration" },
  { statement: "Roman-era traders sailed to India's Malabar coast for black pepper.", answer: true, explain: "Ancient accounts such as the Periplus of the Erythraean Sea describe the pepper trade through ports like Muziris in present-day Kerala.", source: "Periplus of the Erythraean Sea" },
  { statement: "2023 was declared the International Year of Millets after a proposal by India.", answer: true, explain: "The UN General Assembly adopted India's proposal, putting ragi, jowar, bajra and other millets in the global spotlight.", source: "FAO / UN General Assembly" },
  { statement: "Kannauj's traditional attars are distilled into alcohol.", answer: false, explain: "The traditional deg-bhapka method captures the fragrance in a base oil, classically sandalwood oil, not alcohol.", source: "Kannauj Perfume GI registration" },
  { statement: "India grows most of the world's turmeric.", answer: true, explain: "India is by far the largest producer of turmeric, and also its largest consumer and exporter.", source: "Spices Board of India" },
  { statement: "Channapatna in Karnataka is known as 'Toy Town' for its lacquered wooden toys.", answer: true, explain: "Its toys are turned on a lathe and finished with lacquer and colours. Channapatna Toys & Dolls is a registered GI.", source: "Geographical Indications Registry, India" },
];
