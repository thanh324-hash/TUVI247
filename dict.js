/**
 * CÆ¡ sá»Ÿ dá»¯ liá»‡u luáº­n giáº£i Tá»­ Vi Äáº©u Sá»‘ Viá»‡t HÃ³a chi tiáº¿t
 */

var DICT_SAO = {
  "Tá»­ Vi": {
    nguHanh: "Thá»• (Ã‚m Thá»•)",
    loai: "Äáº¿ Tinh - Nam Báº¯c Äáº©u Tinh",
    tongQuan: "Tá»­ Vi lÃ  ngÃ´i sao ChÃ­ TÃ´n, chá»§ vá» cung Quan Lá»™c vÃ  PhÃºc Thá». TÆ°á»£ng trÆ°ng cho báº­c quÃ¢n vÆ°Æ¡ng, ngÆ°á»i cÃ³ khÃ­ cháº¥t cao quÃ½, trá»ng danh dá»±, cÃ³ nÄƒng lá»±c lÃ£nh Ä‘áº¡o, tÃ­nh tÃ¬nh tráº§m tÄ©nh, cÆ°Æ¡ng trá»±c nhÆ°ng Ä‘Ã´i khi tá»± Ã¡i cao.",
    dacTinh: "KhÃ­ cháº¥t tÃ´n quÃ½, cÃ³ nÄƒng lá»±c quáº£n lÃ½ vÃ  bao quÃ¡t cÃ´ng viá»‡c, giÃ u lÃ²ng tá»± trá»ng. Cáº§n cÃ³ Táº£ PhÃ¹ - Há»¯u Báº­t trá»£ lá»±c (quÃ¢n tháº§n khÃ¡nh há»™i) má»›i phÃ¡t huy tá»‘i Ä‘a quyá»n uy.",
    yNghiaCung: {
      "Má»‡nh": "TÆ°á»›ng máº¡o uy nghi, Ä‘Ã´n háº­u, cÃ³ tÃ i lÃ£nh Ä‘áº¡o vÃ  tá»• chá»©c. ThÃ­ch tá»± láº­p, Ä‘Æ°á»£c nhiá»u ngÆ°á»i kÃ­nh trá»ng vÃ  tÃ­n nhiá»‡m. ThÆ°á»ng náº¯m giá»¯ vá»‹ trÃ­ quáº£n lÃ½ hoáº·c cÃ³ táº§m áº£nh hÆ°á»Ÿng trong táº­p thá»ƒ.",
      "ThÃ¢n": "Háº­u váº­n vá»¯ng vÃ ng, cuá»™c sá»‘ng vÆ°Æ¡ng giáº£, uy danh tÄƒng tiáº¿n, cÃ³ chá»— Ä‘á»©ng cao trong xÃ£ há»™i.",
      "Quan Lá»™c": "Sá»± nghiá»‡p ráº¥t hanh thÃ´ng, thÃ­ch há»£p lÃ m lÃ£nh Ä‘áº¡o, quáº£n lÃ½ cáº¥p cao, cÃ´ng chá»©c nhÃ  nÆ°á»›c hoáº·c doanh nghiá»‡p tá»± chá»§.",
      "TÃ i Báº¡ch": "TÃ i chÃ­nh dá»“i dÃ o, tiá»n báº¡c hanh thÃ´ng, biáº¿t cÃ¡ch tÃ­ch lÅ©y vÃ  Ä‘iá»u tiáº¿t dÃ²ng tiá»n, Ã­t khi thiáº¿u thá»‘n.",
      "ThiÃªn Di": "Ra ngoÃ i Ä‘Æ°á»£c quÃ½ nhÃ¢n nÃ¢ng Ä‘á»¡, giao thiá»‡p rá»™ng vá»›i táº§ng lá»›p thÆ°á»£ng lÆ°u, dá»… thÃ nh danh nÆ¡i xa xá»©.",
      "Phu ThÃª": "Báº¡n Ä‘á»i cÃ³ khÃ­ cháº¥t cao quÃ½, gia tháº¿ tá»‘t, Ä‘oan chÃ­nh vÃ  lÃ  chá»— dá»±a vá»¯ng vÃ ng cho Ä‘Æ°Æ¡ng sá»‘.",
      "PhÃºc Äá»©c": "ÄÆ°á»£c hÆ°á»Ÿng phÃºc tá»• tiÃªn, dÃ²ng há» danh giÃ¡ hÆ°ng vÆ°á»£ng, tÃ¢m há»“n an láº¡c, sá»‘ng thá».",
      "Äiá»n Tráº¡ch": "NhÃ  cá»­a bá» tháº¿ khang trang, Ä‘áº¥t Ä‘ai gia tÄƒng theo thá»i gian, cÃ³ báº¥t Ä‘á»™ng sáº£n giÃ¡ trá»‹.",
      "Huynh Äá»‡": "Anh chá»‹ em hÃ²a thuáº­n, cÃ³ ngÆ°á»i thÃ nh Ä‘áº¡t danh giÃ¡, tÆ°Æ¡ng trá»£ láº«n nhau khi cáº§n.",
      "Tá»­ Ná»¯": "Con cÃ¡i thÃ´ng minh tuáº¥n tÃº, cÃ³ chÃ­ lá»›n, hiáº¿u tháº£o vÃ  ráº¡ng danh gia Ä‘áº¡o.",
      "NÃ´ Bá»™c": "Báº¡n bÃ¨ Ä‘á»“ng nghiá»‡p trung thÃ nh, cáº¥p dÆ°á»›i Ä‘áº¯c lá»±c, Ä‘Æ°á»£c má»i ngÆ°á»i kÃ­nh trá»ng.",
      "Táº­t Ãch": "Ãt khi máº¯c bá»‡nh hiá»ƒm nghÃ¨o, chÃº Ã½ cÃ¡c bá»‡nh liÃªn quan Ä‘áº¿n há»‡ tiÃªu hÃ³a, dáº¡ dÃ y, tá»³ vá»‹."
    }
  },
  "ThiÃªn CÆ¡": {
    nguHanh: "Má»™c (Ã‚m Má»™c)",
    loai: "Thiá»‡n Tinh, TrÃ­ Tinh - Nam Äáº©u Tinh",
    tongQuan: "ThiÃªn CÆ¡ chá»§ vá» mÆ°u trÃ­, tÆ° duy chiáº¿n lÆ°á»£c, cÆ¡ mÆ°u á»©ng biáº¿n. TÆ°á»£ng trÆ°ng cho báº­c quÃ¢n sÆ°, trÃ­ thá»©c, nhÃ  nghiÃªn cá»©u hoáº·c cá»‘ váº¥n sáº¯c sáº£o.",
    dacTinh: "ThÃ­ch há»c há»i, linh hoáº¡t, khÃ©o lÃ©o trong tÃ­nh toÃ¡n, suy nghÄ© tháº¥u Ä‘Ã¡o. NhÆ°á»£c Ä‘iá»ƒm lÃ  Ä‘Ã´i khi nghÄ© quÃ¡ nhiá»u dáº«n Ä‘áº¿n lo Ã¢u, tÃ¢m tháº§n báº¥t an.",
    yNghiaCung: {
      "Má»‡nh": "NgÆ°á»i thÃ´ng minh nhanh nháº¡y, pháº£n á»©ng sáº¯c bÃ©n, thÃ­ch nghi tá»‘t vá»›i má»i mÃ´i trÆ°á»ng, cÃ³ duyÃªn vá»›i cÃ´ng nghá»‡, ká»¹ thuáº­t, há»c thuáº­t, cá»‘ váº¥n.",
      "Quan Lá»™c": "Ráº¥t há»£p lÃ m tham mÆ°u, káº¿ hoáº¡ch, IT, phÃ¢n tÃ­ch dá»¯ liá»‡u, nghiÃªn cá»©u há»c thuáº­t hoáº·c cÃ¡c ngÃ nh nghá» dá»‹ch vá»¥ trÃ­ tuá»‡.",
      "TÃ i Báº¡ch": "Tiá»n tÃ i kiáº¿m báº±ng trÃ­ Ã³c, linh hoáº¡t Ä‘a dáº¡ng nguá»“n thu, giá»i Ä‘áº§u tÆ° xoay vÃ²ng.",
      "ThiÃªn Di": "Ra ngoÃ i nhanh nháº¹n, hay Ä‘i láº¡i, nÄƒng Ä‘á»™ng, thÃ­ch há»£p Ä‘i lÃ m viá»‡c lÆ°u Ä‘á»™ng hoáº·c cÃ´ng tÃ¡c xa.",
      "Phu ThÃª": "Báº¡n Ä‘á»i thÃ´ng minh, khÃ©o Äƒn nÃ³i, tÃ­nh tÃ¬nh hoáº¡t bÃ¡t, Ä‘Ã´i khi hÆ¡i nháº¡y cáº£m hoáº·c hay lo xa.",
      "Táº­t Ãch": "Cáº§n chÃº Ã½ há»‡ tháº§n kinh, máº¥t ngá»§, cÄƒng tháº³ng Ä‘áº§u Ã³c, cÃ¡c bá»‡nh liÃªn quan Ä‘áº¿n gan máº­t vÃ  tá»© chi."
    }
  },
  "ThÃ¡i DÆ°Æ¡ng": {
    nguHanh: "Há»a (DÆ°Æ¡ng Há»a)",
    loai: "QuÃ½ Tinh, Quang Minh Tinh - Nam Äáº©u Tinh",
    tongQuan: "ThÃ¡i DÆ°Æ¡ng lÃ  váº§ng máº·t trá»i rá»±c rá»¡, chá»§ vá» sá»± quang minh chÃ­nh Ä‘áº¡i, hÃ o sáº£ng, uy danh, danh tiáº¿ng vÃ  sá»± nghiá»‡p cá»™ng Ä‘á»“ng.",
    dacTinh: "Nhiá»‡t tÃ¬nh, trÆ°á»£ng nghÄ©a, thÃ­ch giÃºp Ä‘á»¡ ngÆ°á»i khÃ¡c, tháº³ng tháº¯n, cÃ³ chÃ­ hÆ°á»›ng lá»›n. Ráº¥t sá»£ rÆ¡i vÃ o cung hÃ£m Ä‘á»‹a (buá»•i tá»‘i) sáº½ giáº£m bá»›t Ã¡nh quang minh.",
    yNghiaCung: {
      "Má»‡nh": "TÃ­nh tÃ¬nh phÃ³ng khoÃ¡ng, thÃ­ch lÃ m viá»‡c lá»›n, trá»ng thá»ƒ diá»‡n, cÃ³ uy tÃ­n vÃ  sá»©c lan tá»a máº¡nh máº½ trong xÃ£ há»™i.",
      "Quan Lá»™c": "Danh vá»ng láº«y lá»«ng, thÃ­ch há»£p vá»›i cÃ¡c ngÃ nh truyá»n thÃ´ng, chÃ­nh trá»‹, luáº­t phÃ¡p, giÃ¡o dá»¥c hoáº·c hoáº¡t Ä‘á»™ng cÃ´ng Ã­ch.",
      "TÃ i Báº¡ch": "Tiá»n tÃ i Ä‘áº¿n tá»« danh tiáº¿ng, kiáº¿m tiá»n Ä‘Æ°á»ng Ä‘Æ°á»ng chÃ­nh chÃ­nh, tiÃªu xÃ i rá»™ng rÃ£i, hÃ o phÃ³ng.",
      "Phu ThÃª": "Nam má»‡nh láº¥y Ä‘Æ°á»£c vá»£ hiá»n Ä‘áº£m Ä‘ang; Ná»¯ má»‡nh láº¥y Ä‘Æ°á»£c chá»“ng cÃ³ danh tiáº¿ng, chÃ­ lá»›n nhÆ°ng tÃ­nh cÃ¡ch máº¡nh máº½.",
      "Táº­t Ãch": "Cáº§n chÃº Ã½ Ä‘áº¿n máº¯t (thá»‹ lá»±c), tim máº¡ch, huyáº¿t Ã¡p vÃ  cÃ¡c chá»©ng Ä‘au Ä‘áº§u do nhiá»‡t."
    }
  },
  "VÅ© KhÃºc": {
    nguHanh: "Kim (Ã‚m Kim)",
    loai: "TÃ i Tinh, DÅ©ng Tinh - Báº¯c Äáº©u Tinh",
    tongQuan: "VÅ© KhÃºc lÃ  Ä‘á»‡ nháº¥t TÃ i Tinh trong Tá»­ Vi, chá»§ vá» tiá»n tÃ i, tÃ i chÃ­nh, ngÃ¢n hÃ ng, thÆ°Æ¡ng máº¡i vÃ  nÄƒng lá»±c hÃ nh Ä‘á»™ng quyáº¿t Ä‘oÃ¡n.",
    dacTinh: "TÃ­nh tÃ¬nh cÆ°Æ¡ng nghá»‹, nÃ³i Ã­t lÃ m nhiá»u, kiÃªn trÃ¬ nháº«n náº¡i, cÃ³ Ä‘áº§u Ã³c tÃ­nh toÃ¡n tÃ i chÃ­nh xuáº¥t sáº¯c, thá»±c táº¿ vÃ  quyáº¿t Ä‘oÃ¡n.",
    yNghiaCung: {
      "Má»‡nh": "KhuÃ´n máº·t chá»¯ Ä‘iá»n, giá»ng nÃ³i dá»©t khoÃ¡t, Ã½ chÃ­ kiÃªn Ä‘á»‹nh, cÃ³ tÃ i quáº£n lÃ½ tÃ i chÃ­nh báº©m sinh, láº­p nghiá»‡p tá»« sá»›m.",
      "Quan Lá»™c": "Ráº¥t há»£p lÃ m viá»‡c trong lÄ©nh vá»±c tÃ i chÃ­nh ngÃ¢n hÃ ng, kiá»ƒm toÃ¡n, kinh doanh, chá»©ng khoÃ¡n, cÆ¡ khÃ­ quÃ¢n sá»±.",
      "TÃ i Báº¡ch": "Cá»±c tá»‘t, cung TÃ i Báº¡ch cÃ³ VÅ© KhÃºc chá»§ vá» tÃ­ch lÅ©y lá»›n, cÃ³ tÃ i sinh sÃ´i cá»§a cáº£i, háº­u váº­n phÃº quÃ½ sung tÃºc.",
      "Phu ThÃª": "TÃ¬nh cáº£m cáº§n sá»± tháº¥u hiá»ƒu vÃ¬ tÃ­nh cÃ¡ch hai bÃªn Ä‘á»u máº¡nh máº½, náº¿u láº¥y muá»™n sáº½ bá»n cháº·t hÆ¡n.",
      "Táº­t Ãch": "ChÃº Ã½ há»‡ hÃ´ háº¥p, phá»•i, pháº¿ quáº£n vÃ  cÃ¡c cháº¥n thÆ°Æ¡ng kim khÃ­ va cháº¡m."
    }
  },
  "ThiÃªn Äá»“ng": {
    nguHanh: "Thá»§y (DÆ°Æ¡ng Thá»§y)",
    loai: "PhÃºc Tinh - Nam Äáº©u Tinh",
    tongQuan: "ThiÃªn Äá»“ng chá»§ vá» sá»± hÃ²a nhÃ£, phÃºc thá», tÃ¢m tÃ­nh thiá»‡n lÆ°Æ¡ng nhÆ° tráº» thÆ¡, dá»… gáº§n, cÃ³ khiáº¿u nghá»‡ thuáº­t vÃ  hÆ°á»Ÿng thá»¥ áº©m thá»±c.",
    dacTinh: "Hiá»n lÃ nh, khÃ´ng thÃ­ch tranh cháº¥p, tÃ¢m há»“n láº¡c quan vui váº», cÃ³ phÆ°á»›c Ä‘á»©c giáº£i nguy tiÃªu tai.",
    yNghiaCung: {
      "Má»‡nh": "GÆ°Æ¡ng máº·t phÃºc háº­u tráº» lÃ¢u, tÃ­nh tÃ¬nh vui váº» hÃ²a Ä‘á»“ng, thÃ­ch cuá»™c sá»‘ng an nhÃ n tá»± táº¡i, Ã­t khi mÆ°u cáº§u danh lá»£i kháº¯c nghiá»‡t.",
      "PhÃºc Äá»©c": "ÄÆ°á»£c hÆ°á»Ÿng phÃºc trá»n váº¹n, tá»• tiÃªn che chá»Ÿ, cuá»™c Ä‘á»i gáº·p hung hÃ³a cÃ¡t, tÃ¢m tÃ­nh thanh tháº£n.",
      "Quan Lá»™c": "ThÃ­ch há»£p cÃ¡c ngÃ nh nghá» vÄƒn hÃ³a, áº©m thá»±c, du lá»‹ch, nghá»‡ thuáº­t hoáº·c dá»‹ch vá»¥ chÄƒm sÃ³c.",
      "TÃ i Báº¡ch": "Tiá»n báº¡c Ä‘á»§ dÃ¹ng, khÃ´ng quÃ¡ Ã¡p lá»±c kiáº¿m tiá»n, cÃ³ lá»™c báº¥t ngá» vÃ  váº­n may máº¯n.",
      "Táº­t Ãch": "Cáº§n lÆ°u Ã½ há»‡ bÃ i tiáº¿t, bÃ ng quang, tháº­n vÃ  há»‡ tiÃªu hÃ³a do thÃ³i quen Äƒn uá»‘ng tá»± do."
    }
  },
  "LiÃªm Trinh": {
    nguHanh: "Há»a (Ã‚m Há»a) Ä‘á»›i Má»™c",
    loai: "TÃ¹ Tinh, Thá»© ÄÃ o Hoa - Báº¯c Äáº©u Tinh",
    tongQuan: "LiÃªm Trinh lÃ  ngÃ´i sao vá»«a cÃ³ tÃ­nh ká»· luáº­t, tá»± chá»§ cao (quan lá»™c), vá»«a cÃ³ nÃ©t quyáº¿n rÅ© Ä‘Ã o hoa, phong lÆ°u nghá»‡ thuáº­t.",
    dacTinh: "CÃ¡ tÃ­nh Ä‘á»™c láº­p, thÃ­ch tá»± do, lÃ²ng tá»± trá»ng cá»±c lá»›n, cÃ³ sá»©c háº¥p dáº«n Ä‘áº·c biá»‡t vá»›i ngÆ°á»i khÃ¡c phÃ¡i, nguyÃªn táº¯c rÃµ rÃ ng.",
    yNghiaCung: {
      "Má»‡nh": "KhÃ­ cháº¥t thu hÃºt, tÃ­nh cÃ¡ch máº¡nh máº½, cÆ°Æ¡ng nghá»‹, cÃ³ Ä‘am mÃª mÃ£nh liá»‡t, trá»ng nghÄ©a khÃ­ nhÆ°ng Ä‘Ã´i khi nÃ³ng náº£y.",
      "Quan Lá»™c": "PhÃ¡t huy sá»Ÿ trÆ°á»ng trong phÃ¡p luáº­t, ká»¹ thuáº­t, Ä‘iá»‡n tá»­, thiáº¿t káº¿, cÃ´ng nghá»‡ thÃ´ng tin hoáº·c nghá»‡ thuáº­t sÃ¡ng táº¡o.",
      "TÃ i Báº¡ch": "Kiáº¿m tiá»n tá»« tÃ i nÄƒng cáº¡nh tranh, dÃ¡m nghÄ© dÃ¡m lÃ m, cáº§n cáº©n trá»ng trÃ¡nh tranh cháº¥p thá»‹ phi tÃ i chÃ­nh.",
      "Phu ThÃª": "TÃ¬nh cáº£m mÃ£nh liá»‡t, lÃ£ng máº¡n nhÆ°ng dá»… náº£y sinh ghen tuÃ´ng hoáº·c tranh luáº­n do cáº£ hai Ä‘á»u cÃ¡ tÃ­nh máº¡nh.",
      "Táº­t Ãch": "ChÃº Ã½ tim máº¡ch, cÃ¡c bá»‡nh vá» mÃ¡u, da liá»…u hoáº·c dá»‹ á»©ng."
    }
  },
  "ThiÃªn Phá»§": {
    nguHanh: "Thá»• (DÆ°Æ¡ng Thá»•)",
    loai: "Lá»‡nh Tinh, TÃ i Khá»‘ - Nam Äáº©u Tinh",
    tongQuan: "ThiÃªn Phá»§ lÃ  kho trá»i (TÃ i khá»‘), Ä‘á»‘i trá»ng vá»›i Tá»­ Vi. Chá»§ vá» sá»± giá»¯ gÃ¬n tÃ i sáº£n, quáº£n lÃ½ tÃ­ch lÅ©y, uy nghi tráº§m tÄ©nh vÃ  sá»± á»•n Ä‘á»‹nh bá»n vá»¯ng.",
    dacTinh: "Bao dung, cáº©n trá»ng, tÃ­nh toÃ¡n an toÃ n, biáº¿t hÆ°á»Ÿng thá»¥, cÃ³ tÃ i giá»¯ cá»§a vÃ  quáº£n trá»‹ tá»• chá»©c quy mÃ´ lá»›n.",
    yNghiaCung: {
      "Má»‡nh": "KhuÃ´n máº·t Ä‘áº§y Ä‘áº·n sang trá»ng, cá»‘t cÃ¡ch thanh tao, tÃ­nh tÃ¬nh Ä‘Ã´n háº­u, sá»‘ng chu Ä‘Ã¡o vÃ  kÃ­n Ä‘Ã¡o, biáº¿t nhÃ¬n xa trÃ´ng rá»™ng.",
      "TÃ i Báº¡ch": "Äáº¯c cÃ¡ch tuyá»‡t háº£o! Kho tiá»n Ä‘áº§y áº¯p, cÃ³ kháº£ nÄƒng tÃ­ch lÅ©y tÃ i sáº£n khá»•ng lá»“, quáº£n lÃ½ rá»§i ro tuyá»‡t vá»i.",
      "Äiá»n Tráº¡ch": "Nhiá»u nhÃ  cá»­a Ä‘áº¥t Ä‘ai, thá»«a káº¿ hoáº·c tá»± mua sáº¯m báº¥t Ä‘á»™ng sáº£n vá»¯ng cháº¯c.",
      "Quan Lá»™c": "Vá»‹ trÃ­ quáº£n trá»‹ tÃ i chÃ­nh, hÃ nh chÃ­nh, thá»§ kho, ngÃ¢n hÃ ng, Ä‘iá»u hÃ nh doanh nghiá»‡p lá»›n.",
      "Táº­t Ãch": "Sá»©c khá»e dáº»o dai, chÃº Ã½ bá»‡nh dáº¡ dÃ y, tiÃªu hÃ³a hoáº·c thá»«a cÃ¢n bÃ©o phÃ¬ khi cÃ³ tuá»•i."
    }
  },
  "ThÃ¡i Ã‚m": {
    nguHanh: "Thá»§y (Ã‚m Thá»§y)",
    loai: "PhÃº Tinh, Äiá»n Tráº¡ch Tinh - Báº¯c Äáº©u Tinh",
    tongQuan: "ThÃ¡i Ã‚m lÃ  váº§ng trÄƒng hiá»n dá»‹u, chá»§ vá» máº¹, vá»£, con gÃ¡i; chá»§ vá» phÃº quÃ½, báº¥t Ä‘á»™ng sáº£n, sá»± tinh táº¿, ná»™i tÃ¢m sÃ¢u sáº¯c vÃ  Ã³c tháº©m má»¹.",
    dacTinh: "Tráº§m tÄ©nh, dá»‹u dÃ ng, lÃ£ng máº¡n, chu Ä‘Ã¡o, ráº¥t cÃ³ duyÃªn vá»›i tÃ­ch lÅ©y nhÃ  Ä‘áº¥t vÃ  lÃ m Ä‘áº¹p, nghá»‡ thuáº­t.",
    yNghiaCung: {
      "Má»‡nh": "Ngoáº¡i hÃ¬nh thanh tÃº, máº¯t sÃ¡ng dá»‹u hiá»n, tÃ­nh cÃ¡ch tinh táº¿ ná»™i tÃ¢m, thÃ­ch vÄƒn hÃ³a nghá»‡ thuáº­t vÃ  cÃ³ trá»±c giÃ¡c nháº¡y bÃ©n.",
      "Äiá»n Tráº¡ch": "Ráº¥t vÆ°á»£ng vá» nhÃ  Ä‘áº¥t, dá»… cÃ³ nhiá»u tÃ i sáº£n báº¥t Ä‘á»™ng sáº£n, nÆ¡i á»Ÿ yÃªn tÄ©nh Ä‘áº¹p Ä‘áº½.",
      "TÃ i Báº¡ch": "Tiá»n tÃ i á»•n Ä‘á»‹nh, vÃ o Ä‘á»u Ä‘áº·n nhÆ° chu ká»³ trÄƒng trÃ²n trÄƒng khuyáº¿t, giá»i tÃ­ch cÃ³p khÃ´ng hoang phÃ­.",
      "Phu ThÃª": "Nam má»‡nh láº¥y Ä‘Æ°á»£c vá»£ hiá»n thá»¥c xinh Ä‘áº¹p, gia Ä‘Ã¬nh Ãªm áº¥m; Ná»¯ má»‡nh tÃ¬nh cáº£m sÃ¢u sáº¯c, chÄƒm sÃ³c gia Ä‘Ã¬nh chu toÃ n.",
      "Táº­t Ãch": "LÆ°u Ã½ bá»‡nh vá» máº¯t, há»‡ tuáº§n hoÃ n dá»‹ch thá»ƒ, tháº­n, kinh nguyá»‡t phá»¥ khoa Ä‘á»‘i vá»›i ná»¯ giá»›i."
    }
  },
  "Tham Lang": {
    nguHanh: "Má»™c (DÆ°Æ¡ng Má»™c) Ä‘á»›i Thá»§y",
    loai: "ChÃ­nh ÄÃ o Hoa, Dá»¥c Vá»ng Tinh - Báº¯c Äáº©u Tinh",
    tongQuan: "Tham Lang lÃ  ngÃ´i sao cá»§a sá»± giao tiáº¿p, háº¥p dáº«n, Ä‘a tÃ i Ä‘a nghá»‡, tham vá»ng tiáº¿n thá»§ vÃ  hÆ°á»Ÿng thá»¥ tháº¿ gian.",
    dacTinh: "ThÃ´ng minh, khÃ©o lÃ©o trong quan há»‡ xÃ£ há»™i, thÃ­ch cÃ¡i Ä‘áº¹p, Ä‘am mÃª há»c há»i nhiá»u lÄ©nh vá»±c tá»« kinh doanh Ä‘áº¿n huyá»n há»c tÃ¢m linh.",
    yNghiaCung: {
      "Má»‡nh": "Háº¥p dáº«n, giá»i xÃ£ giao, nhiá»u tÃ i láº», thÃ­ch khÃ¡m phÃ¡ cÃ¡i má»›i, náº¿u gáº·p Há»a Tinh hoáº·c Linh Tinh táº¡o thÃ nh cÃ¡ch 'Há»a Tham / Linh Tham' báº¡o phÃ¡t báº¥t ngá».",
      "TÃ i Báº¡ch": "Kiáº¿m tiá»n qua giao dá»‹ch, ngoáº¡i giao, Ä‘áº§u tÆ° tÃ¡o báº¡o, buÃ´n bÃ¡n lá»›n hoáº·c ngÃ nh nghá» giáº£i trÃ­ nghá»‡ thuáº­t.",
      "Quan Lá»™c": "ThÃ­ch há»£p lÃ m kinh doanh, Ä‘á»‘i ngoáº¡i, du lá»‹ch, giáº£i trÃ­, nhÃ  hÃ ng áº©m thá»±c, marketing.",
      "Phu ThÃª": "ÄÃ o hoa vÆ°á»£ng, cáº§n sá»± tin tÆ°á»Ÿng vÃ  tháº¥u hiá»ƒu láº«n nhau Ä‘á»ƒ giá»¯ lá»­a háº¡nh phÃºc lÃ¢u bá»n.",
      "Táº­t Ãch": "ChÃº Ã½ gan máº­t, há»‡ bÃ i tiáº¿t, cÃ¡c váº¥n Ä‘á» do sinh hoáº¡t tiá»‡c tÃ¹ng quÃ¡ Ä‘á»™."
    }
  },
  "Cá»± MÃ´n": {
    nguHanh: "Thá»§y (Ã‚m Thá»§y) Ä‘á»›i Kim",
    loai: "Ãm Tinh - Báº¯c Äáº©u Tinh",
    tongQuan: "Cá»± MÃ´n chá»§ vá» kháº©u tÃ i (lá»i Äƒn tiáº¿ng nÃ³i), hÃ¹ng biá»‡n, tÆ° duy pháº£n biá»‡n, sá»± nghi váº¥n vÃ  nghiÃªn cá»©u sÃ¢u sáº¯c.",
    dacTinh: "Giá»i phÃ¢n tÃ­ch, nÃ³i nÄƒng sáº¯c sáº£o, logic cháº·t cháº½, thÃ­ch tÃ¬m tÃ²i táº­n gá»‘c rá»… váº¥n Ä‘á». Náº¿u hÃ£m Ä‘á»‹a dá»… vÆ°á»›ng kháº©u thiá»‡t thá»‹ phi.",
    yNghiaCung: {
      "Má»‡nh": "Kháº©u tÃ i xuáº¥t chÃºng, cÃ³ tÃ i thuyáº¿t phá»¥c, thÃ­ch tranh biá»‡n lÃ m rÃµ Ä‘Ãºng sai, phÃ¹ há»£p ngÃ nh cáº§n tiáº¿ng nÃ³i vÃ  láº­p luáº­n.",
      "Quan Lá»™c": "Ráº¥t há»£p lÃ m luáº­t sÆ°, giáº£ng viÃªn, ngoáº¡i giao, truyá»n thÃ´ng, thuyáº¿t trÃ¬nh viÃªn, nhÃ  bÃ¡o hoáº·c chuyÃªn gia tÆ° váº¥n.",
      "TÃ i Báº¡ch": "Kiáº¿m tiá»n báº±ng lá»i nÃ³i, chuyÃªn mÃ´n sÃ¢u hoáº·c trung gian mÃ´i giá»›i.",
      "NÃ´ Bá»™c / Huynh Äá»‡": "Cáº§n chÃº Ã½ cÃ¡ch Äƒn nÃ³i Ä‘á»ƒ trÃ¡nh hiá»ƒu láº§m, kháº©u thiá»‡t khÃ´ng Ä‘Ã¡ng cÃ³ vá»›i ngÆ°á»i xung quanh.",
      "Táº­t Ãch": "ChÃº Ã½ Ä‘Æ°á»ng hÃ´ háº¥p, vÃ²m há»ng, rÄƒng miá»‡ng, thanh quáº£n vÃ  há»‡ tiÃªu hÃ³a."
    }
  },
  "ThiÃªn TÆ°á»›ng": {
    nguHanh: "Thá»§y (DÆ°Æ¡ng Thá»§y)",
    loai: "áº¤n Tinh - Nam Äáº©u Tinh",
    tongQuan: "ThiÃªn TÆ°á»›ng lÃ  con dáº¥u quyá»n lá»±c (áº¤n Tinh), tÆ°á»›ng phá»¥ tÃ¡ Ä‘áº¯c lá»±c cho Tá»­ Vi. Chá»§ vá» sá»± chÃ­nh trá»±c, trÆ°á»£ng nghÄ©a, chu toÃ n vÃ  há»— trá»£ ngÆ°á»i khÃ¡c.",
    dacTinh: "Ä‚n máº·c trang nhÃ£, lá»… phÃ©p, giÃ u lÃ²ng tráº¯c áº©n, giá»¯ chá»¯ tÃ­n hÃ ng Ä‘áº§u, giá»i lÃ m viá»‡c nhÃ³m vÃ  trung thÃ nh.",
    yNghiaCung: {
      "Má»‡nh": "TÆ°á»›ng máº¡o Ä‘oan chÃ­nh, lá»‹ch thiá»‡p, tÃ­nh tÃ¬nh Ã´n hÃ²a chÃ­nh trá»±c, thÃ­ch giÃºp Ä‘á»¡ káº» yáº¿u, Ä‘Æ°á»£c nhiá»u ngÆ°á»i ná»ƒ phá»¥c.",
      "Quan Lá»™c": "CÃ¡nh tay pháº£i Ä‘áº¯c lá»±c cá»§a lÃ£nh Ä‘áº¡o, chuyÃªn viÃªn cáº¥p cao, lÃ m quáº£n lÃ½ Ä‘iá»u hÃ nh hoáº·c vÄƒn phÃ²ng chá»‰ huy.",
      "TÃ i Báº¡ch": "Tiá»n tÃ i á»•n Ä‘á»‹nh, minh báº¡ch rÃµ rÃ ng, Ä‘Æ°á»£c hÆ°á»Ÿng bá»•ng lá»™c bá»n vá»¯ng.",
      "Phu ThÃª": "Báº¡n Ä‘á»i cÃ³ há»c thá»©c, gia giÃ¡o, Ä‘oan trang, há»— trá»£ Ä‘áº¯c lá»±c cho sá»± nghiá»‡p cá»§a nhau.",
      "Táº­t Ãch": "ChÃº Ã½ bá»‡nh da liá»…u, dá»‹ á»©ng thá»i tiáº¿t, bÃ ng quang hoáº·c há»‡ tiáº¿t niá»‡u."
    }
  },
  "ThiÃªn LÆ°Æ¡ng": {
    nguHanh: "Thá»• (DÆ°Æ¡ng Thá»•)",
    loai: "áº¤m Tinh, Thá» Tinh - Nam Äáº©u Tinh",
    tongQuan: "ThiÃªn LÆ°Æ¡ng lÃ  ngÃ´i sao cá»§a ngÆ°á»i lá»›n tuá»•i (áº¤m Tinh), chá»§ vá» sá»± che chá»Ÿ, phÃºc thá», nguyÃªn táº¯c Ä‘áº¡o Ä‘á»©c, y thuáº­t vÃ  giÃ¡o dá»¥c.",
    dacTinh: "ThÃ­ch lÃ m phÃºc, phong thÃ¡i báº­c tiá»n bá»‘i, tÃ´n trá»ng truyá»n thá»‘ng, cÃ³ kháº£ nÄƒng hÃ³a hung thÃ nh cÃ¡t khi gáº·p hoáº¡n náº¡n.",
    yNghiaCung: {
      "Má»‡nh": "ChÃ­nh trá»±c, cÃ³ lÃ²ng nhÃ¢n Ã¡i bao la, thÃ­ch giÃºp Ä‘á»¡ má»i ngÆ°á»i, phong thÃ¡i nho nhÃ£, cÃ³ duyÃªn vá»›i y há»c, giÃ¡o dá»¥c, tÃ´n giÃ¡o.",
      "PhÃºc Äá»©c": "ÄÆ°á»£c tá»• tiÃªn ban phÃºc sÃ¢u dÃ y, cáº£ Ä‘á»i gáº·p hung hÃ³a cÃ¡t, thá» khang trÆ°á»ng thá».",
      "Quan Lá»™c": "Há»£p nghá» giÃ¡o viÃªn, bÃ¡c sÄ©, dÆ°á»£c sÄ©, thanh tra, kiá»ƒm toÃ¡n, luáº­t sÆ° hoáº·c hoáº¡t Ä‘á»™ng xÃ£ há»™i tá»« thiá»‡n.",
      "Phá»¥ Máº«u": "Cha máº¹ hiá»n tá»« Ä‘á»©c Ä‘á»™, Ä‘á»ƒ láº¡i phÃºc áº¥m lá»›n cho con chÃ¡u.",
      "Táº­t Ãch": "CÃ³ sao ThiÃªn LÆ°Æ¡ng thÃ¬ bá»‡nh náº·ng hÃ³a nháº¹, gáº·p tháº§y gáº·p thuá»‘c cá»©u chá»¯a ká»‹p thá»i."
    }
  },
  "Tháº¥t SÃ¡t": {
    nguHanh: "Kim (DÆ°Æ¡ng Kim) Ä‘á»›i Há»a",
    loai: "TÆ°á»›ng Tinh, DÅ©ng Tinh - Nam Äáº©u Tinh",
    tongQuan: "Tháº¥t SÃ¡t lÃ  viÃªn Ä‘áº¡i tÆ°á»›ng dÅ©ng mÃ£nh trÃªn sa trÆ°á»ng, chá»§ vá» sá»± dÅ©ng cáº£m, quyáº¿t Ä‘oÃ¡n, xung tráº­n tiÃªn phong, tÃ­nh cÃ¡ch cÆ°Æ¡ng liá»‡t.",
    dacTinh: "DÃ¡m nghÄ© dÃ¡m lÃ m, khÃ´ng sá»£ gian nan tráº¯c trá»Ÿ, cÃ³ uy lá»±c chá»‰ huy, sá»‘ng Ä‘á»™c láº­p vÃ  tá»± chá»§ tuyá»‡t Ä‘á»‘i.",
    yNghiaCung: {
      "Má»‡nh": "Ãnh máº¯t sÃ¡ng cÆ°Æ¡ng nghá»‹, phong thÃ¡i máº¡nh máº½, tÃ­nh cÃ¡ch quyáº¿t liá»‡t, thÃ­ch thá»­ thÃ¡ch máº¡o hiá»ƒm, vÆ°á»£t khÃ³ vÆ°Æ¡n lÃªn thÃ nh cÃ´ng lá»›n.",
      "Quan Lá»™c": "ThÃ­ch há»£p mÃ´i trÆ°á»ng quÃ¢n sá»±, cÃ´ng an, cÆ¡ khÃ­ cháº¿ táº¡o, pháº«u thuáº­t ngoáº¡i khoa, doanh nhÃ¢n khá»Ÿi nghiá»‡p quyáº¿t liá»‡t.",
      "TÃ i Báº¡ch": "Tiá»n tÃ i Ä‘áº¿n tá»« sá»± pháº¥n Ä‘áº¥u khÃ´ng ngá»«ng, dÃ¡m Ä‘áº§u tÆ° quy mÃ´ lá»›n, qua nhiá»u thÄƒng tráº§m Ä‘á»ƒ Ä‘áº¡t Ä‘á»‰nh cao phÃº quÃ½.",
      "Phu ThÃª": "TÃ¬nh duyÃªn nÃªn káº¿t hÃ´n muá»™n, vá»£ chá»“ng tÃ´n trá»ng cÃ¡ tÃ­nh riÃªng cá»§a nhau thÃ¬ hÃ´n nhÃ¢n má»›i Ãªm Ä‘áº¹p.",
      "Táº­t Ãch": "Cáº§n Ä‘á» phÃ²ng cÃ¡c váº¿t thÆ°Æ¡ng kim khÃ­, cháº¥n thÆ°Æ¡ng thá»ƒ thao hoáº·c bá»‡nh vá» xÆ°Æ¡ng khá»›p, hÃ´ háº¥p."
    }
  },
  "PhÃ¡ QuÃ¢n": {
    nguHanh: "Thá»§y (Ã‚m Thá»§y)",
    loai: "Hao Tinh, TiÃªn Phong Tinh - Báº¯c Äáº©u Tinh",
    tongQuan: "PhÃ¡ QuÃ¢n lÃ  dÅ©ng tÆ°á»›ng phÃ¡ Ä‘á»‹ch, chá»§ vá» sá»± biáº¿n Ä‘á»•i, Ä‘á»•i má»›i sÃ¡ng táº¡o, tiÃªn phong má»Ÿ Ä‘Æ°á»ng (phÃ¡ cÅ© láº­p má»›i).",
    dacTinh: "TÃ¡o báº¡o, ghÃ©t sá»± ráº­p khuÃ´n gÃ² bÃ³, Æ°a Ä‘á»•i má»›i, cÃ³ nÄƒng lá»±c khai phÃ¡ thá»‹ trÆ°á»ng má»›i hoáº·c cÃ´ng nghá»‡ má»›i vÆ°á»£t báº­c.",
    yNghiaCung: {
      "Má»‡nh": "TÃ­nh cÃ¡ch Ä‘á»™c láº­p, phÃ³ng khoÃ¡ng, thÃ­ch thá»­ thÃ¡ch, cÃ³ sá»©c báº­t tinh tháº§n phi thÆ°á»ng sau má»—i tháº¥t báº¡i Ä‘á»ƒ vÆ°Æ¡n tá»›i ká»³ tÃ­ch.",
      "Quan Lá»™c": "PhÃ¹ há»£p vá»›i cÃ´ng viá»‡c khai phÃ¡, dá»± Ã¡n má»›i, nghiÃªn cá»©u Ä‘á»•i má»›i cÃ´ng nghá»‡, kiáº¿n trÃºc xÃ¢y dá»±ng, kinh doanh máº¡o hiá»ƒm.",
      "TÃ i Báº¡ch": "Tiá»n tÃ i cÃ³ tÃ­nh biáº¿n Ä‘á»™ng cao, dÃ¡m Ä‘áº§u tÆ° lá»›n, tiá»n vÃ o nhanh vÃ  ra cÅ©ng nhanh, cáº§n quáº£n lÃ½ chi tiÃªu bÃ i báº£n.",
      "Äiá»n Tráº¡ch": "ThÆ°á»ng tá»± tay gÃ¢y dá»±ng nhÃ  cá»­a tá»« hai bÃ n tay tráº¯ng, Ã­t khi giá»¯ láº¡i nhÃ  Ä‘áº¥t thá»«a káº¿ cá»§a tiá»n nhÃ¢n.",
      "Táº­t Ãch": "Äá» phÃ²ng pháº«u thuáº­t, tai náº¡n xÃ¢y dá»±ng hoáº·c cÃ¡c váº¥n Ä‘á» liÃªn quan Ä‘áº¿n nha khoa, xÆ°Æ¡ng khá»›p."
    }
  }
};

var DICT_PHU_TINH = {
  "Táº£ PhÃ¹": "QuÃ½ nhÃ¢n nÃ¢ng Ä‘á»¡ tá»« bÃªn ngoÃ i, báº¡n bÃ¨ Ä‘á»“ng nghiá»‡p tÆ°Æ¡ng trá»£ chÃ­ tÃ¬nh, gia tÄƒng sá»©c máº¡nh cho má»‡nh bÃ n.",
  "Há»¯u Báº­t": "Trá»£ thá»§ Ä‘áº¯c lá»±c, háº­u phÆ°Æ¡ng vá»¯ng cháº¯c, nhÃ¢n duyÃªn tá»‘t Ä‘áº¹p, mÆ°u sá»± cÃ³ ngÆ°á»i cÃ¹ng chung tay giÃºp sá»©c.",
  "VÄƒn XÆ°Æ¡ng": "Chá»§ vá» thi cá»­ Ä‘á»— Ä‘áº¡t, há»c hÃ nh xuáº¥t chÃºng, vÄƒn chÆ°Æ¡ng lá»—i láº¡c, cÃ³ tÃ i hoa phong nhÃ£ vÃ  báº±ng cáº¥p cao.",
  "VÄƒn KhÃºc": "Chá»§ vá» nghá»‡ thuáº­t, tÃ i nÄƒng á»©ng biáº¿n, khiáº¿u tháº©m má»¹, Äƒn nÃ³i lÆ°u loÃ¡t vÃ  tÆ° duy sÃ¡ng táº¡o nháº¡y bÃ©n.",
  "ThiÃªn KhÃ´i": "Äá»‡ nháº¥t quÃ½ nhÃ¢n tinh, gáº·p ngÆ°á»i bá» trÃªn nÃ¢ng Ä‘á»¡, cáº¥p trÃªn trá»ng dá»¥ng, thi cá»­ dá»… Ä‘á»— thá»§ khoa Ä‘áº§u báº£ng.",
  "ThiÃªn Viá»‡t": "QuÃ½ nhÃ¢n ngáº§m giÃºp Ä‘á»¡, cÆ¡ há»™i Ä‘áº¿n báº¥t ngá» tá»« nhá»¯ng ngÆ°á»i cÃ³ uy tÃ­n, thuáº­n lá»£i cho phÃ¡t triá»ƒn sá»± nghiá»‡p.",
  "Lá»™c Tá»“n": "Lá»™c trá»i ban cho, chá»§ vá» tiá»n báº¡c dá»“i dÃ o, tÃ­ch lÅ©y vá»¯ng vÃ ng, phong lÆ°u phÃº quÃ½ cáº£ Ä‘á»i.",
  "KÃ¬nh DÆ°Æ¡ng": "TÃ­nh cÃ¡ch cÆ°Æ¡ng trá»±c quyáº¿t liá»‡t, dÅ©ng cáº£m nhÆ°ng cáº§n kiá»m cháº¿ nÃ³ng vá»™i; cÃ³ lá»£i khi Ä‘i vÃ o ká»¹ thuáº­t, quÃ¢n sá»±.",
  "ÄÃ  La": "TÃ­nh cÃ¡ch kiÃªn trÃ¬ nháº«n náº¡i, lÃ m viá»‡c cáº©n trá»ng tá»‰ má»‰, hay suy nghÄ© sÃ¢u xa, Ä‘á» phÃ²ng do dá»± cháº§n chá»« máº¥t cÆ¡ há»™i.",
  "Há»a Tinh": "Nhiá»‡t tÃ¬nh, pháº£n á»©ng nhanh nhÆ° chá»›p, hÃ nh Ä‘á»™ng dá»©t khoÃ¡t, gáº·p sao Tham Lang dá»… báº¡o phÃ¡t giÃ u sang nhanh chÃ³ng.",
  "Linh Tinh": "Ã chÃ­ bá»n bá»‰, tÃ­nh toÃ¡n sÃ¢u sáº¯c, ná»™i tÃ¢m máº¡nh máº½, giáº£i quyáº¿t cÃ´ng viá»‡c Ã¢m tháº§m nhÆ°ng dá»©t Ä‘iá»ƒm.",
  "Äá»‹a KhÃ´ng": "TÆ° duy khÃ¡c biá»‡t, vÆ°á»£t ra ngoÃ i khuÃ´n khá»• thÃ´ng thÆ°á»ng, cÃ³ nÄƒng lá»±c sÃ¡ng táº¡o Ä‘á»™t phÃ¡, há»£p vá»›i triáº¿t há»c, huyá»n há»c.",
  "Äá»‹a Kiáº¿p": "DÃ¡m cháº¥p nháº­n rá»§i ro, khÃ´ng theo lá»‘i mÃ²n, náº¿u gáº·p váº­n tá»‘t sáº½ cÃ³ nhá»¯ng bÆ°á»›c nháº£y vá»t ngoáº¡n má»¥c trong Ä‘á»i.",
  "HÃ³a Lá»™c": "Gia tÄƒng tÃ i lá»™c, sá»± may máº¯n, cuá»™c sá»‘ng sung tÃºc, duyÃªn Äƒn nÃ³i vÃ  thu hÃºt cá»§a cáº£i dá»“i dÃ o.",
  "HÃ³a Quyá»n": "Gia tÄƒng uy quyá»n, nÄƒng lá»±c quáº£n lÃ½ chá»‰ huy, tÃ­nh quyáº¿t Ä‘oÃ¡n vÃ  sá»©c áº£nh hÆ°á»Ÿng tá»›i táº­p thá»ƒ.",
  "HÃ³a Khoa": "Chá»§ vá» há»c váº¥n danh tiáº¿ng, báº±ng cáº¥p váº» vang, giáº£i trá»« tai Ã¡ch, gáº·p khÃ³ khÄƒn luÃ´n cÃ³ ngÆ°á»i chá»‰ Ä‘Æ°á»ng.",
  "HÃ³a Ká»µ": "Chá»§ vá» tráº¯c trá»Ÿ, thá»‹ phi nghi ngáº¡i; lÃ  bÃ i há»c thá»­ thÃ¡ch sá»± nháº«n náº¡i vÃ  tÃ´i luyá»‡n báº£n lÄ©nh vá»¯ng vÃ ng."
};

var DICT_CUNG = {
  "Má»‡nh": "Cung cá»‘t lÃµi nháº¥t cá»§a lÃ¡ sá»‘, quyáº¿t Ä‘á»‹nh tÃ­nh cÃ¡ch, cá»‘t cÃ¡ch, diá»‡n máº¡o, xu hÆ°á»›ng phÃ¡t triá»ƒn vÃ  báº£n lÄ©nh cuá»™c Ä‘á»i.",
  "ThÃ¢n": "Äáº¡i diá»‡n cho ná»­a sau cuá»™c Ä‘á»i (tá»« tuá»•i 30 trá»Ÿ Ä‘i) vÃ  hÃ nh Ä‘á»™ng thá»±c táº¿, phÆ°Æ¡ng hÆ°á»›ng ná»— lá»±c cá»§a Ä‘Æ°Æ¡ng sá»‘.",
  "Phá»¥ Máº«u": "Má»‘i quan há»‡ vá»›i cha máº¹, ná»n táº£ng gia Ä‘Ã¬nh, sá»± nÃ¢ng Ä‘á»¡ vÃ  phÃºc Ä‘á»©c Ä‘Æ°á»£c thá»«a hÆ°á»Ÿng tá»« Ä‘áº¥ng sinh thÃ nh.",
  "PhÃºc Äá»©c": "Äá»i sá»‘ng tinh tháº§n, phÃºc pháº­n tá»• tiÃªn dÃ²ng há», tuá»•i thá» vÃ  sá»± bÃ¬nh an trong tÃ¢m há»“n cá»§a báº¡n.",
  "Äiá»n Tráº¡ch": "NhÃ  cá»­a, Ä‘áº¥t Ä‘ai, báº¥t Ä‘á»™ng sáº£n, mÃ´i trÆ°á»ng sá»‘ng vÃ  kháº£ nÄƒng tÃ­ch lÅ©y tÃ i sáº£n cá»‘ Ä‘á»‹nh.",
  "Quan Lá»™c": "Con Ä‘Æ°á»ng há»c váº¥n, sá»± nghiá»‡p cÃ´ng danh, cÃ´ng viá»‡c chuyÃªn mÃ´n vÃ  cÆ¡ há»™i thÄƒng tiáº¿n trÃªn thÆ°Æ¡ng trÆ°á»ng.",
  "NÃ´ Bá»™c": "Má»‘i quan há»‡ vá»›i báº¡n bÃ¨, Ä‘á»“ng nghiá»‡p, Ä‘á»‘i tÃ¡c lÃ m Äƒn vÃ  cáº¥p dÆ°á»›i trung thÃ nh.",
  "ThiÃªn Di": "CÃ¡c má»‘i quan há»‡ xÃ£ há»™i bÃªn ngoÃ i, mÃ´i trÆ°á»ng khi Ä‘i xa, xuáº¥t ngoáº¡i vÃ  hÃ¬nh áº£nh cá»§a báº¡n trÆ°á»›c cÃ´ng chÃºng.",
  "Táº­t Ãch": "TÃ¬nh tráº¡ng sá»©c khá»e, thá»ƒ cháº¥t, cÃ¡c bá»‡nh lÃ½ tiá»m áº©n cáº§n phÃ²ng ngá»«a vÃ  kháº£ nÄƒng vÆ°á»£t qua tai Ã¡ch.",
  "TÃ i Báº¡ch": "DÃ²ng tiá»n, phÆ°Æ¡ng thá»©c kiáº¿m tiá»n, thÃ³i quen quáº£n lÃ½ tÃ i chÃ­nh vÃ  tiá»m nÄƒng giÃ u sang cá»§a Ä‘Æ°Æ¡ng sá»‘.",
  "Tá»­ Ná»¯": "Con cÃ¡i, má»‘i quan há»‡ tháº¿ há»‡ káº¿ cáº­n, triá»ƒn vá»ng thÃ nh Ä‘áº¡t vÃ  sá»± hiáº¿u tháº£o cá»§a con cÃ¡i sau nÃ y.",
  "Phu ThÃª": "HÃ´n nhÃ¢n, tÃ­nh cÃ¡ch báº¡n Ä‘á»i, má»©c Ä‘á»™ hÃ²a há»£p trong tÃ¬nh cáº£m vÃ  duyÃªn pháº­n lá»©a Ä‘Ã´i.",
  "Huynh Äá»‡": "Anh chá»‹ em ruá»™t thá»‹t, má»©c Ä‘á»™ gáº¯n bÃ³ tÃ¬nh cáº£m vÃ  sá»± tÆ°Æ¡ng trá»£ giÃºp Ä‘á»¡ nhau trong gia Ä‘Ã¬nh."
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DICT_SAO, DICT_PHU_TINH, DICT_CUNG };
} else {
  window.DICT_SAO = DICT_SAO;
  window.DICT_PHU_TINH = DICT_PHU_TINH;
  window.DICT_CUNG = DICT_CUNG;
}

