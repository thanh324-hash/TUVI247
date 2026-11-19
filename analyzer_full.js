// TUVI247 - BỘ PHÂN TÍCH TOÀN DIỆN TẬN DỤNG TẤT CẢ TÍNH NĂNG IZTRO
// Chuẩn hóa UTF-8, hỗ trợ Tam Hợp - Tứ Chính, Vận Hạn (Đại Hạn, Lưu Niên, Tiểu Hạn)

function analyzeAstrolabeFull(astrolabe, selectedYear) {
  var dataRef = window.TUVI_DATA || {};
  var majorDict = dataRef.majorStars || {};
  var minorDict = dataRef.minorStars || {};
  var palaceDict = dataRef.palaces || {};

  var result = {
    overview: {},
    palaces: [],
    threeHarmonies: {},
    horoscope: null
  };

  // 1. Phân tích Tổng quan Bản Mệnh & Bát Tự
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

  // 2. Tính toán Vận Hạn (Horoscope) theo năm xem (Lưu Niên & Tiểu Hạn)
  var targetYearDate = selectedYear ? (selectedYear + '-06-15') : new Date().toISOString().slice(0, 10);
  try {
    if (typeof astrolabe.horoscope === 'function') {
      var hScope = astrolabe.horoscope(targetYearDate);
      result.horoscope = {
        targetDate: targetYearDate,
        targetYear: selectedYear || new Date().getFullYear(),
        nominalAge: hScope.age ? hScope.age.nominalAge : null,
        agePalaceBranch: hScope.age ? hScope.age.earthlyBranch : '',
        decadalName: hScope.decadal ? (hScope.decadal.heavenlyStem + ' ' + hScope.decadal.earthlyBranch) : '',
        decadalMutagens: hScope.decadal ? (hScope.decadal.mutagen || []) : [],
        yearlyName: hScope.yearly ? (hScope.yearly.heavenlyStem + ' ' + hScope.yearly.earthlyBranch) : '',
        yearlyMutagens: hScope.yearly ? (hScope.yearly.mutagen || []) : [],
        yearlyStars: hScope.yearly ? hScope.yearly.stars : []
      };
    }
  } catch (err) {
    console.warn("Horoscope error:", err);
  }

  // 3. Phân tích Tam Hợp & Tứ Chính của Cung Mệnh (Mệnh - Quan - Tài - Di)
  try {
    if (typeof astrolabe.surroundedPalaces === 'function') {
      var sur = astrolabe.surroundedPalaces('Mệnh');
      if (sur) {
        result.threeHarmonies = {
          target: sur.target ? sur.target.name + ' (' + sur.target.earthlyBranch + ')' : '',
          opposite: sur.opposite ? sur.opposite.name + ' (' + sur.opposite.earthlyBranch + ')' : '',
          wealth: sur.wealth ? sur.wealth.name + ' (' + sur.wealth.earthlyBranch + ')' : '',
          career: sur.career ? sur.career.name + ' (' + sur.career.earthlyBranch + ')' : ''
        };
      }
    }
  } catch (e) {
    console.warn("Surrounded error:", e);
  }

  // 4. Phân tích chi tiết 12 Cung Địa Bàn
  astrolabe.palaces.forEach(function(palace) {
    var palaceName = palace.name;
    var branch = palace.earthlyBranch;
    var stem = palace.heavenlyStem;

    // Tìm tên chuẩn cung để tra cứu từ điển
    var basePalaceKey = "Mệnh";
    var cungKeys = Object.keys(palaceDict);
    for (var i = 0; i < cungKeys.length; i++) {
      if (palaceName.indexOf(cungKeys[i]) >= 0) {
        basePalaceKey = cungKeys[i];
        break;
      }
    }

    var majorStarNames = palace.majorStars.map(function(s) { return s.name; });
    var minorStarNames = palace.minorStars.map(function(s) { return s.name; });
    var adjectiveStarNames = palace.adjectiveStars ? palace.adjectiveStars.map(function(s) { return s.name; }) : [];

    // Luận giải các Chính Tinh
    var majorExplanations = [];
    palace.majorStars.forEach(function(star) {
      var starInfo = majorDict[star.name];
      if (starInfo) {
        var text = '• <b>' + star.name + '</b> (' + (star.brightness ? 'Độ sáng: <span class="tag-bright">' + star.brightness + '</span> | ' : '') + 'Ngũ hành: ' + starInfo.element + '): ' + starInfo.nature;
        if (starInfo.atPalaces && starInfo.atPalaces[basePalaceKey]) {
          text += '<br>&nbsp;&nbsp;→ <i>Tại cung ' + palaceName + ':</i> ' + starInfo.atPalaces[basePalaceKey];
        }
        if (star.mutagen) {
          text += '<br>&nbsp;&nbsp;→ <b style="color:#d35400;">Hóa Tinh:</b> Đắc <b>Hóa ' + star.mutagen + '</b> (' + (minorDict['Hóa ' + star.mutagen] || '') + ')';
        }
        majorExplanations.push(text);
      } else {
        var t = '• <b>' + star.name + '</b>: ' + (star.brightness ? 'Độ sáng ' + star.brightness : '');
        if (star.mutagen) t += ' (Hóa ' + star.mutagen + ')';
        majorExplanations.push(t);
      }
    });

    // Luận giải các Phụ Tinh, Trợ Tinh & Sát Tinh
    var minorExplanations = [];
    palace.minorStars.forEach(function(star) {
      var expl = minorDict[star.name];
      if (expl) {
        minorExplanations.push('• <b>' + star.name + '</b>' + (star.brightness ? ' (' + star.brightness + ')' : '') + ': ' + expl);
      } else {
        minorExplanations.push('• <b>' + star.name + '</b>' + (star.brightness ? ' (' + star.brightness + ')' : ''));
      }
    });

    // Nhận định chung cho cung
    var summary = 'Cung ' + palaceName + ' an tại chi <b>' + branch + '</b>, thiên can <b>' + stem + '</b>.';
    if (majorStarNames.length === 0) {
      summary += ' Cung này là <b>Vô Chính Diệu</b> (không có chính tinh tọa thủ trực tiếp). Cần mượn ánh sáng và năng lượng của chính tinh tại cung xung chiếu đối diện để luận giải; đương số có tính thích ứng môi trường rất nhanh, linh hoạt trong biến chuyển.';
    } else {
      summary += ' Hội tụ các sao chủ lực: <b style="color:#8b1d1d;">' + majorStarNames.join(', ') + '</b>.';
    }

    result.palaces.push({
      name: palaceName,
      branch: branch,
      stem: stem,
      isBodyPalace: palace.isBodyPalace,
      isOriginalPalace: palace.isOriginalPalace,
      majorStars: palace.majorStars,
      minorStars: palace.minorStars,
      adjectiveStars: adjectiveStarNames,
      changsheng12: palace.changsheng12,
      boshi12: palace.boshi12,
      decadal: palace.decadal,
      summary: summary,
      meaning: palaceDict[basePalaceKey] || "",
      majorExplanations: majorExplanations,
      minorExplanations: minorExplanations
    });
  });

  return result;
}

window.analyzeAstrolabeFull = analyzeAstrolabeFull;
