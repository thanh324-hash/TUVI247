import type { Palace, Star, ZiweiChart } from './types';
import { detectPatterns } from './patterns';

const chartPatternCache = new WeakMap<ZiweiChart, ReturnType<typeof detectPatterns>>();
function getChartPatterns(chart: ZiweiChart): ReturnType<typeof detectPatterns> {
  const cached = chartPatternCache.get(chart);
  if (cached) return cached;
  const detected = detectPatterns(chart);
  chartPatternCache.set(chart, detected);
  return detected;
}

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
const DOMAIN_LENS: Record<string, string> = {
  '命宫':'khí chất, cách tự quyết và cách một người sử dụng năng lực của mình',
  '兄弟':'quan hệ ngang hàng, sự chia sẻ và cách phân định trách nhiệm với anh chị em',
  '夫妻':'cách lựa chọn người đồng hành, giao tiếp và duy trì quan hệ lâu dài',
  '子女':'cách chăm sóc, hướng dẫn, trao truyền và vun đắp thành quả',
  '财帛':'cách tạo thu nhập, giữ tiền, chi tiêu và phân bổ nguồn lực',
  '疾厄':'sức chịu đựng, nhịp sinh hoạt và ý thức chăm sóc thân tâm; không dùng để chẩn đoán bệnh',
  '迁移':'cách ứng xử với môi trường bên ngoài, thay đổi và những việc diễn ra khi đi xa',
  '仆役':'cách chọn cộng sự, xây dựng mạng lưới và xử lý lợi ích trong hợp tác',
  '交友':'cách chọn cộng sự, xây dựng mạng lưới và xử lý lợi ích trong hợp tác',
  '官禄':'phong cách làm việc, lựa chọn nghề nghiệp, quyền hạn và trách nhiệm chuyên môn',
  '田宅':'cách xây dựng nơi ở, quản lý tài sản cố định và vun đắp nền tảng gia đình',
  '福德':'nhu cầu an ổn, cách nghỉ ngơi, hưởng thụ và tự điều hòa đời sống tinh thần',
  '父母':'quan hệ với cha mẹ, người nuôi dưỡng, thầy cô và sự tiếp nhận nền tảng từ thế hệ trước'
};

const STAR_FUNCTION: Record<string, string> = {
  '紫微':'tổ chức, điều phối và gánh trách nhiệm', '天机':'tính toán, học hỏi và thay đổi phương án',
  '太阳':'chủ động, công khai và tinh thần đóng góp', '武曲':'kỷ luật, hiệu quả và quản trị nguồn lực',
  '天同':'hòa giải, thích nghi và nhu cầu an ổn', '廉贞':'nguyên tắc, ranh giới và sức hút cá nhân',
  '天府':'tích lũy, bảo toàn và quản lý', '太阴':'quan sát, chăm lo và tích lũy kín đáo',
  '贪狼':'giao tiếp, trải nghiệm và mở rộng quan hệ', '巨门':'ngôn ngữ, phân tích và phản biện',
  '天相':'phối hợp, điều hòa và cân bằng quyền lợi', '天梁':'kinh nghiệm, bảo trợ và nguyên tắc',
  '七杀':'quyết định trong áp lực và hành động dứt khoát', '破军':'đổi mới, tháo bỏ cái cũ và tái cấu trúc'
};



type StarTendency = { potential: string; risk: string; practice: string };
const STAR_TENDENCIES: Record<string, StarTendency> = {
  '紫微': {potential:'đứng ra tổ chức, điều phối và chịu trách nhiệm',risk:'ôm quyền, khó giao việc hoặc đặt kỳ vọng cao lên người khác',practice:'phân quyền rõ và đánh giá bằng kết quả thay vì kiểm soát từng bước'},
  '天机': {potential:'phân tích tình huống, học nhanh và tìm nhiều phương án',risk:'đổi ý liên tục, phân tán hoặc chậm quyết định vì cân nhắc quá nhiều',practice:'giới hạn số phương án và đặt thời hạn ra quyết định'},
  '太阳': {potential:'chủ động, công khai, dẫn dắt và tạo ảnh hưởng',risk:'làm quá sức hoặc phụ thuộc vào sự ghi nhận',practice:'giữ ranh giới trách nhiệm và phân bổ sức lực bền vững'},
  '武曲': {potential:'làm việc thực tế, kỷ luật và quản lý nguồn lực',risk:'quá cứng, thiên về hiệu quả mà bỏ qua yếu tố con người',practice:'kết hợp chỉ tiêu định lượng với trao đổi và phản hồi'},
  '天同': {potential:'thích nghi, hòa giải và tạo môi trường dễ hợp tác',risk:'né xung đột, trì hoãn việc khó hoặc chọn an toàn quá mức',practice:'xử lý bất đồng sớm và duy trì mục tiêu cụ thể'},
  '廉贞': {potential:'giữ nguyên tắc, nhận diện ranh giới và tạo dấu ấn cá nhân',risk:'phản ứng mạnh khi bị đánh giá hoặc vướng vào tranh chấp quyền lợi',practice:'minh bạch thỏa thuận và tách cảm xúc khỏi quyết định'},
  '天府': {potential:'quản trị, tích lũy và duy trì nguồn lực ổn định',risk:'quá thận trọng, chậm đổi mới hoặc giữ cách làm đã lỗi thời',practice:'định kỳ rà soát hiệu quả và dành nguồn lực cho cải tiến'},
  '太阴': {potential:'quan sát kỹ, chăm lo chi tiết và lập kế hoạch dài hạn',risk:'lo xa, giữ cảm xúc trong lòng hoặc chần chừ khi thiếu chắc chắn',practice:'kiểm chứng dữ liệu, chia nhỏ quyết định và trao đổi nhu cầu rõ ràng'},
  '贪狼': {potential:'kết nối, giao tiếp, khám phá cơ hội và thích ứng xã hội',risk:'phân tán, chạy theo trải nghiệm hoặc mở rộng quá khả năng',practice:'chọn ưu tiên, đặt giới hạn nguồn lực và duy trì cam kết'},
  '巨门': {potential:'nghiên cứu, chất vấn, diễn đạt và phát hiện điểm chưa hợp lý',risk:'tranh luận kéo dài, hiểu lầm hoặc biến phản biện thành đối đầu',practice:'nêu dữ kiện, thống nhất định nghĩa và xác nhận lại thỏa thuận'},
  '天相': {potential:'phối hợp, cân bằng quyền lợi và giữ quy trình công bằng',risk:'chiều lòng nhiều phía hoặc ngại tự đưa ra quyết định',practice:'xác định nguyên tắc không thỏa hiệp và phạm vi trách nhiệm'},
  '天梁': {potential:'hướng dẫn, cố vấn, bảo trợ và xử lý việc cần kinh nghiệm',risk:'bao bọc quá mức, bảo thủ hoặc gánh thay trách nhiệm của người khác',practice:'hỗ trợ có giới hạn và để người liên quan tự chịu trách nhiệm'},
  '七杀': {potential:'quyết đoán, xử lý tình huống áp lực và thúc đẩy hành động',risk:'nóng vội, chấp nhận rủi ro lớn hoặc hành động khi thiếu dữ liệu',practice:'dùng quy trình kiểm soát rủi ro và có phương án dự phòng'},
  '破军': {potential:'đổi mới, tái cấu trúc và dám thay cách làm không còn hiệu quả',risk:'phá bỏ quá nhanh, thiếu ổn định hoặc không tính chi phí chuyển đổi',practice:'thử nghiệm theo giai đoạn và đặt tiêu chí dừng/tiếp tục'}
};

type PalaceLens = { reading: string; practical: string[]; boundary: string };
const PALACE_LENSES: Record<string, PalaceLens> = {
  '命宫': {reading:'cách tự quyết, phản ứng trước áp lực, tổ chức cuộc sống và sử dụng năng lực cá nhân',practical:['Đối chiếu nhận định với hành vi lặp lại trong công việc và đời sống','Chọn một năng lực chủ đạo để rèn thành kỹ năng có thể kiểm chứng'],boundary:'Không dùng một cung để kết luận toàn bộ tính cách hay số phận.'},
  '兄弟': {reading:'cách duy trì quan hệ anh chị em, chia sẻ nguồn lực, trao đổi và phân định trách nhiệm',practical:['Thỏa thuận rõ việc chung, tài sản chung và trách nhiệm chăm sóc','Không suy đoán tính cách hoặc số phận của anh chị em từ lá số của một người'],boundary:'Cung này không thay thế lá số riêng của từng người thân.'},
  '夫妻': {reading:'kỳ vọng khi chọn người đồng hành, cách giao tiếp, phân chia trách nhiệm và xử lý bất đồng',practical:['Trao đổi sớm về tài chính, gia đình, ranh giới và mục tiêu sống','Đánh giá quan hệ qua hành vi thực tế, sự tôn trọng và khả năng cùng giải quyết vấn đề'],boundary:'Không thể xác định chắc chắn ngoại hình, nghề nghiệp, thời điểm kết hôn hay chung thủy của bạn đời.'},
  '子女': {reading:'cách chăm sóc, hướng dẫn, trao truyền kinh nghiệm và vun đắp dự án dài hạn',practical:['Điều chỉnh cách hướng dẫn theo nhu cầu từng cá nhân','Chia mục tiêu dài hạn thành các mốc chăm sóc và phát triển cụ thể'],boundary:'Không dùng cung này để kết luận khả năng sinh sản, giới tính hay sức khỏe của trẻ.'},
  '财帛': {reading:'cách tạo thu nhập, dòng tiền, tích lũy, chi tiêu và phân bổ rủi ro tài chính',practical:['Theo dõi dòng tiền vào/ra và xây quỹ dự phòng trước khi đầu tư','Phân biệt khả năng kiếm tiền với khả năng giữ tiền và quản trị nợ'],boundary:'Không suy ra mức giàu nghèo hoặc khuyến nghị đầu tư chỉ từ một cung.'},
  '疾厄': {reading:'thói quen sinh hoạt, cách phân bổ sức lực, phản ứng với căng thẳng và ý thức chăm sóc thân tâm',practical:['Duy trì lịch ngủ, vận động và khám sức khỏe theo khuyến nghị y khoa','Khi có triệu chứng, tìm đánh giá y tế thay vì đối chiếu sao để tự chẩn đoán'],boundary:'Tử Vi không phải công cụ chẩn đoán bệnh, tiên lượng tuổi thọ hoặc thay thế bác sĩ.'},
  '迁移': {reading:'cách thích nghi với môi trường bên ngoài, đi xa, thay đổi nơi sống và xây dựng quan hệ xã hội',practical:['Kiểm tra điều kiện pháp lý, tài chính và công việc trước khi chuyển môi trường','Chủ động xây mạng lưới nhưng xác minh cơ hội và thông tin'],boundary:'Không khẳng định chắc chắn xuất ngoại, tai nạn hay thành bại khi đi xa.'},
  '仆役': {reading:'cách lựa chọn cộng sự, phân công, xây dựng mạng lưới và xử lý lợi ích trong hợp tác',practical:['Thống nhất quyền hạn, lợi ích, thời hạn và trách nhiệm bằng văn bản','Đánh giá cộng sự bằng hành vi, năng lực và lịch sử thực hiện cam kết'],boundary:'Không kết luận người khác tốt/xấu hoặc phản bội chỉ từ cung này.'},
  '交友': {reading:'cách lựa chọn bạn bè, cộng sự, duy trì mạng lưới và đặt ranh giới trong quan hệ',practical:['Phân biệt quan hệ xã giao, bạn thân và đối tác công việc','Giữ nguyên tắc bảo mật, tiền bạc và trách nhiệm khi hợp tác'],boundary:'Không gán động cơ hay phẩm chất cho một người cụ thể từ lá số.'},
  '官禄': {reading:'phong cách làm việc, năng lực chuyên môn, vai trò trong tổ chức, quyền hạn và hướng phát triển nghề nghiệp',practical:['Chọn công việc dựa trên kỹ năng, điều kiện thị trường và trải nghiệm thực tế','Xây hồ sơ năng lực, mục tiêu theo quý và tiêu chí đánh giá rõ ràng'],boundary:'Không khẳng định chắc chắn chức vụ, danh tiếng hoặc thành bại nghề nghiệp.'},
  '田宅': {reading:'môi trường sống, cách quản lý nhà cửa, tài sản cố định và nguồn lực gia đình',practical:['Kiểm tra pháp lý, hiện trạng và dòng tiền trước quyết định bất động sản','Tách tài sản cá nhân, tài sản chung và trách nhiệm gia đình'],boundary:'Không dự đoán chắc chắn số lượng nhà đất, thừa kế hoặc tranh chấp.'},
  '福德': {reading:'nhu cầu nghỉ ngơi, cảm nhận đủ đầy, cách tìm niềm vui và khả năng tự điều hòa áp lực',practical:['Duy trì hoạt động phục hồi năng lượng và kết nối xã hội','Nhận diện thói quen gây căng thẳng và tìm hỗ trợ phù hợp khi cần'],boundary:'Không dùng cung này để chẩn đoán rối loạn tâm lý hoặc kết luận hạnh phúc cả đời.'},
  '父母': {reading:'quan hệ với cha mẹ, người nuôi dưỡng, người hướng dẫn và cách tiếp nhận sự hỗ trợ từ thế hệ trước',practical:['Trao đổi rõ nhu cầu chăm sóc, tài chính và ranh giới giữa các thế hệ','Tìm người hướng dẫn dựa trên chuyên môn và uy tín thực tế'],boundary:'Không dùng lá số để kết luận tuổi thọ, phẩm chất hoặc số phận của cha mẹ.'}
};

function starPhrase(s: Star, palaceName?: string): string {
  const core = STAR_CORE[s.name] || (s.type === 'sha'
    ? 'Sát tinh này thường được luận như một áp lực hoặc tính chất quyết liệt; không có nghĩa sự kiện xấu chắc chắn xảy ra.'
    : s.type === 'lucky'
      ? 'Cát tinh này bổ sung sắc thái hỗ trợ; tác dụng còn tùy vị trí, chính tinh và các sao hội chiếu.'
      : s.type === 'minor'
        ? 'Phụ tinh bổ sung sắc thái cho cung; cần xét cùng chính tinh và tổ hợp sao.'
        : 'Chính tinh cần được luận trong tổng thể lá số.');
  const state = s.brightnessRaw ? ' ' + brightnessText(s) : '';
  const hua = s.siHua ? ' ' + HUA[s.siHua] : '';
  const tendency = STAR_TENDENCIES[s.name];
  const lens = palaceName ? PALACE_LENSES[palaceName] : undefined;
  const contextual = lens
    ? ' Trong cung ' + palaceName + ', cần đọc biểu hiện qua ' + lens.reading + '.'
    : '';
  const applied = tendency && lens
    ? ' Khả năng phát huy: ' + tendency.potential + '. Mặt cần tự kiểm soát: ' + tendency.risk + '.'
    : '';
  return core + state + hua + contextual + applied;
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
  const lens = PALACE_LENSES[palace.name] || {reading:'lĩnh vực đời sống tương ứng với cung này',practical:domain.advice,boundary:'Chỉ kết luận trong phạm vi dữ liệu hiện có.'};
  const all = palace.stars;
  const major = all.filter(s => s.type === 'major' || MAJOR.includes(s.name));
  const lucky = all.filter(s => s.type === 'lucky' || LUCKY.includes(s.name));
  const sha = all.filter(s => s.type === 'sha' || SHA.includes(s.name));
  const hua = all.filter(s => Boolean(s.siHua));
  const triad = [byBranch(chart, palace.branch + 4), byBranch(chart, palace.branch + 8)].filter((p): p is Palace => Boolean(p));
  const opposite = byBranch(chart, palace.branch + 6);
  const related = [...triad, ...(opposite ? [opposite] : [])].filter((p,i,a) => a.findIndex(x => x.branch === p.branch) === i);
  const strengths: string[] = [];
  const cautions: string[] = [];
  const interactions: string[] = [];
  const evidence: string[] = [];
  const practical = [...lens.practical];

  evidence.push('Cung đang luận: ' + palace.name + ' tại địa chi ' + palace.branch + ', thiên can cung ' + palace.stem + '.');
  evidence.push('Phạm vi luận: ' + lens.reading + '.');
  evidence.push('Sao tọa thủ thực tế: ' + (all.length ? names(all) : 'không có sao được ghi nhận trong dữ liệu cung này') + '.');

  if (major.length) {
    evidence.push('Chính tinh tọa thủ: ' + names(major));
    for (const s of major) {
      evidence.push(s.name + ': ' + (s.brightnessRaw ? 'độ sáng ' + s.brightnessRaw : 'chưa có độ sáng chi tiết') + (s.siHua ? ', sinh niên Hóa ' + s.siHua : ''));
    }
    const readable = major.map(s => {
      const tendency = STAR_TENDENCIES[s.name];
      const text = s.name + ': ' + starPhrase(s, palace.name);
      return tendency ? text + ' Cách ứng dụng: ' + tendency.practice + '.' : text;
    });
    var starSynthesis = readable.join('\n\n');
  } else {
    evidence.push('Cung vô chính diệu: không có chính tinh tọa thủ.');
    const borrowed = palace.borrowedStars?.length ? palace.borrowedStars.join('、') : (opposite?.stars.filter(s => s.type === 'major').map(s => s.name).join('、') || '');
    starSynthesis = borrowed
      ? 'Cung ' + palace.name + ' vô chính diệu. Chính tinh tại cung đối diện ' + (opposite?.name || palace.borrowedFromName || '') + ' (' + borrowed + ') chỉ được dùng làm sao mượn để tham chiếu, không phải sao tọa thủ. Cần đọc cùng các sao thực tế tại cung này, hai cung tam hợp và Tứ Hóa hội chiếu.'
      : 'Cung ' + palace.name + ' vô chính diệu và dữ liệu hiện không xác định được chính tinh mượn từ cung đối diện. Chưa đủ căn cứ để kết luận về chính tinh; cần kiểm tra dữ liệu an sao và trường phái đang chọn.';
    cautions.push('Không coi vô chính diệu là cung trống hoặc mặc nhiên xấu. Phải xét chính tinh mượn từ đối cung, sao thực tọa thủ và toàn bộ tam phương tứ chính.');
    if (borrowed) interactions.push('Sao mượn từ đối cung ' + (opposite?.name || palace.borrowedFromName || '') + ': ' + borrowed + '. Phân biệt rõ sao mượn với sao tọa thủ.');
  }

  if (lucky.length) {
    strengths.push('Nhóm sao trợ lực tọa thủ: ' + names(lucky) + '. Đây là yếu tố hỗ trợ theo cách luận truyền thống; mức độ còn tùy chính tinh, độ sáng, Tứ Hóa và các sao đồng cung.');
    evidence.push('Nhóm sao trợ lực tọa thủ: ' + names(lucky));
  }
  if (sha.length) {
    cautions.push('Nhóm sát tinh/Không Kiếp tọa thủ: ' + names(sha) + '. Nên đọc thành khu vực cần quản trị áp lực, xung đột hoặc hao tổn; không chuyển thành dự báo tai họa chắc chắn.');
    evidence.push('Nhóm sát tinh tọa thủ: ' + names(sha));
  }

  const bright = major.filter(s => s.brightness === 'bright' || ['庙','旺','得','利'].includes(s.brightnessRaw || ''));
  const dim = major.filter(s => s.brightness === 'dim' || ['陷','不','闲'].includes(s.brightnessRaw || ''));
  if (bright.length) strengths.push('Theo bảng độ sáng đang chọn, chính tinh có trạng thái miếu/vượng/đắc/lợi: ' + bright.map(s => s.name + (s.brightnessRaw ? ' (' + s.brightnessRaw + ')' : '')).join('、') + '. Đây là điều kiện thuận để phát huy phẩm chất sao, không tự động bảo đảm kết quả tốt.');
  if (dim.length) cautions.push('Theo bảng độ sáng đang chọn, chính tinh có trạng thái hãm/bất lợi: ' + dim.map(s => s.name + (s.brightnessRaw ? ' (' + s.brightnessRaw + ')' : '')).join('、') + '. Cần xét sao trợ lực, Tứ Hóa và hội chiếu trước khi đánh giá mức độ.');
  if (!bright.length && !dim.length) evidence.push('Không có phân loại miếu/vượng/hãm đủ rõ để đưa ra nhận định độ sáng.');

  if (hua.length) {
    const favorable = hua.filter(s => s.siHua === '禄' || s.siHua === '权' || s.siHua === '科');
    const ji = hua.filter(s => s.siHua === '忌');
    if (favorable.length) strengths.push('Sinh niên Tứ Hóa tọa thủ: ' + favorable.map(s => s.name + ' Hóa ' + s.siHua).join('、') + '. Khi luận ' + palace.name + ', cần xem chúng tác động vào ' + lens.reading + '; không đồng nhất Hóa Lộc với chắc chắn giàu có, Hóa Quyền với chức vụ hay Hóa Khoa với danh tiếng.');
    if (ji.length) cautions.push('Sinh niên Hóa Kỵ tọa thủ: ' + ji.map(s => s.name).join('、') + '. Đây là điểm cần dành sự chú ý và kiểm tra kỹ trong lĩnh vực ' + lens.reading + '; không phải kết luận thất bại.');
    for (const s of hua) interactions.push(s.name + ' Hóa ' + s.siHua + ' tọa thủ ngay tại cung ' + palace.name + '. ' + HUA[s.siHua as string]);
    evidence.push('Sinh niên Tứ Hóa tọa thủ: ' + hua.map(s => s.name + ' Hóa ' + s.siHua).join('、'));
  } else {
    evidence.push('Không ghi nhận sao sinh niên Tứ Hóa tọa thủ tại cung này.');
  }

  if (palace.selfSihua?.length) {
    interactions.push('Tự Hóa theo cung can: ' + palace.selfSihua.map(x => x.starName + ' tự Hóa ' + x.siHua).join('、') + '. Đây là lớp dữ liệu riêng, không được gộp với sinh niên Tứ Hóa.');
    evidence.push('Dấu tự Hóa: ' + palace.selfSihua.map(x => x.starName + ' tự Hóa ' + x.siHua).join('、'));
  }

  if (related.length) {
    const relationText = related.map(p => {
      const role = p.branch === ((palace.branch + 6) % 12) ? 'xung chiếu' : 'tam hợp';
      const majors = p.stars.filter(s => s.type === 'major' || MAJOR.includes(s.name));
      const helpers = p.stars.filter(s => s.type === 'lucky' || LUCKY.includes(s.name));
      const challenges = p.stars.filter(s => s.type === 'sha' || SHA.includes(s.name));
      const transformations = p.stars.filter(s => Boolean(s.siHua));
      const parts = [majors.length ? 'chính tinh ' + names(majors) : 'vô chính diệu'];
      if (helpers.length) parts.push('trợ tinh ' + names(helpers));
      if (challenges.length) parts.push('sát tinh ' + names(challenges));
      if (transformations.length) parts.push('Tứ Hóa ' + transformations.map(s => s.name + ' Hóa ' + s.siHua).join('、'));
      return p.name + ' (' + role + '): ' + parts.join('; ');
    });
    interactions.push('Tổng hợp tam phương tứ chính: ' + relationText.join(' | ') + '. Đây là các nguồn hội chiếu; sao ở những cung này không được chuyển thành sao tọa thủ của cung ' + palace.name + '.');
    for (const rp of related) {
      const transformed = rp.stars.filter(s => Boolean(s.siHua));
      if (transformed.length) interactions.push('Tại cung hội chiếu ' + rp.name + ', ' + transformed.map(s => s.name + ' Hóa ' + s.siHua).join('、') + '. Tác động được đọc qua quan hệ hội chiếu, không gán nhầm thành Tứ Hóa tọa thủ tại ' + palace.name + '.');
    }
    evidence.push('Các cung hội chiếu: ' + related.map(p => p.name).join('、'));
  }

  const chartPatterns = getChartPatterns(chart).filter(pattern => pattern.palaces.includes(palace.name));
  for (const pattern of chartPatterns) {
    const required = pattern.conditions?.required?.length ? ' Điều kiện nhận diện đã thỏa: ' + pattern.conditions.required.join('；') + '.' : '';
    const bonus = pattern.conditions?.bonus?.length ? ' Yếu tố hỗ trợ được ghi nhận: ' + pattern.conditions.bonus.join('；') + '.' : '';
    const breaking = pattern.conditions?.breaking?.length ? ' Yếu tố giảm lực/phá cách được ghi nhận: ' + pattern.conditions.breaking.join('；') + '.' : '';
    const source = pattern.source ? ' Nguồn quy tắc: ' + pattern.source + '.' : '';
    interactions.push('Cách cục ' + pattern.name + ' (' + pattern.level + '): ' + pattern.description + required + bonus + breaking + source + ' Đây là nhận định theo trường phái của bộ quy tắc, không phải dự báo chắc chắn.');
    evidence.push('Cách cục nhận diện: ' + pattern.name + (pattern.source ? ' — ' + pattern.source : ''));
  }

  const combos = combination(all.map(s => s.name));
  interactions.push(...combos);
  if (palace.isMingGong) {
    const shen = byBranch(chart, chart.shenGongBranch);
    if (shen) interactions.push('Đối chiếu Mệnh – Thân: cung Thân tại ' + shen.name + ', chính tinh ' + (names(shen.stars.filter(s => s.type === 'major')) || 'vô chính diệu') + '. Cung Mệnh được đọc như nền tảng; cung Thân bổ sung cách khuynh hướng được thể hiện qua lựa chọn và hành động.');
  }
  if (palace.isShenGong) {
    const ming = byBranch(chart, chart.mingGongBranch);
    if (ming) interactions.push('Đối chiếu Thân – Mệnh: cung Mệnh tại ' + ming.name + ', chính tinh ' + (names(ming.stars.filter(s => s.type === 'major')) || 'vô chính diệu') + '. Không tách Thân khỏi nền tảng Mệnh khi tổng hợp.');
  }

  const starRoles = major.map(s => {
    const tendency = STAR_TENDENCIES[s.name];
    return s.name + ' thiên về ' + (tendency ? tendency.potential : (STAR_FUNCTION[s.name] || 'một sắc thái riêng cần xét theo hệ thống sao'));
  }).join('; ');
  const overview = major.length
    ? 'Luận cung ' + palace.name + ' cần tập trung vào ' + lens.reading + '. Chính tinh tọa thủ gồm ' + names(major) + '; các khuynh hướng chính: ' + starRoles + '. ' +
      (bright.length ? 'Độ sáng thuận được ghi nhận ở ' + names(bright) + '. ' : '') +
      (dim.length ? 'Độ sáng cần lưu ý ở ' + names(dim) + '. ' : '') +
      (hua.length ? 'Sinh niên Tứ Hóa tọa thủ: ' + hua.map(s => s.name + ' Hóa ' + s.siHua).join('、') + '. ' : 'Chưa ghi nhận sinh niên Tứ Hóa tọa thủ. ') +
      'Kết luận phải cân bằng với phụ tinh, sát tinh, tự Hóa và các cung tam phương tứ chính; không thể xếp cung tốt/xấu chỉ từ một sao.'
    : 'Cung ' + palace.name + ' vô chính diệu. Trọng tâm luận vẫn là ' + lens.reading + '. Cần mượn chính tinh từ cung đối diện làm tham chiếu nếu dữ liệu có ghi nhận, đồng thời đọc các sao thực tọa thủ, Tứ Hóa và toàn bộ tam phương tứ chính. ' + lens.boundary;

  const current = chart.daXians[chart.currentDaXianIndex];
  let currentPeriod = 'Chưa có dữ liệu đại hạn hiện tại để đối chiếu.';
  if (current) {
    const currentPalace = byBranch(chart, current.palaceBranch);
    const periodStars = currentPalace?.stars.filter(s => s.type === 'major' || MAJOR.includes(s.name)) || [];
    const periodHua = current.siHua
      ? ['Lộc ' + current.siHua.lu, 'Quyền ' + current.siHua.quan, 'Khoa ' + current.siHua.ke, 'Kỵ ' + current.siHua.ji].join(' · ')
      : 'Chưa có dữ liệu Tứ Hóa đại hạn';
    currentPeriod = 'Đại hạn hiện tại: ' + current.startAge + '–' + current.endAge + ' tuổi tại cung ' + current.palaceName + '. ';
    currentPeriod += 'Chính tinh tại cung đại hạn: ' + (periodStars.length ? names(periodStars) : 'vô chính diệu hoặc chưa có dữ liệu') + '. ';
    currentPeriod += 'Tứ Hóa đại hạn: ' + periodHua + '. ';
    currentPeriod += current.palaceBranch === palace.branch
      ? 'Cung đang luận trùng cung đại hạn: cần đọc lớp vận hạn này chồng lên cấu trúc bản mệnh, không thay thế bản mệnh.'
      : 'Cung đang luận không trùng cung đại hạn; phần này chỉ là bối cảnh vận hạn chung, không được xem là tác động trực tiếp đã xác lập lên cung đang luận.';
    if (currentPalace) interactions.push('Cung đại hạn hiện tại ' + current.palaceName + ': ' + (periodStars.length ? names(periodStars) : 'vô chính diệu') + '. Tứ Hóa đại hạn: ' + periodHua + '. Đây là lớp vận hạn, phân biệt với sinh niên Tứ Hóa.');
    evidence.push('Đại hạn hiện tại: ' + current.startAge + '–' + current.endAge + ' tuổi, cung ' + current.palaceName + ', địa chi ' + current.palaceBranch);
  }

  if (!strengths.length) strengths.push('Chưa có yếu tố trợ lực nổi bật đủ căn cứ để kết luận riêng. Điều này không đồng nghĩa lĩnh vực ' + lens.reading + ' chắc chắn bất lợi.');
  if (!cautions.length) cautions.push('Chưa ghi nhận sát tinh chính hoặc Hóa Kỵ tọa thủ. Đây không phải bảo đảm rằng lĩnh vực ' + lens.reading + ' luôn thuận lợi; vẫn cần xét toàn cục và hoàn cảnh thực tế.');
  if (!interactions.length) interactions.push('Chưa có tổ hợp đặc biệt được bộ quy tắc nhận diện tại cung này. Kết quả nhận diện cách cục không bao quát mọi trường phái Tử Vi.');
  practical.push(lens.boundary);
  practical.push('Các gợi ý chỉ là cách vận dụng mang tính tham khảo; quyết định thực tế cần dựa trên dữ kiện, hoàn cảnh và tư vấn chuyên môn phù hợp.');
  return {theme:domain.theme,overview,starSynthesis,strengths,cautions,interactions,practical,currentPeriod,evidence};
}
export function interpretStar(star: Star, palaceName?: string): string { return starPhrase(star, palaceName); }
