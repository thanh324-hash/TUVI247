/**
 * Cơ sở dữ liệu luận giải Tử Vi Đẩu Số Việt Hóa chi tiết
 */

var DICT_SAO = {
  "Tử Vi": {
    nguHanh: "Thổ (Âm Thổ)",
    loai: "Đế Tinh - Nam Bắc Đẩu Tinh",
    tongQuan: "Tử Vi là ngôi sao Chí Tôn, chủ về cung Quan Lộc và Phúc Thọ. Tượng trưng cho bậc quân vương, người có khí chất cao quý, trọng danh dự, có năng lực lãnh đạo, tính tình trầm tĩnh, cương trực nhưng đôi khi tự ái cao.",
    dacTinh: "Khí chất tôn quý, có năng lực quản lý và bao quát công việc, giàu lòng tự trọng. Cần có Tả Phù - Hữu Bật trợ lực (quân thần khánh hội) mới phát huy tối đa quyền uy.",
    yNghiaCung: {
      "Mệnh": "Tướng mạo uy nghi, đôn hậu, có tài lãnh đạo và tổ chức. Thích tự lập, được nhiều người kính trọng và tín nhiệm. Thường nắm giữ vị trí quản lý hoặc có tầm ảnh hưởng trong tập thể.",
      "Thân": "Hậu vận vững vàng, cuộc sống vương giả, uy danh tăng tiến, có chỗ đứng cao trong xã hội.",
      "Quan Lộc": "Sự nghiệp rất hanh thông, thích hợp làm lãnh đạo, quản lý cấp cao, công chức nhà nước hoặc doanh nghiệp tự chủ.",
      "Tài Bạch": "Tài chính dồi dào, tiền bạc hanh thông, biết cách tích lũy và điều tiết dòng tiền, ít khi thiếu thốn.",
      "Thiên Di": "Ra ngoài được quý nhân nâng đỡ, giao thiệp rộng với tầng lớp thượng lưu, dễ thành danh nơi xa xứ.",
      "Phu Thê": "Bạn đời có khí chất cao quý, gia thế tốt, đoan chính và là chỗ dựa vững vàng cho đương số.",
      "Phúc Đức": "Được hưởng phúc tổ tiên, dòng họ danh giá hưng vượng, tâm hồn an lạc, sống thọ.",
      "Điền Trạch": "Nhà cửa bề thế khang trang, đất đai gia tăng theo thời gian, có bất động sản giá trị.",
      "Huynh Đệ": "Anh chị em hòa thuận, có người thành đạt danh giá, tương trợ lẫn nhau khi cần.",
      "Tử Nữ": "Con cái thông minh tuấn tú, có chí lớn, hiếu thảo và rạng danh gia đạo.",
      "Nô Bộc": "Bạn bè đồng nghiệp trung thành, cấp dưới đắc lực, được mọi người kính trọng.",
      "Tật Ách": "Ít khi mắc bệnh hiểm nghèo, chú ý các bệnh liên quan đến hệ tiêu hóa, dạ dày, tỳ vị."
    }
  },
  "Thiên Cơ": {
    nguHanh: "Mộc (Âm Mộc)",
    loai: "Thiện Tinh, Trí Tinh - Nam Đẩu Tinh",
    tongQuan: "Thiên Cơ chủ về mưu trí, tư duy chiến lược, cơ mưu ứng biến. Tượng trưng cho bậc quân sư, trí thức, nhà nghiên cứu hoặc cố vấn sắc sảo.",
    dacTinh: "Thích học hỏi, linh hoạt, khéo léo trong tính toán, suy nghĩ thấu đáo. Nhược điểm là đôi khi nghĩ quá nhiều dẫn đến lo âu, tâm thần bất an.",
    yNghiaCung: {
      "Mệnh": "Người thông minh nhanh nhạy, phản ứng sắc bén, thích nghi tốt với mọi môi trường, có duyên với công nghệ, kỹ thuật, học thuật, cố vấn.",
      "Quan Lộc": "Rất hợp làm tham mưu, kế hoạch, IT, phân tích dữ liệu, nghiên cứu học thuật hoặc các ngành nghề dịch vụ trí tuệ.",
      "Tài Bạch": "Tiền tài kiếm bằng trí óc, linh hoạt đa dạng nguồn thu, giỏi đầu tư xoay vòng.",
      "Thiên Di": "Ra ngoài nhanh nhẹn, hay đi lại, năng động, thích hợp đi làm việc lưu động hoặc công tác xa.",
      "Phu Thê": "Bạn đời thông minh, khéo ăn nói, tính tình hoạt bát, đôi khi hơi nhạy cảm hoặc hay lo xa.",
      "Tật Ách": "Cần chú ý hệ thần kinh, mất ngủ, căng thẳng đầu óc, các bệnh liên quan đến gan mật và tứ chi."
    }
  },
  "Thái Dương": {
    nguHanh: "Hỏa (Dương Hỏa)",
    loai: "Quý Tinh, Quang Minh Tinh - Nam Đẩu Tinh",
    tongQuan: "Thái Dương là vầng mặt trời rực rỡ, chủ về sự quang minh chính đại, hào sảng, uy danh, danh tiếng và sự nghiệp cộng đồng.",
    dacTinh: "Nhiệt tình, trượng nghĩa, thích giúp đỡ người khác, thẳng thắn, có chí hướng lớn. Rất sợ rơi vào cung hãm địa (buổi tối) sẽ giảm bớt ánh quang minh.",
    yNghiaCung: {
      "Mệnh": "Tính tình phóng khoáng, thích làm việc lớn, trọng thể diện, có uy tín và sức lan tỏa mạnh mẽ trong xã hội.",
      "Quan Lộc": "Danh vọng lẫy lừng, thích hợp với các ngành truyền thông, chính trị, luật pháp, giáo dục hoặc hoạt động công ích.",
      "Tài Bạch": "Tiền tài đến từ danh tiếng, kiếm tiền đường đường chính chính, tiêu xài rộng rãi, hào phóng.",
      "Phu Thê": "Nam mệnh lấy được vợ hiền đảm đang; Nữ mệnh lấy được chồng có danh tiếng, chí lớn nhưng tính cách mạnh mẽ.",
      "Tật Ách": "Cần chú ý đến mắt (thị lực), tim mạch, huyết áp và các chứng đau đầu do nhiệt."
    }
  },
  "Vũ Khúc": {
    nguHanh: "Kim (Âm Kim)",
    loai: "Tài Tinh, Dũng Tinh - Bắc Đẩu Tinh",
    tongQuan: "Vũ Khúc là đệ nhất Tài Tinh trong Tử Vi, chủ về tiền tài, tài chính, ngân hàng, thương mại và năng lực hành động quyết đoán.",
    dacTinh: "Tính tình cương nghị, nói ít làm nhiều, kiên trì nhẫn nại, có đầu óc tính toán tài chính xuất sắc, thực tế và quyết đoán.",
    yNghiaCung: {
      "Mệnh": "Khuôn mặt chữ điền, giọng nói dứt khoát, ý chí kiên định, có tài quản lý tài chính bẩm sinh, lập nghiệp từ sớm.",
      "Quan Lộc": "Rất hợp làm việc trong lĩnh vực tài chính ngân hàng, kiểm toán, kinh doanh, chứng khoán, cơ khí quân sự.",
      "Tài Bạch": "Cực tốt, cung Tài Bạch có Vũ Khúc chủ về tích lũy lớn, có tài sinh sôi của cải, hậu vận phú quý sung túc.",
      "Phu Thê": "Tình cảm cần sự thấu hiểu vì tính cách hai bên đều mạnh mẽ, nếu lấy muộn sẽ bền chặt hơn.",
      "Tật Ách": "Chú ý hệ hô hấp, phổi, phế quản và các chấn thương kim khí va chạm."
    }
  },
  "Thiên Đồng": {
    nguHanh: "Thủy (Dương Thủy)",
    loai: "Phúc Tinh - Nam Đẩu Tinh",
    tongQuan: "Thiên Đồng chủ về sự hòa nhã, phúc thọ, tâm tính thiện lương như trẻ thơ, dễ gần, có khiếu nghệ thuật và hưởng thụ ẩm thực.",
    dacTinh: "Hiền lành, không thích tranh chấp, tâm hồn lạc quan vui vẻ, có phước đức giải nguy tiêu tai.",
    yNghiaCung: {
      "Mệnh": "Gương mặt phúc hậu trẻ lâu, tính tình vui vẻ hòa đồng, thích cuộc sống an nhàn tự tại, ít khi mưu cầu danh lợi khắc nghiệt.",
      "Phúc Đức": "Được hưởng phúc trọn vẹn, tổ tiên che chở, cuộc đời gặp hung hóa cát, tâm tính thanh thản.",
      "Quan Lộc": "Thích hợp các ngành nghề văn hóa, ẩm thực, du lịch, nghệ thuật hoặc dịch vụ chăm sóc.",
      "Tài Bạch": "Tiền bạc đủ dùng, không quá áp lực kiếm tiền, có lộc bất ngờ và vận may mắn.",
      "Tật Ách": "Cần lưu ý hệ bài tiết, bàng quang, thận và hệ tiêu hóa do thói quen ăn uống tự do."
    }
  },
  "Liêm Trinh": {
    nguHanh: "Hỏa (Âm Hỏa) đới Mộc",
    loai: "Tù Tinh, Thứ Đào Hoa - Bắc Đẩu Tinh",
    tongQuan: "Liêm Trinh là ngôi sao vừa có tính kỷ luật, tự chủ cao (quan lộc), vừa có nét quyến rũ đào hoa, phong lưu nghệ thuật.",
    dacTinh: "Cá tính độc lập, thích tự do, lòng tự trọng cực lớn, có sức hấp dẫn đặc biệt với người khác phái, nguyên tắc rõ ràng.",
    yNghiaCung: {
      "Mệnh": "Khí chất thu hút, tính cách mạnh mẽ, cương nghị, có đam mê mãnh liệt, trọng nghĩa khí nhưng đôi khi nóng nảy.",
      "Quan Lộc": "Phát huy sở trường trong pháp luật, kỹ thuật, điện tử, thiết kế, công nghệ thông tin hoặc nghệ thuật sáng tạo.",
      "Tài Bạch": "Kiếm tiền từ tài năng cạnh tranh, dám nghĩ dám làm, cần cẩn trọng tránh tranh chấp thị phi tài chính.",
      "Phu Thê": "Tình cảm mãnh liệt, lãng mạn nhưng dễ nảy sinh ghen tuông hoặc tranh luận do cả hai đều cá tính mạnh.",
      "Tật Ách": "Chú ý tim mạch, các bệnh về máu, da liễu hoặc dị ứng."
    }
  },
  "Thiên Phủ": {
    nguHanh: "Thổ (Dương Thổ)",
    loai: "Lệnh Tinh, Tài Khố - Nam Đẩu Tinh",
    tongQuan: "Thiên Phủ là kho trời (Tài khố), đối trọng với Tử Vi. Chủ về sự giữ gìn tài sản, quản lý tích lũy, uy nghi trầm tĩnh và sự ổn định bền vững.",
    dacTinh: "Bao dung, cẩn trọng, tính toán an toàn, biết hưởng thụ, có tài giữ của và quản trị tổ chức quy mô lớn.",
    yNghiaCung: {
      "Mệnh": "Khuôn mặt đầy đặn sang trọng, cốt cách thanh tao, tính tình đôn hậu, sống chu đáo và kín đáo, biết nhìn xa trông rộng.",
      "Tài Bạch": "Đắc cách tuyệt hảo! Kho tiền đầy ắp, có khả năng tích lũy tài sản khổng lồ, quản lý rủi ro tuyệt vời.",
      "Điền Trạch": "Nhiều nhà cửa đất đai, thừa kế hoặc tự mua sắm bất động sản vững chắc.",
      "Quan Lộc": "Vị trí quản trị tài chính, hành chính, thủ kho, ngân hàng, điều hành doanh nghiệp lớn.",
      "Tật Ách": "Sức khỏe dẻo dai, chú ý bệnh dạ dày, tiêu hóa hoặc thừa cân béo phì khi có tuổi."
    }
  },
  "Thái Âm": {
    nguHanh: "Thủy (Âm Thủy)",
    loai: "Phú Tinh, Điền Trạch Tinh - Bắc Đẩu Tinh",
    tongQuan: "Thái Âm là vầng trăng hiền dịu, chủ về mẹ, vợ, con gái; chủ về phú quý, bất động sản, sự tinh tế, nội tâm sâu sắc và óc thẩm mỹ.",
    dacTinh: "Trầm tĩnh, dịu dàng, lãng mạn, chu đáo, rất có duyên với tích lũy nhà đất và làm đẹp, nghệ thuật.",
    yNghiaCung: {
      "Mệnh": "Ngoại hình thanh tú, mắt sáng dịu hiền, tính cách tinh tế nội tâm, thích văn hóa nghệ thuật và có trực giác nhạy bén.",
      "Điền Trạch": "Rất vượng về nhà đất, dễ có nhiều tài sản bất động sản, nơi ở yên tĩnh đẹp đẽ.",
      "Tài Bạch": "Tiền tài ổn định, vào đều đặn như chu kỳ trăng tròn trăng khuyết, giỏi tích cóp không hoang phí.",
      "Phu Thê": "Nam mệnh lấy được vợ hiền thục xinh đẹp, gia đình êm ấm; Nữ mệnh tình cảm sâu sắc, chăm sóc gia đình chu toàn.",
      "Tật Ách": "Lưu ý bệnh về mắt, hệ tuần hoàn dịch thể, thận, kinh nguyệt phụ khoa đối với nữ giới."
    }
  },
  "Tham Lang": {
    nguHanh: "Mộc (Dương Mộc) đới Thủy",
    loai: "Chính Đào Hoa, Dục Vọng Tinh - Bắc Đẩu Tinh",
    tongQuan: "Tham Lang là ngôi sao của sự giao tiếp, hấp dẫn, đa tài đa nghệ, tham vọng tiến thủ và hưởng thụ thế gian.",
    dacTinh: "Thông minh, khéo léo trong quan hệ xã hội, thích cái đẹp, đam mê học hỏi nhiều lĩnh vực từ kinh doanh đến huyền học tâm linh.",
    yNghiaCung: {
      "Mệnh": "Hấp dẫn, giỏi xã giao, nhiều tài lẻ, thích khám phá cái mới, nếu gặp Hỏa Tinh hoặc Linh Tinh tạo thành cách 'Hỏa Tham / Linh Tham' bạo phát bất ngờ.",
      "Tài Bạch": "Kiếm tiền qua giao dịch, ngoại giao, đầu tư táo bạo, buôn bán lớn hoặc ngành nghề giải trí nghệ thuật.",
      "Quan Lộc": "Thích hợp làm kinh doanh, đối ngoại, du lịch, giải trí, nhà hàng ẩm thực, marketing.",
      "Phu Thê": "Đào hoa vượng, cần sự tin tưởng và thấu hiểu lẫn nhau để giữ lửa hạnh phúc lâu bền.",
      "Tật Ách": "Chú ý gan mật, hệ bài tiết, các vấn đề do sinh hoạt tiệc tùng quá độ."
    }
  },
  "Cự Môn": {
    nguHanh: "Thủy (Âm Thủy) đới Kim",
    loai: "Ám Tinh - Bắc Đẩu Tinh",
    tongQuan: "Cự Môn chủ về khẩu tài (lời ăn tiếng nói), hùng biện, tư duy phản biện, sự nghi vấn và nghiên cứu sâu sắc.",
    dacTinh: "Giỏi phân tích, nói năng sắc sảo, logic chặt chẽ, thích tìm tòi tận gốc rễ vấn đề. Nếu hãm địa dễ vướng khẩu thiệt thị phi.",
    yNghiaCung: {
      "Mệnh": "Khẩu tài xuất chúng, có tài thuyết phục, thích tranh biện làm rõ đúng sai, phù hợp ngành cần tiếng nói và lập luận.",
      "Quan Lộc": "Rất hợp làm luật sư, giảng viên, ngoại giao, truyền thông, thuyết trình viên, nhà báo hoặc chuyên gia tư vấn.",
      "Tài Bạch": "Kiếm tiền bằng lời nói, chuyên môn sâu hoặc trung gian môi giới.",
      "Nô Bộc / Huynh Đệ": "Cần chú ý cách ăn nói để tránh hiểu lầm, khẩu thiệt không đáng có với người xung quanh.",
      "Tật Ách": "Chú ý đường hô hấp, vòm họng, răng miệng, thanh quản và hệ tiêu hóa."
    }
  },
  "Thiên Tướng": {
    nguHanh: "Thủy (Dương Thủy)",
    loai: "Ấn Tinh - Nam Đẩu Tinh",
    tongQuan: "Thiên Tướng là con dấu quyền lực (Ấn Tinh), tướng phụ tá đắc lực cho Tử Vi. Chủ về sự chính trực, trượng nghĩa, chu toàn và hỗ trợ người khác.",
    dacTinh: "Ăn mặc trang nhã, lễ phép, giàu lòng trắc ẩn, giữ chữ tín hàng đầu, giỏi làm việc nhóm và trung thành.",
    yNghiaCung: {
      "Mệnh": "Tướng mạo đoan chính, lịch thiệp, tính tình ôn hòa chính trực, thích giúp đỡ kẻ yếu, được nhiều người nể phục.",
      "Quan Lộc": "Cánh tay phải đắc lực của lãnh đạo, chuyên viên cấp cao, làm quản lý điều hành hoặc văn phòng chỉ huy.",
      "Tài Bạch": "Tiền tài ổn định, minh bạch rõ ràng, được hưởng bổng lộc bền vững.",
      "Phu Thê": "Bạn đời có học thức, gia giáo, đoan trang, hỗ trợ đắc lực cho sự nghiệp của nhau.",
      "Tật Ách": "Chú ý bệnh da liễu, dị ứng thời tiết, bàng quang hoặc hệ tiết niệu."
    }
  },
  "Thiên Lương": {
    nguHanh: "Thổ (Dương Thổ)",
    loai: "Ấm Tinh, Thọ Tinh - Nam Đẩu Tinh",
    tongQuan: "Thiên Lương là ngôi sao của người lớn tuổi (Ấm Tinh), chủ về sự che chở, phúc thọ, nguyên tắc đạo đức, y thuật và giáo dục.",
    dacTinh: "Thích làm phúc, phong thái bậc tiền bối, tôn trọng truyền thống, có khả năng hóa hung thành cát khi gặp hoạn nạn.",
    yNghiaCung: {
      "Mệnh": "Chính trực, có lòng nhân ái bao la, thích giúp đỡ mọi người, phong thái nho nhã, có duyên với y học, giáo dục, tôn giáo.",
      "Phúc Đức": "Được tổ tiên ban phúc sâu dày, cả đời gặp hung hóa cát, thọ khang trường thọ.",
      "Quan Lộc": "Hợp nghề giáo viên, bác sĩ, dược sĩ, thanh tra, kiểm toán, luật sư hoặc hoạt động xã hội từ thiện.",
      "Phụ Mẫu": "Cha mẹ hiền từ đức độ, để lại phúc ấm lớn cho con cháu.",
      "Tật Ách": "Có sao Thiên Lương thì bệnh nặng hóa nhẹ, gặp thầy gặp thuốc cứu chữa kịp thời."
    }
  },
  "Thất Sát": {
    nguHanh: "Kim (Dương Kim) đới Hỏa",
    loai: "Tướng Tinh, Dũng Tinh - Nam Đẩu Tinh",
    tongQuan: "Thất Sát là viên đại tướng dũng mãnh trên sa trường, chủ về sự dũng cảm, quyết đoán, xung trận tiên phong, tính cách cương liệt.",
    dacTinh: "Dám nghĩ dám làm, không sợ gian nan trắc trở, có uy lực chỉ huy, sống độc lập và tự chủ tuyệt đối.",
    yNghiaCung: {
      "Mệnh": "Ánh mắt sáng cương nghị, phong thái mạnh mẽ, tính cách quyết liệt, thích thử thách mạo hiểm, vượt khó vươn lên thành công lớn.",
      "Quan Lộc": "Thích hợp môi trường quân sự, công an, cơ khí chế tạo, phẫu thuật ngoại khoa, doanh nhân khởi nghiệp quyết liệt.",
      "Tài Bạch": "Tiền tài đến từ sự phấn đấu không ngừng, dám đầu tư quy mô lớn, qua nhiều thăng trầm để đạt đỉnh cao phú quý.",
      "Phu Thê": "Tình duyên nên kết hôn muộn, vợ chồng tôn trọng cá tính riêng của nhau thì hôn nhân mới êm đẹp.",
      "Tật Ách": "Cần đề phòng các vết thương kim khí, chấn thương thể thao hoặc bệnh về xương khớp, hô hấp."
    }
  },
  "Phá Quân": {
    nguHanh: "Thủy (Âm Thủy)",
    loai: "Hao Tinh, Tiên Phong Tinh - Bắc Đẩu Tinh",
    tongQuan: "Phá Quân là dũng tướng phá địch, chủ về sự biến đổi, đổi mới sáng tạo, tiên phong mở đường (phá cũ lập mới).",
    dacTinh: "Táo bạo, ghét sự rập khuôn gò bó, ưa đổi mới, có năng lực khai phá thị trường mới hoặc công nghệ mới vượt bậc.",
    yNghiaCung: {
      "Mệnh": "Tính cách độc lập, phóng khoáng, thích thử thách, có sức bật tinh thần phi thường sau mỗi thất bại để vươn tới kỳ tích.",
      "Quan Lộc": "Phù hợp với công việc khai phá, dự án mới, nghiên cứu đổi mới công nghệ, kiến trúc xây dựng, kinh doanh mạo hiểm.",
      "Tài Bạch": "Tiền tài có tính biến động cao, dám đầu tư lớn, tiền vào nhanh và ra cũng nhanh, cần quản lý chi tiêu bài bản.",
      "Điền Trạch": "Thường tự tay gây dựng nhà cửa từ hai bàn tay trắng, ít khi giữ lại nhà đất thừa kế của tiền nhân.",
      "Tật Ách": "Đề phòng phẫu thuật, tai nạn xây dựng hoặc các vấn đề liên quan đến nha khoa, xương khớp."
    }
  }
};

var DICT_PHU_TINH = {
  "Tả Phù": "Quý nhân nâng đỡ từ bên ngoài, bạn bè đồng nghiệp tương trợ chí tình, gia tăng sức mạnh cho mệnh bàn.",
  "Hữu Bật": "Trợ thủ đắc lực, hậu phương vững chắc, nhân duyên tốt đẹp, mưu sự có người cùng chung tay giúp sức.",
  "Văn Xương": "Chủ về thi cử đỗ đạt, học hành xuất chúng, văn chương lỗi lạc, có tài hoa phong nhã và bằng cấp cao.",
  "Văn Khúc": "Chủ về nghệ thuật, tài năng ứng biến, khiếu thẩm mỹ, ăn nói lưu loát và tư duy sáng tạo nhạy bén.",
  "Thiên Khôi": "Đệ nhất quý nhân tinh, gặp người bề trên nâng đỡ, cấp trên trọng dụng, thi cử dễ đỗ thủ khoa đầu bảng.",
  "Thiên Việt": "Quý nhân ngầm giúp đỡ, cơ hội đến bất ngờ từ những người có uy tín, thuận lợi cho phát triển sự nghiệp.",
  "Lộc Tồn": "Lộc trời ban cho, chủ về tiền bạc dồi dào, tích lũy vững vàng, phong lưu phú quý cả đời.",
  "Kình Dương": "Tính cách cương trực quyết liệt, dũng cảm nhưng cần kiềm chế nóng vội; có lợi khi đi vào kỹ thuật, quân sự.",
  "Đà La": "Tính cách kiên trì nhẫn nại, làm việc cẩn trọng tỉ mỉ, hay suy nghĩ sâu xa, đề phòng do dự chần chừ mất cơ hội.",
  "Hỏa Tinh": "Nhiệt tình, phản ứng nhanh như chớp, hành động dứt khoát, gặp sao Tham Lang dễ bạo phát giàu sang nhanh chóng.",
  "Linh Tinh": "Ý chí bền bỉ, tính toán sâu sắc, nội tâm mạnh mẽ, giải quyết công việc âm thầm nhưng dứt điểm.",
  "Địa Không": "Tư duy khác biệt, vượt ra ngoài khuôn khổ thông thường, có năng lực sáng tạo đột phá, hợp với triết học, huyền học.",
  "Địa Kiếp": "Dám chấp nhận rủi ro, không theo lối mòn, nếu gặp vận tốt sẽ có những bước nhảy vọt ngoạn mục trong đời.",
  "Hóa Lộc": "Gia tăng tài lộc, sự may mắn, cuộc sống sung túc, duyên ăn nói và thu hút của cải dồi dào.",
  "Hóa Quyền": "Gia tăng uy quyền, năng lực quản lý chỉ huy, tính quyết đoán và sức ảnh hưởng tới tập thể.",
  "Hóa Khoa": "Chủ về học vấn danh tiếng, bằng cấp vẻ vang, giải trừ tai ách, gặp khó khăn luôn có người chỉ đường.",
  "Hóa Kỵ": "Chủ về trắc trở, thị phi nghi ngại; là bài học thử thách sự nhẫn nại và tôi luyện bản lĩnh vững vàng."
};

var DICT_CUNG = {
  "Mệnh": "Cung cốt lõi nhất của lá số, quyết định tính cách, cốt cách, diện mạo, xu hướng phát triển và bản lĩnh cuộc đời.",
  "Thân": "Đại diện cho nửa sau cuộc đời (từ tuổi 30 trở đi) và hành động thực tế, phương hướng nỗ lực của đương số.",
  "Phụ Mẫu": "Mối quan hệ với cha mẹ, nền tảng gia đình, sự nâng đỡ và phúc đức được thừa hưởng từ đấng sinh thành.",
  "Phúc Đức": "Đời sống tinh thần, phúc phận tổ tiên dòng họ, tuổi thọ và sự bình an trong tâm hồn của bạn.",
  "Điền Trạch": "Nhà cửa, đất đai, bất động sản, môi trường sống và khả năng tích lũy tài sản cố định.",
  "Quan Lộc": "Con đường học vấn, sự nghiệp công danh, công việc chuyên môn và cơ hội thăng tiến trên thương trường.",
  "Nô Bộc": "Mối quan hệ với bạn bè, đồng nghiệp, đối tác làm ăn và cấp dưới trung thành.",
  "Thiên Di": "Các mối quan hệ xã hội bên ngoài, môi trường khi đi xa, xuất ngoại và hình ảnh của bạn trước công chúng.",
  "Tật Ách": "Tình trạng sức khỏe, thể chất, các bệnh lý tiềm ẩn cần phòng ngừa và khả năng vượt qua tai ách.",
  "Tài Bạch": "Dòng tiền, phương thức kiếm tiền, thói quen quản lý tài chính và tiềm năng giàu sang của đương số.",
  "Tử Nữ": "Con cái, mối quan hệ thế hệ kế cận, triển vọng thành đạt và sự hiếu thảo của con cái sau này.",
  "Phu Thê": "Hôn nhân, tính cách bạn đời, mức độ hòa hợp trong tình cảm và duyên phận lứa đôi.",
  "Huynh Đệ": "Anh chị em ruột thịt, mức độ gắn bó tình cảm và sự tương trợ giúp đỡ nhau trong gia đình."
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DICT_SAO, DICT_PHU_TINH, DICT_CUNG };
} else {
  window.DICT_SAO = DICT_SAO;
  window.DICT_PHU_TINH = DICT_PHU_TINH;
  window.DICT_CUNG = DICT_CUNG;
}

