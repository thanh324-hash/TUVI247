'use client';
import { FormEvent, useMemo, useState } from 'react';
import { generateChart } from '@/lib/ziwei/algorithm';
import { detectPatterns, getMingGongSummary } from '@/lib/ziwei/patterns';
import { calculateTrueSolarTime, resolveZiweiDayOffset, shiftGregorianDate } from '@/lib/ziwei/true-solar-time';
import type { BirthInfo, Palace, ZiweiChart } from '@/lib/ziwei/types';

const BRANCH=['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'];
const STEM=['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'];
const PALACE:Record<string,string>={'命宫':'Mệnh','兄弟':'Huynh Đệ','夫妻':'Phu Thê','子女':'Tử Tức','财帛':'Tài Bạch','疾厄':'Tật Ách','迁移':'Thiên Di','仆役':'Nô Bộc','交友':'Nô Bộc','官禄':'Quan Lộc','田宅':'Điền Trạch','福德':'Phúc Đức','父母':'Phụ Mẫu'};
const STAR:Record<string,string>={'紫微':'Tử Vi','天机':'Thiên Cơ','太阳':'Thái Dương','武曲':'Vũ Khúc','天同':'Thiên Đồng','廉贞':'Liêm Trinh','天府':'Thiên Phủ','太阴':'Thái Âm','贪狼':'Tham Lang','巨门':'Cự Môn','天相':'Thiên Tướng','天梁':'Thiên Lương','七杀':'Thất Sát','破军':'Phá Quân','文昌':'Văn Xương','文曲':'Văn Khúc','左辅':'Tả Phù','右弼':'Hữu Bật','天魁':'Thiên Khôi','天钺':'Thiên Việt','禄存':'Lộc Tồn','天马':'Thiên Mã','擎羊':'Kình Dương','陀罗':'Đà La','火星':'Hỏa Tinh','铃星':'Linh Tinh','地空':'Địa Không','地劫':'Địa Kiếp','红鸾':'Hồng Loan','天喜':'Thiên Hỷ','天刑':'Thiên Hình','天姚':'Thiên Riêu','天哭':'Thiên Khốc','天虚':'Thiên Hư','孤辰':'Cô Thần','寡宿':'Quả Tú','龙池':'Long Trì','凤阁':'Phượng Các','解神':'Giải Thần','华盖':'Hoa Cái','天德':'Thiên Đức','月德':'Nguyệt Đức','天官':'Thiên Quan','天福':'Thiên Phúc','恩光':'Ân Quang','天贵':'Thiên Quý','天寿':'Thiên Thọ','八座':'Bát Tọa','三台':'Tam Thai','天才':'Thiên Tài','天使':'Thiên Sứ','天伤':'Thiên Thương','天空':'Thiên Không','大耗':'Đại Hao','小耗':'Tiểu Hao','劫煞':'Kiếp Sát','龙德':'Long Đức','咸池':'Hàm Trì','阴煞':'Âm Sát','年解':'Niên Giải','截空':'Triệt Không','副截':'Phó Triệt','旬空':'Tuần Không','副旬':'Phó Tuần','博士':'Bác Sĩ','力士':'Lực Sĩ','青龙':'Thanh Long','将军':'Tướng Quân','奏书':'Tấu Thư','飞廉':'Phi Liêm','喜神':'Hỷ Thần','病符':'Bệnh Phù','伏兵':'Phục Binh','岁破':'Tuế Phá','吊客':'Điếu Khách'};
const PATTERN:Record<string,string>={'君臣庆会':'Quân Thần Khánh Hội','紫府同宫':'Tử Phủ Đồng Cung','府相朝垣':'Phủ Tướng Triều Viên','阳梁昌禄':'Dương Lương Xương Lộc','武贪格':'Vũ Tham Cách','杀破狼':'Sát Phá Lang','机月同梁':'Cơ Nguyệt Đồng Lương','廉贞天相格':'Liêm Trinh Thiên Tướng','武曲七杀':'Vũ Khúc Thất Sát','天同天梁格':'Thiên Đồng Thiên Lương','日月同宫':'Nhật Nguyệt Đồng Cung','日月夹命':'Nhật Nguyệt Giáp Mệnh','巨日同宫':'Cự Nhật Đồng Cung','石中隐玉':'Thạch Trung Ẩn Ngọc','明珠出海':'Minh Châu Xuất Hải','紫微入命':'Tử Vi Nhập Mệnh','辅弼夹命':'Tả Hữu Giáp Mệnh','昌曲夹命':'Xương Khúc Giáp Mệnh','魁钺夹命':'Khôi Việt Giáp Mệnh','双禄朝垣':'Song Lộc Triều Viên','三奇加会':'Tam Kỳ Gia Hội','羊陀夹忌':'Kình Đà Giáp Kỵ','火铃夹命':'Hỏa Linh Giáp Mệnh','空劫夹命':'Không Kiếp Giáp Mệnh','廉杀羊':'Liêm Sát Dương','巨火羊':'Cự Hỏa Dương','铃昌陀武':'Linh Xương Đà Vũ','马头带箭':'Mã Đầu Đới Tiễn','化禄入财':'Hóa Lộc Nhập Tài','化权入官':'Hóa Quyền Nhập Quan','机月同梁三星会':'Cơ Nguyệt Đồng Lương Tam Tinh Hội','辅弼同会':'Tả Hữu Đồng Hội','魁钺同会':'Khôi Việt Đồng Hội','科权双会':'Khoa Quyền Song Hội'};
const BRIGHT:Record<string,string>={'庙':'Miếu','旺':'Vượng','得':'Đắc','利':'Lợi','平':'Bình','不':'Bất','闲':'Nhàn','陷':'Hãm','地':'Địa'};
const SIHUA:Record<string,string>={'禄':'Hóa Lộc','权':'Hóa Quyền','科':'Hóa Khoa','忌':'Hóa Kỵ'};
const TYPE:Record<string,string>={major:'Chính tinh',lucky:'Cát tinh',minor:'Phụ tinh',sha:'Sát tinh'};
const GRID:Record<number,[number,number]>={5:[1,1],6:[1,2],7:[1,3],8:[1,4],4:[2,1],9:[2,4],3:[3,1],10:[3,4],2:[4,1],1:[4,2],0:[4,3],11:[4,4]};
const starName=(s:string)=>STAR[s]||s;
const palaceName=(s:string)=>PALACE[s]||s.replace('宫','');
const levelName=(s:string)=>s==='excellent'?'Cách cục tốt':s==='good'?'Có điểm thuận':s==='caution'?'Cần lưu ý':'Trung tính';

function Stars({palace}:{palace:Palace}) {
 return <div className="star-groups">{(['major','lucky','minor','sha'] as const).map(type=>{
  const list=palace.stars.filter(s=>s.type===type);if(!list.length)return null;
  return <div className="star-group" key={type}><b>{TYPE[type]}</b><div className="chips">{list.map((s,i)=><span className={'chip '+(s.siHua?'sihua-'+s.siHua:'')} key={s.name+i}>{starName(s.name)}{s.brightnessRaw?<small>{BRIGHT[s.brightnessRaw]||s.brightnessRaw}</small>:null}{s.siHua?<strong>{SIHUA[s.siHua]||s.siHua}</strong>:null}</span>)}</div></div>;
 })}</div>;
}
function PalaceTile({palace,selected,onSelect}:{palace:Palace;selected:boolean;onSelect:()=>void}) {
 const major=palace.stars.filter(s=>s.type==='major');
 return <button type="button" className={'palace-tile '+(selected?'selected':'')} onClick={onSelect}>
  <div className="tile-head"><b>{palaceName(palace.name)}</b><span>{STEM[palace.stem]} {BRANCH[palace.branch]}</span></div>
  <div className="tile-stars">{major.length?major.map(s=>starName(s.name)).join(' · '):'Vô chính diệu'}</div>
  <small>{palace.stars.length} sao · {palace.daXianAge?'Đại hạn '+palace.daXianAge[0]+'–'+palace.daXianAge[1]:'—'}</small>
  {palace.isMingGong?<em>Mệnh</em>:null}{palace.isShenGong?<em>Thân</em>:null}
 </button>;
}
export default function Home() {
 const [name,setName]=useState('');const [gender,setGender]=useState<'male'|'female'>('male');
 const [date,setDate]=useState('1995-10-25');const [time,setTime]=useState('11:30');const [longitude,setLongitude]=useState('');
 const [chart,setChart]=useState<ZiweiChart|null>(null);const [selectedBranch,setSelectedBranch]=useState(0);
 const [tab,setTab]=useState<'chart'|'details'|'patterns'|'fortune'>('chart');const [error,setError]=useState('');const [solarNote,setSolarNote]=useState('');
 const patterns=useMemo(()=>chart?detectPatterns(chart):[],[chart]);const summary=useMemo(()=>chart?getMingGongSummary(chart):null,[chart]);
 const selected=chart?.palaces.find(p=>p.branch===selectedBranch)||null;
 function submit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault();setError('');
  try {
   const [y,m,d]=date.split('-').map(Number);const [hh,mi]=time.split(':').map(Number);const lon=longitude.trim()===''?undefined:Number(longitude);
   if(lon!==undefined&&(!Number.isFinite(lon)||lon < -180||lon>180))throw new Error('Kinh độ phải nằm trong khoảng -180 đến 180.');
   const solar=calculateTrueSolarTime({year:y,month:m,day:d,clockHour:hh,clockMinute:mi,longitude:lon,utcOffsetMinutes:420});
   if(!solar.dateValid)throw new Error('Ngày sinh không tồn tại trong lịch dương.');
   const adjusted=shiftGregorianDate({year:y,month:m,day:d},resolveZiweiDayOffset(solar,'next-day'));
   const info:BirthInfo={year:adjusted.year,month:adjusted.month,day:adjusted.day,hour:solar.branch,gender,name:name.trim()||undefined,origInput:{year:y,month:m,day:d,clockHour:hh,clockMinute:mi}};
   const next=generateChart(info);setChart(next);setSelectedBranch(next.mingGongBranch);setTab('chart');
   setSolarNote(solar.corrected?'Đã hiệu chỉnh kinh độ và phương trình thời gian để ước tính giờ Mặt Trời thực.':'Đang dùng giờ đồng hồ UTC+7. Có thể nhập kinh độ để hiệu chỉnh giờ Mặt Trời thực.');
  } catch(err){setError(err instanceof Error?err.message:'Không thể lập lá số. Vui lòng kiểm tra thông tin.');}
 }
 return <main className="shell">
  <header className="topbar"><a className="brand" href="#"><span className="seal">紫</span><span><b>TỬ VI 247</b><small>LẬP LÁ SỐ · TRA CỨU · KHÁM PHÁ</small></span></a><span className="top-note">Công cụ Tử Vi Đẩu Số tiếng Việt</span></header>
  <section className="hero"><span className="kicker">TỬ VI ĐẨU SỐ · HỆ THỐNG LẬP LÁ SỐ</span><h1>Khám phá lá số của bạn<br/><i>qua 12 cung và hệ thống sao</i></h1><p>Lập lá số bằng bộ máy an sao mã nguồn mở; tra cứu chính tinh, phụ tinh, tứ hóa, đại hạn và các cách cục được nhận diện.</p></section>
  <section className="form-panel"><div className="panel-title"><div><span className="kicker">THÔNG TIN ĐẦU VÀO</span><h2>Lập lá số Tử Vi</h2></div><span className="step">01 / 02</span></div>
   <form className="birth-form" onSubmit={submit}>
    <label>Họ và tên <small>(không bắt buộc)</small><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nhập tên của bạn"/></label>
    <label>Giới tính<select value={gender} onChange={e=>setGender(e.target.value as 'male'|'female')}><option value="male">Nam</option><option value="female">Nữ</option></select></label>
    <label>Ngày sinh dương lịch<input type="date" required value={date} onChange={e=>setDate(e.target.value)}/></label>
    <label>Giờ sinh<input type="time" required value={time} onChange={e=>setTime(e.target.value)}/></label>
    <label className="wide">Kinh độ nơi sinh <small>(tùy chọn – ví dụ Hà Nội: 105.85°)</small><input type="number" min="-180" max="180" step="0.0001" value={longitude} onChange={e=>setLongitude(e.target.value)} placeholder="Để trống nếu không cần hiệu chỉnh giờ Mặt Trời thực"/></label>
    <div className="wide actions"><button className="primary" type="submit">LẬP LÁ SỐ NGAY <span>→</span></button><small>Không cần tài khoản. Dữ liệu được xử lý ngay trên trình duyệt.</small></div>
   </form>{error?<p className="error" role="alert">{error}</p>:null}
  </section>
  {chart?<section className="results" id="ket-qua">
   <div className="result-title"><div><span className="kicker">KẾT QUẢ LẬP LÁ SỐ</span><h2>{name.trim()||'Lá số của bạn'}</h2><p>{chart.yinYangGender||(gender==='male'?'Nam mệnh':'Nữ mệnh')} · {chart.wuxingJuName} · Tuổi mụ {chart.currentAge}</p></div><button className="outline" onClick={()=>window.print()}>In / Lưu PDF</button></div>
   <div className="summary-grid"><div><small>ÂM LỊCH</small><b>{chart.lunarInfo.lunarYear} · Tháng {Math.abs(chart.lunarInfo.lunarMonth)} · Ngày {chart.lunarInfo.lunarDay}{chart.lunarInfo.isLeapMonth?' (nhuận)':''}</b></div><div><small>MỆNH – THÂN</small><b>{BRANCH[chart.mingGongBranch]} · {BRANCH[chart.shenGongBranch]}</b></div><div><small>MỆNH CHỦ – THÂN CHỦ</small><b>{starName(chart.mingZhu||'—')} · {starName(chart.shenZhu||'—')}</b></div><div><small>VỊ TRÍ TỬ VI</small><b>{BRANCH[chart.ziweiPos]}</b></div></div>
   <p className="notice">{solarNote} {chart.lunarInfo.fourPillars?.length?'Tứ trụ theo tiết khí: '+chart.lunarInfo.fourPillars.join(' · ')+'.':''}</p>
   <nav className="tabs"><button className={tab==='chart'?'active':''} onClick={()=>setTab('chart')}>Bàn lá số</button><button className={tab==='details'?'active':''} onClick={()=>setTab('details')}>12 cung chi tiết</button><button className={tab==='patterns'?'active':''} onClick={()=>setTab('patterns')}>Cách cục ({patterns.length})</button><button className={tab==='fortune'?'active':''} onClick={()=>setTab('fortune')}>Đại hạn</button></nav>
   {tab==='chart'?<div className="chart-layout"><div className="chart-board">
    {chart.palaces.map(p=>{const pos=GRID[p.branch];return <div key={p.branch} style={{gridRow:pos[0],gridColumn:pos[1]}}><PalaceTile palace={p} selected={selectedBranch===p.branch} onSelect={()=>setSelectedBranch(p.branch)}/></div>;})}
    <div className="chart-center"><span className="kicker">TỬ VI 247</span><h3>{name.trim()||'Đương số'}</h3><hr/><b>{chart.wuxingJuName}</b><p>Mệnh chủ: {starName(chart.mingZhu||'—')}</p><p>Thân chủ: {starName(chart.shenZhu||'—')}</p><small>Mệnh tại {BRANCH[chart.mingGongBranch]} · Thân tại {BRANCH[chart.shenGongBranch]}</small></div>
   </div><aside className="selected-panel">{selected?<><span className="kicker">CHI TIẾT CUNG ĐANG CHỌN</span><h3>{palaceName(selected.name)}</h3><p>{STEM[selected.stem]} {BRANCH[selected.branch]} · {selected.isMingGong?'Cung Mệnh':selected.isShenGong?'Cung Thân':'Cung địa bàn'}</p>{selected.isEmpty?<div className="soft-note">Vô Chính Diệu{selected.borrowedStars?.length?' · Mượn chính tinh từ cung '+palaceName(selected.borrowedFromName||'')+': '+selected.borrowedStars.map(starName).join(', '):''}.</div>:null}<Stars palace={selected}/><div className="detail-meta">{selected.daXianAge?'Đại hạn '+selected.daXianAge[0]+'–'+selected.daXianAge[1]+' tuổi':'Chưa có dải đại hạn'}{selected.isCurrentDaXian?' · Đại hạn hiện tại':''}</div></>:null}<p className="tap-hint">Chọn một cung trên bàn lá số để xem đầy đủ các sao được an tại cung đó.</p></aside></div>:null}
   {tab==='details'?<div className="detail-list">{chart.palaces.map(p=><article key={p.branch}><div className="detail-head"><div><span className="kicker">{STEM[p.stem]} {BRANCH[p.branch]}</span><h3>{palaceName(p.name)}</h3></div><small>{p.daXianAge?p.daXianAge[0]+'–'+p.daXianAge[1]+' tuổi':'—'}</small></div>{p.isEmpty?<p className="soft-note">Vô Chính Diệu{p.borrowedStars?.length?' · Mượn chính tinh cung '+palaceName(p.borrowedFromName||'')+': '+p.borrowedStars.map(starName).join(', '):''}</p>:null}<Stars palace={p}/></article>)}</div>:null}
   {tab==='patterns'?<section className="subpanel"><h3>Cách cục được bộ máy nhận diện</h3><p>Các tên cách cục được Việt hóa. Kết quả dựa trên điều kiện sao, vị trí cung và quy tắc nhận diện của thư viện nguồn.</p>{patterns.length?<div className="pattern-grid">{patterns.map((p,i)=><article key={p.name+i}><b>{PATTERN[p.name]||'Cách cục Tử Vi'}</b><small>{levelName(p.level)}</small><p>{p.palaces.map(palaceName).join(' · ')}</p><em>Nhận diện theo bộ điều kiện của thư viện nguồn.</em></article>)}</div>:<p>Chưa phát hiện cách cục nổi bật theo các điều kiện hiện có. Điều này không đồng nghĩa lá số không có điểm mạnh hoặc điểm cần lưu ý.</p>}</section>:null}
   {tab==='fortune'?<section className="subpanel"><h3>Các giai đoạn đại hạn</h3><p>Tuổi tính theo tuổi mụ của hệ thống lập lá số.</p><div className="fortune-grid">{chart.daXians.map((d,i)=><button key={i} className={i===chart.currentDaXianIndex?'current':''} onClick={()=>{setSelectedBranch(d.palaceBranch);setTab('chart')}}><small>GIAI ĐOẠN {i+1}</small><b>{d.startAge}–{d.endAge}</b><span>tuổi · {palaceName(d.palaceName)} ({BRANCH[d.palaceBranch]})</span>{i===chart.currentDaXianIndex?<em>Đại hạn hiện tại</em>:null}</button>)}</div></section>:null}
   <div className="bottom-summary"><div><span className="kicker">TỔNG QUAN CUNG MỆNH</span><h3>{summary?.nature||'Mệnh Vô Chính Diệu'}</h3><p>{summary?.keywords?.length?'Từ khóa chủ tinh: '+summary.keywords.join(' · '):'Cung Mệnh không có chính tinh tọa thủ; cần xét cung xung chiếu và tam phương tứ chính.'}</p></div><strong>{summary?.stars?.length?summary.stars.map(starName).join(' · '):'Vô Chính Diệu'}</strong></div>
   <p className="disclaimer">Tử Vi là hệ thống tri thức văn hóa truyền thống. Nội dung mang tính tham khảo, không phải kết luận khoa học hay căn cứ duy nhất cho quyết định về sức khỏe, tài chính, tình cảm hoặc công việc.</p>
  </section>:null}
  <footer className="footer"><b>TỬ VI 247</b><p>Phát triển dựa trên bộ máy mã nguồn mở Zi Wei Dou Shu.</p><a href="https://github.com/Renhuai123/ziwei-doushu" target="_blank" rel="noreferrer">Xem mã nguồn tham khảo ↗</a></footer>
 </main>;
}
