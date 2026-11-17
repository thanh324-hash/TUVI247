/**
 * Module phân tích & luận giải Tử Vi chuyên sâu
 */
// Hỗ trợ cả Node.js lẫn Trình duyệt (Browser)
var dictModule;
if (typeof require !== 'undefined') {
  dictModule = require('./dict.js');
} else {
  dictModule = {
    DICT_SAO: window.DICT_SAO,
    DICT_PHU_TINH: window.DICT_PHU_TINH,
    DICT_CUNG: window.DICT_CUNG
  };
}
var DICT_SAO = dictModule.DICT_SAO;
var DICT_PHU_TINH = dictModule.DICT_PHU_TINH;
var DICT_CUNG = dictModule.DICT_CUNG;

function analyzeAstrolabe(astrolabe) {
  const result = {
    overview: {},
    palaces: [],
    details: [],
    advice: []
  };

  // Tổng quan bản mệnh
  result.overview = {
    solarDate: astrolabe.solarDate,
    lunarDate: astrolabe.lunarDate,
    chineseDate: astrolabe.chineseDate,
    time: astrolabe.time,
    timeRange: astrolabe.timeRange,
    gender: (astrolabe.gender === '男' || astrolabe.gender === 'male' || astrolabe.gender === 'Nam') ? 'Nam Mệnh' : 'Nữ Mệnh',
    sign: astrolabe.sign,
    zodiac: astrolabe.zodiac,
    fiveElementsClass: astrolabe.fiveElementsClass,
    soul: astrolabe.soul,
    body: astrolabe.body,
    earthlyBranchOfSoulPalace: astrolabe.earthlyBranchOfSoulPalace,
    earthlyBranchOfBodyPalace: astrolabe.earthlyBranchOfBodyPalace
  };

  // Luận giải chi tiết từng cung
  astrolabe.palaces.forEach((palace) => {
    const palaceName = palace.name;
    const branch = palace.earthlyBranch;
    const stem = palace.heavenlyStem;
    
    // Tên cung chuẩn để tra từ điển
    let basePalaceKey = "Mệnh";
    for (const key of Object.keys(DICT_CUNG)) {
      if (palaceName.includes(key)) {
        basePalaceKey = key;
        break;
      }
    }

    const majorStarNames = palace.majorStars.map(s => s.name);
    const minorStarNames = palace.minorStars.map(s => s.name);
    const adjectiveStarNames = palace.adjectiveStars ? palace.adjectiveStars.map(s => s.name) : [];
    const mutagens = palace.mutagens || [];

    // Luận giải các sao chính
    const majorExplanations = [];
    palace.majorStars.forEach(star => {
      const starInfo = DICT_SAO[star.name];
      if (starInfo) {
        let text = `• <b>${star.name}</b> (${star.brightness ? 'Độ sáng: ' + star.brightness + ' | ' : ''}Hành: ${starInfo.nguHanh}): ${starInfo.tongQuan}`;
        if (starInfo.yNghiaCung[basePalaceKey]) {
          text += ` <br>&nbsp;&nbsp;→ <i>Tại cung ${palaceName}:</i> ${starInfo.yNghiaCung[basePalaceKey]}`;
        }
        if (star.mutagen) {
          text += ` <br>&nbsp;&nbsp;→ <b>Hóa tinh:</b> Đắc <b>Hóa ${star.mutagen}</b> (${DICT_PHU_TINH['Hóa ' + star.mutagen] || ''})`;
        }
        majorExplanations.push(text);
      } else {
        majorExplanations.push(`• <b>${star.name}</b>: ${star.brightness ? 'Độ sáng: ' + star.brightness : ''}`);
      }
    });

    // Luận giải các phụ tinh trợ tinh đắc lực
    const minorExplanations = [];
    palace.minorStars.forEach(star => {
      const expl = DICT_PHU_TINH[star.name];
      if (expl) {
        minorExplanations.push(`• <b>${star.name}</b> (${star.brightness ? star.brightness + ' - ' : ''}${expl})`);
      } else {
        minorExplanations.push(`• ${star.name}${star.brightness ? ' (' + star.brightness + ')' : ''}`);
      }
    });

    // Nhận định chung cho cung
    let summary = `Cung ${palaceName} tọa lạc tại chi ${branch}, can ${stem}.`;
    if (majorStarNames.length === 0) {
      summary += ` Cung này <b>Vô Chính Diệu</b> (không có chính tinh tọa thủ). Đương số cần mượn ánh sáng và lực tác động từ chính tinh của cung xung chiếu để luận giải, cuộc đời có tính thích ứng và xoay chuyển linh hoạt.`;
    } else {
      summary += ` Được hội tụ bởi các chủ tinh uy lực: <b>${majorStarNames.join(', ')}</b>.`;
    }

    result.palaces.push({
      name: palaceName,
      branch: branch,
      stem: stem,
      majorStars: palace.majorStars,
      minorStars: palace.minorStars,
      adjectiveStars: adjectiveStarNames,
      changsheng12: palace.changsheng12,
      boshi12: palace.boshi12,
      decadal: palace.decadal,
      summary: summary,
      meaning: DICT_CUNG[basePalaceKey] || "",
      majorExplanations: majorExplanations,
      minorExplanations: minorExplanations
    });
  });

  return result;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { analyzeAstrolabe };
} else {
  window.analyzeAstrolabe = analyzeAstrolabe;
}
