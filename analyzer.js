/**
 * Module phân tích & luận giải Tử Vi chuyên sâu
 */

function analyzeAstrolabe(astrolabe) {
  var result = {
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
  astrolabe.palaces.forEach(function(palace) {
    var palaceName = palace.name;
    var branch = palace.earthlyBranch;
    var stem = palace.heavenlyStem;
    
    // Tên cung chuẩn để tra từ điển
    var basePalaceKey = "Mệnh";
    var cungKeys = Object.keys(DICT_CUNG);
    for (var i = 0; i < cungKeys.length; i++) {
      if (palaceName.indexOf(cungKeys[i]) >= 0) {
        basePalaceKey = cungKeys[i];
        break;
      }
    }

    var majorStarNames = palace.majorStars.map(function(s) { return s.name; });
    var minorStarNames = palace.minorStars.map(function(s) { return s.name; });
    var adjectiveStarNames = palace.adjectiveStars ? palace.adjectiveStars.map(function(s) { return s.name; }) : [];

    // Luận giải các sao chính
    var majorExplanations = [];
    palace.majorStars.forEach(function(star) {
      var starInfo = DICT_SAO[star.name];
      if (starInfo) {
        var text = '• <b>' + star.name + '</b> (' + (star.brightness ? 'Độ sáng: ' + star.brightness + ' | ' : '') + 'Hành: ' + starInfo.nguHanh + '): ' + starInfo.tongQuan;
        if (starInfo.yNghiaCung && starInfo.yNghiaCung[basePalaceKey]) {
          text += ' <br>&nbsp;&nbsp;→ <i>Tại cung ' + palaceName + ':</i> ' + starInfo.yNghiaCung[basePalaceKey];
        }
        if (star.mutagen) {
          text += ' <br>&nbsp;&nbsp;→ <b>Hóa tinh:</b> Đắc <b>Hóa ' + star.mutagen + '</b> (' + (DICT_PHU_TINH['Hóa ' + star.mutagen] || '') + ')';
        }
        majorExplanations.push(text);
      } else {
        majorExplanations.push('• <b>' + star.name + '</b>: ' + (star.brightness ? 'Độ sáng: ' + star.brightness : ''));
      }
    });

    // Luận giải các phụ tinh trợ tinh đắc lực
    var minorExplanations = [];
    palace.minorStars.forEach(function(star) {
      var expl = DICT_PHU_TINH[star.name];
      if (expl) {
        minorExplanations.push('• <b>' + star.name + '</b> (' + (star.brightness ? star.brightness + ' - ' : '') + expl + ')');
      } else {
        minorExplanations.push('• ' + star.name + (star.brightness ? ' (' + star.brightness + ')' : ''));
      }
    });

    // Nhận định chung cho cung
    var summary = 'Cung ' + palaceName + ' tọa lạc tại chi ' + branch + ', can ' + stem + '.';
    if (majorStarNames.length === 0) {
      summary += ' Cung này <b>Vô Chính Diệu</b> (không có chính tinh tọa thủ). Đương số cần mượn ánh sáng và lực tác động từ chính tinh của cung xung chiếu để luận giải, cuộc đời có tính thích ứng và xoay chuyển linh hoạt.';
    } else {
      summary += ' Được hội tụ bởi các chủ tinh uy lực: <b>' + majorStarNames.join(', ') + '</b>.';
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
