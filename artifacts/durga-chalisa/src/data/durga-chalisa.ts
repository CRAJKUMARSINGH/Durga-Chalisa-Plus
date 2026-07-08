// Shri Durga Chalisa — canonical Hindi text.
// Source: traditional text as published at
// https://www.aajtak.in/religion/chalisa/durga-chalisa-2443793
// Do NOT alter, paraphrase, or "correct" this text — it is sacred verse and
// must be reproduced verbatim.

export type VerseLine = {
  /** 1-based line number across the whole chalisa, used for search + scroll targeting */
  id: number;
  /** "doha" (opening/closing couplet) or "chaupai" (main quatrain body) */
  type: "doha" | "chaupai";
  text: string;
};

export const openingDoha: VerseLine[] = [
  {
    id: 0,
    type: "doha",
    text: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।",
  },
  {
    id: 1,
    type: "doha",
    text: "नमस्तस्यै नमस्तस्यै, नमस्तस्यै नमो नमः॥",
  },
];

export const chaupai: VerseLine[] = [
  { id: 2, type: "chaupai", text: "नमो नमो दुर्गे सुख करनी।" },
  { id: 3, type: "chaupai", text: "नमो नमो अंबे दुःख हरनी॥" },
  { id: 4, type: "chaupai", text: "निरंकार है ज्योति तुम्हारी।" },
  { id: 5, type: "chaupai", text: "तिहूं लोक फैली उजियारी॥" },
  { id: 6, type: "chaupai", text: "शशि ललाट मुख महाविशाला।" },
  { id: 7, type: "chaupai", text: "नेत्र लाल भृकुटि विकराला॥" },
  { id: 8, type: "chaupai", text: "रूप मातु को अधिक सुहावे।" },
  { id: 9, type: "chaupai", text: "दरश करत जन अति सुख पावे॥" },
  { id: 10, type: "chaupai", text: "तुम संसार शक्ति लै कीना।" },
  { id: 11, type: "chaupai", text: "पालन हेतु अन्न धन दीना॥" },
  { id: 12, type: "chaupai", text: "अन्नपूर्णा हुई जग पाला।" },
  { id: 13, type: "chaupai", text: "तुम ही आदि सुन्दरी बाला॥" },
  { id: 14, type: "chaupai", text: "प्रलयकाल सब नाशन हारी।" },
  { id: 15, type: "chaupai", text: "तुम गौरी शिवशंकर प्यारी॥" },
  { id: 16, type: "chaupai", text: "शिव योगी तुम्हरे गुण गावें।" },
  { id: 17, type: "chaupai", text: "ब्रह्मा विष्णु तुम्हें नित ध्यावें॥" },
  { id: 18, type: "chaupai", text: "रूप सरस्वती को तुम धारा।" },
  { id: 19, type: "chaupai", text: "दे सुबुद्धि ऋषि मुनिन उबारा॥" },
  { id: 20, type: "chaupai", text: "धरयो रूप नरसिंह को अम्बा।" },
  { id: 21, type: "chaupai", text: "परगट भई फाड़कर खम्बा॥" },
  { id: 22, type: "chaupai", text: "रक्षा करि प्रह्लाद बचायो।" },
  { id: 23, type: "chaupai", text: "हिरण्याक्ष को स्वर्ग पठायो॥" },
  { id: 24, type: "chaupai", text: "लक्ष्मी रूप धरो जग माहीं।" },
  { id: 25, type: "chaupai", text: "श्री नारायण अंग समाहीं॥" },
  { id: 26, type: "chaupai", text: "क्षीरसिन्धु में करत विलासा।" },
  { id: 27, type: "chaupai", text: "दयासिन्धु दीजै मन आसा॥" },
  { id: 28, type: "chaupai", text: "हिंगलाज में तुम्हीं भवानी।" },
  { id: 29, type: "chaupai", text: "महिमा अमित न जात बखानी॥" },
  { id: 30, type: "chaupai", text: "मातंगी धूमावति माता।" },
  { id: 31, type: "chaupai", text: "भुवनेश्वरी बगला सुख दाता॥" },
  { id: 32, type: "chaupai", text: "श्री भैरवी तारा जग तारिणी।" },
  { id: 33, type: "chaupai", text: "छिन्न भाल भव दुःख निवारिणी॥" },
  { id: 34, type: "chaupai", text: "केहरि वाहन सोहे भवानी।" },
  { id: 35, type: "chaupai", text: "लांगुर वीर चलत अगवानी॥" },
  { id: 36, type: "chaupai", text: "कर में खप्पर खड्ग विराजै।" },
  { id: 37, type: "chaupai", text: "जाको देख काल डर भाजै॥" },
  { id: 38, type: "chaupai", text: "सोहै अस्त्र और त्रिशूला।" },
  { id: 39, type: "chaupai", text: "जाते उठत शत्रु हिय शूला॥" },
  { id: 40, type: "chaupai", text: "नगरकोट में तुम्हीं विराजत।" },
  { id: 41, type: "chaupai", text: "तिहुंलोक में डंका बाजत॥" },
  { id: 42, type: "chaupai", text: "शुंभ निशुंभ दानव तुम मारे।" },
  { id: 43, type: "chaupai", text: "रक्तबीज शंखन संहारे॥" },
  { id: 44, type: "chaupai", text: "महिषासुर नृप अति अभिमानी।" },
  { id: 45, type: "chaupai", text: "जेहि अघ भार मही अकुलानी॥" },
  { id: 46, type: "chaupai", text: "रूप कराल कालिका धारा।" },
  { id: 47, type: "chaupai", text: "सेन सहित तुम तिहि संहारा॥" },
  { id: 48, type: "chaupai", text: "परी गाढ़ संतन पर जब जब।" },
  { id: 49, type: "chaupai", text: "भई सहाय मातु तुम तब तब॥" },
  { id: 50, type: "chaupai", text: "अमरपुरी अरु बासव लोका।" },
  { id: 51, type: "chaupai", text: "तव महिमा सब रहें अशोका॥" },
  { id: 52, type: "chaupai", text: "ज्वाला में है ज्योति तुम्हारी।" },
  { id: 53, type: "chaupai", text: "तुम्हें सदा पूजें नर-नारी॥" },
  { id: 54, type: "chaupai", text: "प्रेम भक्ति से जो यश गावें।" },
  { id: 55, type: "chaupai", text: "दुःख दारिद्र निकट नहिं आवें॥" },
  { id: 56, type: "chaupai", text: "ध्यावे तुम्हें जो नर मन लाई।" },
  { id: 57, type: "chaupai", text: "जन्म-मरण ताकौ छुटि जाई॥" },
  { id: 58, type: "chaupai", text: "जोगी सुर मुनि कहत पुकारी।" },
  { id: 59, type: "chaupai", text: "योग न हो बिन शक्ति तुम्हारी॥" },
  { id: 60, type: "chaupai", text: "शंकर आचारज तप कीनो।" },
  { id: 61, type: "chaupai", text: "काम क्रोध जीति सब लीनो॥" },
  { id: 62, type: "chaupai", text: "निशिदिन ध्यान धरो शंकर को।" },
  { id: 63, type: "chaupai", text: "काहु काल नहिं सुमिरो तुमको॥" },
  { id: 64, type: "chaupai", text: "शक्ति रूप का मरम न पायो।" },
  { id: 65, type: "chaupai", text: "शक्ति गई तब मन पछितायो॥" },
  { id: 66, type: "chaupai", text: "शरणागत हुई कीर्ति बखानी।" },
  { id: 67, type: "chaupai", text: "जय जय जय जगदम्ब भवानी॥" },
  { id: 68, type: "chaupai", text: "भई प्रसन्न आदि जगदम्बा।" },
  { id: 69, type: "chaupai", text: "दई शक्ति नहिं कीन विलम्बा॥" },
  { id: 70, type: "chaupai", text: "मोको मातु कष्ट अति घेरो।" },
  { id: 71, type: "chaupai", text: "तुम बिन कौन हरै दुःख मेरो॥" },
  { id: 72, type: "chaupai", text: "आशा तृष्णा निपट सतावें।" },
  { id: 73, type: "chaupai", text: "मोह मदादिक सब बिनसावें॥" },
  { id: 74, type: "chaupai", text: "शत्रु नाश कीजै महारानी।" },
  { id: 75, type: "chaupai", text: "सुमिरौं एक चित तुम्हें भवानी॥" },
  { id: 76, type: "chaupai", text: "करो कृपा हे मातु दयाला।" },
  { id: 77, type: "chaupai", text: "ऋद्धि-सिद्धि दै करहु निहाला॥" },
  { id: 78, type: "chaupai", text: "जब लगि जिऊं दया फल पाऊं।" },
  { id: 79, type: "chaupai", text: "तुम्हरो यश मैं सदा सुनाऊं॥" },
  { id: 80, type: "chaupai", text: "दुर्गा चालीसा जो कोई गावै।" },
  { id: 81, type: "chaupai", text: "सब सुख भोग परमपद पावै॥" },
  { id: 82, type: "chaupai", text: "देवीदास शरण निज जानी।" },
  { id: 83, type: "chaupai", text: "करहु कृपा जगदम्ब भवानी॥" },
];

export const closingDoha: VerseLine[] = [
  {
    id: 84,
    type: "doha",
    text: "शरणागत रक्षा कर, भक्त रहे निःशंक।",
  },
  {
    id: 85,
    type: "doha",
    text: "मैं आया तेरी शरण में, मातु लीजिए अंक॥",
  },
];

/** Full ordered sequence for the teleprompter view. */
export const durgaChalisa: VerseLine[] = [
  ...openingDoha,
  ...chaupai,
  ...closingDoha,
];
