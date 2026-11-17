import type { Palace, Star, ZiweiChart } from './types';

export interface PalaceAnalysis {
  theme: string;
  overview: string;
  starSynthesis: string;
  strengths: string[];
  cautions: string[];
  interactions: string[];
  practical: string[];
  currentPeriod: string;
  evidence: string[];
}

const DOMAINS: Record<string, {theme:string; focus:string; linked:string[]; advice:string[]}> = {
  '命宫': {theme:'Bản thân, khí chất và cách hành động',focus:'Khí chất, năng lực tự thân, cách suy nghĩ, phản ứng và định hướng cuộc sống',linked:['财帛','官禄','迁移'],advice:['Đối chiếu cách hành động với mục tiêu dài hạn','Phát huy ưu điểm của chính tinh nhưng tránh tuyệt đối hóa một nét tính cách']},
  '兄弟': {theme:'Anh chị em và quan hệ ngang hàng',focus:'Tình cảm anh chị em, sự chia sẻ, hỗ trợ và cách phân định trách nhiệm',linked:['命宫','田宅','疾厄'],advice:['Duy trì trao đổi rõ ràng về trách nhiệm chung','Không suy đoán tính cách hay số phận người thân chỉ từ một cung']},
  '夫妻': {theme:'Hôn nhân và quan hệ đồng hành',focus:'Cách xây dựng quan hệ lâu dài, kỳ vọng, giao tiếp và phối hợp trong đời sống chung',linked:['命宫','福德','迁移'],advice:['Nói rõ nhu cầu và ranh giới trước khi đưa ra cam kết','Xem cung Phúc Đức và Mệnh cùng lúc, không kết luận hôn nhân từ một sao']},
  '子女': {theme:'Con cái, học trò và thành quả',focus:'Sự chăm sóc, nuôi dạy, tính kế thừa và những dự án cần vun bồi',linked:['田宅','父母','福德'],advice:['Ưu tiên sự kiên nhẫn và cách giao tiếp phù hợp từng cá nhân','Không dùng lá số để kết luận khả năng sinh sản hoặc sức khỏe trẻ em']},
  '财帛': {theme:'Tài chính và cách sử dụng nguồn lực',focus:'Cách tạo thu nhập, quản lý tiền, tích lũy và phân bổ nguồn lực',linked:['命宫','官禄','福德'],advice:['Lập ngân sách, quỹ dự phòng và giới hạn rủi ro rõ ràng','Đối chiếu năng lực kiếm tiền với thói quen chi tiêu thực tế']},
  '疾厄': {theme:'Thân tâm, áp lực và thói quen chăm sóc',focus:'Sức bền, áp lực, nhịp sinh hoạt và ý thức chăm sóc bản thân theo cách luận truyền thống',linked:['命宫','父母','福德'],advice:['Duy trì khám sức khỏe và chăm sóc dựa trên y khoa','Không xem sao hoặc cung này là chẩn đoán bệnh']},
  '迁移': {theme:'Môi trường bên ngoài và dịch chuyển',focus:'Khả năng thích nghi, giao tiếp xã hội, đi xa, thay đổi môi trường và cơ hội bên ngoài',linked:['命宫','夫妻','福德'],advice:['Chuẩn bị kỹ trước khi đổi việc, chuyển nơi ở hoặc đi xa','Tận dụng mạng lưới xã hội nhưng kiểm chứng thông tin']},
  '仆役': {theme:'Bạn bè, cộng sự và mạng lưới',focus:'Quan hệ đồng nghiệp, bạn bè, đối tác, người hỗ trợ và cách hợp tác',linked:['命宫','兄弟','父母'],advice:['Thỏa thuận rõ quyền lợi, trách nhiệm và điều kiện hợp tác','Đánh giá đối tác bằng hành vi và kết quả thực tế']},
  '交友': {theme:'Bạn bè, cộng sự và mạng lưới',focus:'Quan hệ đồng nghiệp, bạn bè, đối tác, người hỗ trợ và cách hợp tác',linked:['命宫','兄弟','父母'],advice:['Thỏa thuận rõ quyền lợi, trách nhiệm và điều kiện hợp tác','Đánh giá đối tác bằng hành vi và kết quả thực tế']},
  '官禄': {theme:'Sự nghiệp và con đường chuyên môn',focus:'Phong cách làm việc, mục tiêu nghề nghiệp, năng lực tổ chức và vai trò xã hội',linked:['命宫','财帛','迁移'],advice:['Chọn hướng phát triển phù hợp năng lực và hoàn cảnh','Chia mục tiêu nghề nghiệp thành các mốc có thể kiểm chứng']},
  '田宅': {theme:'Nhà cửa, tài sản và nền tảng',focus:'Nơi ở, tài sản cố định, môi trường gia đình và khả năng xây dựng nền tảng ổn định',linked:['财帛','兄弟','子女'],advice:['Kiểm tra pháp lý và dòng tiền trước quyết định tài sản','Phân biệt mong muốn sở hữu với khả năng tài chính']},
  '福德': {theme:'Đời sống tinh thần và nền tảng nội tâm',focus:'Nhu cầu an ổn, cách nghỉ ngơi, niềm vui, sức bền tinh thần và nếp nhà',linked:['夫妻','命宫','迁移'],advice:['Chủ động xây dựng thời gian nghỉ ngơi và kết nối xã hội','Không biến diễn giải biểu tượng thành kết luận về tâm lý hoặc bệnh lý']},
  '父母': {theme:'Cha mẹ, người hướng dẫn và nền tảng',focus:'Quan hệ với cha mẹ, người nuôi dưỡng, thầy cô và sự hỗ trợ từ thế hệ trước',linked:['疾厄','子女','仆役'],advice:['Trao đổi thẳng thắn nhưng tôn trọng khác biệt thế hệ','Không dùng lá số để đánh giá phẩm chất hay số phận người thân']}
};

const STAR_CORE: Record<string,string> = {
  '紫微':'Tử Vi thiên về tổ chức, điều phối, trách nhiệm và nhu cầu tự chủ. Khi được trợ lực thường dễ đứng ra gánh vác; khi chịu nhiều áp lực có thể thành cứng nhắc hoặc muốn kiểm soát.',
  '天机':'Thiên Cơ thiên về tư duy, tính toán, học hỏi và thay đổi phương án. Điểm mạnh là khả năng tìm cách giải quyết; điểm cần rèn là tập trung và quyết định dứt khoát.',
  '太阳':'Thái Dương thiên về chủ động, công khai, đóng góp và tinh thần trách nhiệm. Cần xét độ sáng và vị trí để phân biệt sự tự tin với tình trạng dễ hao sức vì kỳ vọng.',
  '武曲':'Vũ Khúc thiên về thực tế, kỷ luật, quản trị nguồn lực và hiệu quả. Phù hợp cách làm có mục tiêu rõ; cần cân bằng sự thẳng thắn với cảm xúc và quan hệ.',
  '天同':'Thiên Đồng thiên về hòa nhã, cảm thông, thích nghi và nhu cầu an ổn. Cần phát huy sự mềm dẻo nhưng tránh né xung đột hoặc trì hoãn.',
  '廉贞':'Liêm Trinh thiên về nguyên tắc, ranh giới, sức hút và khát vọng khẳng định bản thân. Cần giữ sự minh bạch, tránh phản ứng quá mạnh trước đánh giá.',
  '天府':'Thiên Phủ thiên về tích lũy, bảo toàn, tổ chức và quản lý. Có lợi khi xây nền tảng bền vững; cần tránh an phận hoặc quá thận trọng.',
  '太阴':'Thái Âm thiên về chiều sâu cảm xúc, quan sát, chăm lo và tích lũy. Cần xét độ sáng; điểm cần lưu ý là nhạy cảm, lo xa hoặc do dự.',
  '贪狼':'Tham Lang thiên về giao tiếp, trải nghiệm, ham học hỏi và sức hút xã hội. Nên tập trung sở trường, quản trị ham muốn và tránh phân tán nguồn lực.',
  '巨门':'Cự Môn thiên về ngôn ngữ, phân tích, chất vấn và tranh luận. Có thể phát huy ở nghiên cứu, tư vấn, thương lượng; cần chú ý cách diễn đạt và hiểu lầm.',
  '天相':'Thiên Tướng thiên về phối hợp, công bằng, phục vụ và điều hòa quan hệ. Cần giữ nguyên tắc cá nhân, tránh ôm việc hoặc phụ thuộc sự công nhận.',
  '天梁':'Thiên Lương thiên về kinh nghiệm, bảo trợ, nguyên tắc và trách nhiệm. Điểm mạnh là sự chín chắn; cần tránh bảo thủ hoặc gánh thay phần việc của người khác.',
  '七杀':'Thất Sát thiên về quyết đoán, chịu áp lực và xử lý tình huống khó. Nên đi cùng kỷ luật, quy trình an toàn và đánh giá rủi ro trước hành động.',
  '破军':'Phá Quân thiên về đổi mới, tái cấu trúc và phá bỏ lối cũ. Có thể hợp môi trường biến động; cần kế hoạch chuyển đổi và giới hạn rủi ro.',
  '文昌':'Văn Xương bổ sung sắc thái học tập, văn bản, trình bày và tư duy hệ thống.',
  '文曲':'Văn Khúc bổ sung sắc thái nghệ thuật, cảm thụ, ngôn ngữ và biểu đạt tinh tế.',
  '左辅':'Tả Phù biểu trưng sự trợ lực, phối hợp và hỗ trợ trong công việc.',
  '右弼':'Hữu Bật biểu trưng sự hỗ trợ mềm dẻo, kết nối và tháo gỡ vướng mắc.',
  '天魁':'Thiên Khôi thường được xem là quý tinh, gợi cơ hội học hỏi hoặc gặp người hướng dẫn.',
  '天钺':'Thiên Việt thường được xem là quý tinh, gợi sự trợ lực và lời khuyên đúng lúc.',
  '禄存':'Lộc Tồn gắn với tích lũy, giữ gìn nguồn lực và khả năng duy trì thành quả.',
  '天马':'Thiên Mã gắn với dịch chuyển, giao thương, thay đổi môi trường và nhịp sống năng động.',
  '擎羊':'Kình Dương là sát tinh, gợi tính cạnh tranh, va chạm và quyết liệt; cần tiết chế nóng vội.',
  '陀罗':'Đà La gợi trì trệ, vướng mắc hoặc tiến trình cần kiên nhẫn; tránh cố chấp.',
  '火星':'Hỏa Tinh gợi phản ứng nhanh, nhiệt huyết và tính bộc phát; cần quản trị nóng nảy.',
  '铃星':'Linh Tinh gợi áp lực âm ỉ hoặc tình huống bất ngờ; nên có phương án dự phòng.',
  '地空':'Địa Không thường được diễn giải như sắc thái hư hao hoặc tư duy vượt khuôn; cần kiểm chứng thực tế.',
  '地劫':'Địa Kiếp gợi biến động và nguy cơ hao hụt; nên quản trị rủi ro.',
  '红鸾':'Hồng Loan thường tượng trưng duyên gặp gỡ, cảm xúc và sức hấp dẫn; không khẳng định chắc chắn thời điểm kết hôn.',
  '天喜':'Thiên Hỷ gắn với niềm vui, sự kiện đáng mừng và không khí hòa hợp; cần xét cùng các sao liên quan.',
  '天刑':'Thiên Hình nhấn mạnh kỷ luật, nguyên tắc, ranh giới và tính nghiêm; nên tránh cứng nhắc.',
  '天姚':'Thiên Riêu gợi sức hút, cảm xúc, thẩm mỹ và sự nhạy cảm trong quan hệ; cần giữ ranh giới.',
  '天哭':'Thiên Khốc thường được luận như sắc thái ưu tư, nhạy cảm hoặc dễ suy nghĩ; nên quan tâm cách giải tỏa áp lực.',
  '天虚':'Thiên Hư gợi khoảng cách giữa kỳ vọng và thực tế; nên kiểm chứng thông tin và tránh tự suy diễn.',
  '孤辰':'Cô Thần biểu trưng tính độc lập, riêng tư hoặc xu hướng tự xử lý vấn đề; nên duy trì kết nối.',
  '寡宿':'Quả Tú gợi sự trầm lắng, tự lập và nhu cầu không gian riêng; không đồng nghĩa cô độc tất định.',
  '龙池':'Long Trì thường bổ sung sắc thái thanh nhã, năng khiếu hoặc sự trợ duyên trong giao tiếp.',
  '凤阁':'Phượng Các thường gắn với vẻ tao nhã, thẩm mỹ, danh dự và sự trau chuốt.',
  '解神':'Giải Thần tượng trưng khả năng tháo gỡ, hóa giải hoặc tìm lối ra khi gặp vướng mắc.',
  '华盖':'Hoa Cái gợi chiều sâu, tính độc lập, thiên hướng nghệ thuật hoặc nghiên cứu; đôi khi thiên về khép kín.',
  '天德':'Thiên Đức thường được xem là thiện tinh, nhấn mạnh lòng nhân hậu và khả năng giảm nhẹ va chạm.',
  '月德':'Nguyệt Đức thường mang sắc thái mềm hóa, thiện ý và hỗ trợ trong quan hệ.',
  '天官':'Thiên Quan gắn với danh vị, trách nhiệm, quy củ và sự hỗ trợ từ tổ chức.',
  '天福':'Thiên Phúc thường tượng trưng phúc trợ, sự thuận lợi và khả năng nhận được giúp đỡ.',
  '恩光':'Ân Quang gợi sự ghi nhận, thiện cảm và hỗ trợ thông qua học tập hoặc quan hệ.',
  '天贵':'Thiên Quý thường được xem là quý tinh, tượng trưng cơ hội và sự nâng đỡ.',
  '天寿':'Thiên Thọ gợi sự bền bỉ và duy trì nền tảng lâu dài; không phải chỉ báo tuổi thọ.',
  '八座':'Bát Tọa gắn với vị thế, sự ổn định và khả năng được giao trọng trách.',
  '三台':'Tam Thai gợi tiến trình nâng đỡ, học hỏi và từng bước tạo vị trí.',
  '天才':'Thiên Tài tượng trưng năng khiếu, khả năng ứng biến hoặc sở trường riêng.',
  '天使':'Thiên Sứ là phụ tinh cần luận theo hệ thống sao và cung liên quan; không dùng riêng để suy đoán sức khỏe.',
  '天伤':'Thiên Thương thường được xếp nhóm sao cần lưu ý về tổn hao, áp lực hoặc va chạm theo quan niệm truyền thống.',
  '天空':'Thiên Không gợi tính bất định, thay đổi hoặc xu hướng không bám chấp; cần kiểm tra tính thực tế.',
  '大耗':'Đại Hao thường tượng trưng khoản chi lớn, hao tổn hoặc biến động nguồn lực; cần quản trị ngân sách.',
  '小耗':'Tiểu Hao gợi các khoản hao hụt nhỏ, chi phí lặt vặt hoặc thất thoát do thiếu chú ý.',
  '劫煞':'Kiếp Sát gợi cạnh tranh, sự cố bất ngờ hoặc rủi ro; nên thận trọng trong quyết định.',
  '龙德':'Long Đức thường được xem là thiện tinh, bổ sung sắc thái hòa giải và trợ lực.',
  '咸池':'Hàm Trì gắn với sức hút, giao tiếp, cảm xúc và đào hoa; cần giữ ranh giới rõ ràng.',
  '阴煞':'Âm Sát gợi yếu tố kín đáo, lo xa hoặc tình huống khó thấy ngay; nên kiểm chứng thay vì nghi ngờ.',
  '年解':'Niên Giải tượng trưng khả năng tháo gỡ khó khăn hoặc giảm nhẹ trở ngại trong năm.',
  '截空':'Triệt Không thường gợi sự gián đoạn, hụt kỳ vọng hoặc cần điều chỉnh kế hoạch; phải xét đúng trường phái an sao.',
  '副截':'Phó Triệt là sao phụ thuộc cách an của trường phái; nên luận cùng Triệt Không.',
  '旬空':'Tuần Không gắn với tính chất ngăn trở, chậm lại hoặc làm giảm độ trực tiếp của biểu hiện; cần xét vị trí án ngữ.',
  '副旬':'Phó Tuần là sao phụ thuộc cách an của trường phái; nên xét cùng Tuần Không.',
  '博士':'Bác Sĩ thuộc vòng Bác Sĩ, thường gợi học hỏi, kỹ năng và sự chăm chút chuyên môn.',
  '力士':'Lực Sĩ thuộc vòng Bác Sĩ, gợi sức làm việc, sự cố gắng và tính chịu trách nhiệm.',
  '青龙':'Thanh Long thường mang sắc thái sinh động, cơ hội và tin vui theo hệ thống vòng sao.',
  '将军':'Tướng Quân gợi tính chủ động, điều hành và quyết đoán; cần tránh áp đặt.',
  '奏书':'Tấu Thư gắn với giấy tờ, trình bày, thông tin và việc xử lý văn bản.',
  '飞廉':'Phi Liêm gợi sự nhanh chóng, biến động hoặc tình huống đến bất ngờ; cần linh hoạt.',
  '喜神':'Hỷ Thần thường tượng trưng niềm vui, sự hòa thuận và không khí tích cực.',
  '病符':'Bệnh Phù là sao biểu tượng trong thuật số; không có giá trị chẩn đoán bệnh và không thay thế y khoa.',
  '伏兵':'Phục Binh gợi yếu tố tiềm ẩn, việc hậu trường hoặc vấn đề chưa bộc lộ; nên xác minh thông tin.',
  '岁破':'Tuế Phá thường gợi thay đổi, xung động hoặc kế hoạch bị xáo trộn; cần có phương án dự phòng.',
  '吊客':'Điếu Khách là sao mang sắc thái tang chế trong quan niệm cổ; không dùng để khẳng định sự kiện mất mát.'
};

const BRIGHTNESS: Record<string,string> = {
  '庙':'Miếu địa: phẩm chất sao thường được xem là có điều kiện phát huy rõ.',
  '旺':'Vượng địa: sắc thái sao thường mạnh và dễ biểu hiện.',
  '得':'Đắc địa: có điều kiện tương đối thuận để biểu hiện.',
  '利':'Lợi địa: có phần thuận lợi nhưng vẫn cần xét hội chiếu.',
  '平':'Bình hòa: không nên luận quá mạnh theo chiều tốt hoặc xấu.',
  '不':'Bất lợi theo bảng độ sáng đang dùng; cần xét toàn cục.',
  '闲':'Nhàn địa: biểu hiện thường không nổi bật.',
  '陷':'Hãm địa: sắc thái sao có thể khó phát huy hoặc biểu hiện lệch.',
  '地':'Mức địa theo bảng trường phái đang chọn; không đồng nhất với miếu/vượng.'
};
const HUA: Record<string,string> = {'禄':'Hóa Lộc: xu hướng thu hút, mở rộng hoặc tạo nguồn lực.','权':'Hóa Quyền: xu hướng chủ động, nắm quyền và tăng trách nhiệm.','科':'Hóa Khoa: xu hướng danh tiếng, học thuật, chuẩn mực hoặc giải ách theo quan niệm truyền thống.','忌':'Hóa Kỵ: điểm vướng mắc, tập trung tâm trí hoặc cần quản trị kỹ.'};
const MAJOR = ['紫微','天机','太阳','武曲','天同','廉贞','天府','太阴','贪狼','巨门','天相','天梁','七杀','破军'];
const LUCKY = ['左辅','右弼','文昌','文曲','天魁','天钺','禄存'];
const SHA = ['擎羊','陀罗','火星','铃星','地空','地劫'];

function starList(p: Palace): string[] { return p.stars.map(s => s.name); }
function byBranch(chart: ZiweiChart, branch: number): Palace | undefined {
  return chart.palaces.find(p => p.branch === ((branch % 12) + 12) % 12);
}
function names(stars: Star[]): string { return stars.map(s => s.name).join('、'); }
function brightnessText(s: Star): string {
  const raw = s.brightnessRaw;
  return raw ? (BRIGHTNESS[raw] || 'Cần xét theo bảng độ sáng đã chọn') : (s.brightness === 'bright' ? 'Được xếp nhóm sáng trong bảng độ sáng đang dùng.' : s.brightness === 'dim' ? 'Được xếp nhóm yếu trong bảng độ sáng đang dùng.' : 'Chưa có phân loại độ sáng chi tiết.');
}
function starPhrase(s: Star): string {
  const core = STAR_CORE[s.name] || (s.type === 'sha'
    ? 'Sát tinh này thường được luận như một áp lực hoặc tính chất quyết liệt; không có nghĩa sự kiện xấu chắc chắn xảy ra.'
    : s.type === 'lucky'
      ? 'Cát tinh này bổ sung sắc thái hỗ trợ; tác dụng còn tùy vị trí, chính tinh và các sao hội chiếu.'
      : s.type === 'minor'
        ? 'Phụ tinh bổ sung sắc thái cho cung; cần xét cùng chính tinh và tổ hợp sao.'
        : 'Chính tinh cần được luận trong tổng thể lá số.');
  const state = s.brightnessRaw ? ' ' + brightnessText(s) : '';
  const hua = s.siHua ? ' ' + HUA[s.siHua] : '';
  return core + state + hua;
}
function combination(stars: string[]): string[] {
  const set = new Set(stars);
  const out: string[] = [];
  const pairs: [string[],string][] = [
    [['紫微','天府'],'Tử Vi – Thiên Phủ cùng cung: kết hợp khuynh hướng điều phối với tích lũy, tổ chức và quản trị. Cần xem có Tả Hữu, Khôi Việt trợ lực hay bị sát tinh, Không Kiếp làm giảm sự ổn định.'],
    [['武曲','贪狼'],'Vũ Khúc – Tham Lang: kết hợp quản trị nguồn lực với nhu cầu giao tiếp, trải nghiệm và mở rộng. Nên phân biệt năng lực kinh doanh với xu hướng mạo hiểm.'],
    [['天机','太阴'],'Thiên Cơ – Thái Âm: kết hợp tính toán, quan sát và chiều sâu cảm xúc. Thuận cho việc phân tích, lập kế hoạch; cần tránh suy nghĩ quá nhiều.'],
    [['天同','天梁'],'Thiên Đồng – Thiên Lương: kết hợp sự mềm mỏng với nguyên tắc và kinh nghiệm. Có thể thiên về hỗ trợ, phục vụ; cần tránh cả nể hoặc bảo thủ.'],
    [['廉贞','天相'],'Liêm Trinh – Thiên Tướng: kết hợp nguyên tắc cá nhân với khả năng phối hợp và điều hòa. Cần giữ minh bạch trong quan hệ và quyền lợi.'],
    [['七杀','破军'],'Thất Sát – Phá Quân: nhấn mạnh hành động và thay đổi. Cần quy trình, kế hoạch và kiểm soát rủi ro để tránh quyết định nóng vội.'],
    [['太阳','巨门'],'Thái Dương – Cự Môn: kết hợp sự chủ động với ngôn ngữ và phản biện. Cần chú ý truyền đạt rõ, tránh tranh luận kéo dài.']
  ];
  for (const [pair, text] of pairs) if (pair.every(s => set.has(s))) out.push(text);
  return out;
}

export function analyzePalace(chart: ZiweiChart, palace: Palace): PalaceAnalysis {
  const domain = DOMAINS[palace.name] || {theme:'Khía cạnh đời sống',focus:'Vai trò của cung trong toàn bộ lá số',linked:['命宫'],advice:['Đối chiếu cung đối diện và tam phương tứ chính trước khi kết luận.']};
  const all = palace.stars;
  const major = all.filter(s => s.type === 'major');
  const lucky = all.filter(s => s.type === 'lucky' || LUCKY.includes(s.name));
  const sha = all.filter(s => s.type === 'sha' || SHA.includes(s.name));
  const hua = all.filter(s => s.siHua);
  const triad = [byBranch(chart, palace.branch + 4), byBranch(chart, palace.branch + 8)].filter((p): p is Palace => Boolean(p));
  const opposite = byBranch(chart, palace.branch + 6);
  const related = [...triad, ...(opposite ? [opposite] : [])].filter((p,i,a) => a.findIndex(x => x.branch === p.branch) === i);
  const relationNames = related.map(p => p.name + ' (' + names(p.stars.filter(s => s.type === 'major')) + ')');
  const strengths: string[] = [];
  const cautions: string[] = [];
  const interactions: string[] = [];
  const evidence: string[] = [];
  const practical = [...domain.advice];

  if (major.length) {
    evidence.push('Chính tinh tọa thủ: ' + names(major));
    strengths.push('Có ' + major.length + ' chính tinh tọa thủ (' + names(major) + '); cần đọc từng sao cùng độ sáng và tứ hóa.');
  } else {
    evidence.push('Cung vô chính diệu');
    cautions.push('Cung vô chính diệu: không luận là trống rỗng hay xấu. Cần mượn chính tinh từ cung đối diện và xét tam phương tứ chính.');
    if (palace.borrowedStars?.length) interactions.push('Chính tinh mượn từ ' + (palace.borrowedFromName || 'cung đối diện') + ': ' + palace.borrowedStars.join('、') + '. Đây là nguồn tham chiếu, không phải sao tọa thủ thực tế.');
  }
  if (lucky.length) strengths.push('Cát tinh/phụ trợ hiện diện: ' + names(lucky) + '. Đây là dấu hiệu hỗ trợ theo cách luận truyền thống, hiệu lực tùy tổ hợp.');
  if (sha.length) cautions.push('Sát tinh/Không Kiếp hiện diện: ' + names(sha) + '. Nên xem đây là khu vực cần quản trị áp lực, va chạm hoặc hao tổn, không phải dự báo chắc chắn.');
  if (hua.length) {
    for (const s of hua) interactions.push(s.name + ' mang ' + (s.siHua ? HUA[s.siHua] : 'Tứ Hóa') + (s.siHua === '忌' ? ' Cần xem sao này ở cung nào và các cung liên hệ.' : ' Cần xét lĩnh vực của cung để hiểu biểu hiện.'));
  }
  if (palace.selfSihua?.length) interactions.push('Dấu tự hóa theo dữ liệu lá số: ' + palace.selfSihua.map(x => x.starName + ' tự Hóa ' + x.siHua).join('、') + '. Cần phân biệt tự hóa với sinh niên Tứ Hóa.');
  const bright = major.filter(s => s.brightness === 'bright' || ['庙','旺','得','利'].includes(s.brightnessRaw || ''));
  const dim = major.filter(s => s.brightness === 'dim' || ['陷','不'].includes(s.brightnessRaw || ''));
  if (bright.length) strengths.push('Chính tinh có trạng thái sáng/thuận theo bảng đang dùng: ' + names(bright) + '.');
  if (dim.length) cautions.push('Chính tinh có trạng thái yếu/bất lợi theo bảng đang dùng: ' + names(dim) + '; cần xét cát tinh, Tứ Hóa và hội chiếu trước khi đánh giá.');
  if (related.length) interactions.push('Tam phương và đối cung: ' + relationNames.join('; ') + '. Đây là phần bắt buộc phải đối chiếu, không chỉ đọc riêng cung này.');
  const combos = combination(all.map(s => s.name));
  interactions.push(...combos);
  if (palace.isMingGong) {
    const shen = byBranch(chart, chart.shenGongBranch);
    if (shen) interactions.push('Liên hệ cung Thân tại ' + shen.name + ': ' + names(shen.stars.filter(s => s.type === 'major')) + '. Mệnh phản ánh nền tảng, Thân nhấn mạnh cách biểu hiện qua hành động và trải nghiệm.');
  }
  if (palace.isShenGong) {
    const ming = byBranch(chart, chart.mingGongBranch);
    if (ming) interactions.push('Đối chiếu với cung Mệnh tại ' + ming.name + ': ' + names(ming.stars.filter(s => s.type === 'major')) + '.');
  }
  if (palace.daXianAge) {
    const isCurrent = palace.isCurrentDaXian || (chart.daXians[chart.currentDaXianIndex]?.palaceBranch === palace.branch);
    if (isCurrent) interactions.push('Cung này đang là cung đại hạn hiện tại theo dữ liệu lập lá số.');
  }
  const starSynthesis = major.length
    ? major.map(s => s.name + ': ' + starPhrase(s)).join('\n\n')
    : 'Không có chính tinh tọa thủ. Khi luận cần lấy chính tinh cung đối diện làm tham chiếu, sau đó kết hợp phụ tinh, sát tinh và tam phương tứ chính.';
  const overview = domain.focus + '. ' + (major.length
    ? 'Bộ chính tinh tại cung gồm ' + names(major) + '. Không nên tách rời các sao khỏi trạng thái miếu-vượng-lợi-hãm, Tứ Hóa và các cung hội chiếu.'
    : 'Cung này vô chính diệu; cần mượn chính tinh cung đối diện và xét tam phương tứ chính. ') +
    (hua.length ? ' Có yếu tố Tứ Hóa tại cung.' : ' Chưa thấy chính tinh mang Tứ Hóa trực tiếp tại cung này.');
  const current = chart.daXians[chart.currentDaXianIndex];
  const currentPeriod = current
    ? 'Đại hạn hiện tại theo lá số: ' + current.startAge + '–' + current.endAge + ' tuổi, tại cung ' + current.palaceName + '. ' +
      (current.palaceBranch === palace.branch ? 'Cung đang xét trùng cung đại hạn hiện tại.' : 'Cung đang xét không phải cung đại hạn hiện tại; cần phân biệt luận bản mệnh với vận hạn.')
    : 'Chưa có dữ liệu đại hạn hiện tại để đối chiếu.';
  if (!strengths.length) strengths.push('Chưa có dấu hiệu trợ lực nổi bật được nhận diện riêng tại cung này; cần đọc cùng toàn cục lá số.');
  if (!cautions.length) cautions.push('Không có sát tinh rõ rệt trong danh sách sao tọa thủ; điều này không đồng nghĩa mọi việc đều thuận lợi.');
  if (!interactions.length) interactions.push('Chưa có tổ hợp đặc biệt được nhận diện; vẫn cần xét tam phương tứ chính và hoàn cảnh thực tế.');
  return {theme:domain.theme,overview,starSynthesis,strengths,cautions,interactions,practical,currentPeriod,evidence};
}

export function interpretStar(star: Star): string { return starPhrase(star); }
