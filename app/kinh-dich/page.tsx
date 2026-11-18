'use client';
import { useMemo, useState } from 'react';
import { HEXAGRAMS, getHexagram } from '@/lib/iching/data';
import { cast } from '@/lib/iching/cast';
import { read } from '@/lib/iching/reading';
import { relations } from '@/lib/iching/relations';
import type { Cast, Hexagram } from '@/lib/iching/types';
import { buildVietnameseReading } from '@/lib/iching/vietnamese';

const KEYWORDS: Record<string,string> = {
  'Creative':'Sáng tạo, chủ động','Receptive':'Tiếp nhận, thuận theo','Initial Difficulty':'Khởi đầu gian nan','Inexperience':'Non trẻ, cần học hỏi',
  'Waiting':'Chờ thời','Conflict':'Tranh chấp','The Army':'Kỷ luật, tổ chức','Union':'Gắn kết','Small Restraint':'Kiềm chế nhỏ','Conduct':'Cẩn trọng hành xử',
  'Peace':'Hài hòa, hanh thông','Stagnation':'Bế tắc','Fellowship':'Đồng lòng','Great Possession':'Thịnh vượng','Modesty':'Khiêm nhường','Enthusiasm':'Hứng khởi',
  'Following':'Thuận thời','Repair':'Sửa đổi','Approach':'Tiến gần','Contemplation':'Quan sát','Biting Through':'Giải quyết trở ngại','Adornment':'Tu dưỡng hình thức',
  'Disintegration':'Suy giảm','Return':'Trở lại','Innocence':'Chính trực','Great Taming':'Tích lũy sức mạnh','Nourishment':'Nuôi dưỡng','Great Exceeding':'Vượt ngưỡng',
  'The Abysmal':'Hiểm trở','The Clinging':'Sáng rõ','Influence':'Cảm ứng','Duration':'Bền lâu','Retreat':'Lui để giữ lực','Great Power':'Sức mạnh lớn',
  'Progress':'Tiến triển','Darkening of the Light':'Ánh sáng bị che','The Family':'Gia đạo','Opposition':'Khác biệt','Obstruction':'Trở ngại','Deliverance':'Tháo gỡ',
  'Decrease':'Giảm bớt','Increase':'Gia tăng','Breakthrough':'Đột phá','Coming to Meet':'Cuộc gặp bất ngờ','Gathering Together':'Tụ hội','Pushing Upward':'Đi lên từng bước',
  'Oppression':'Áp lực','The Well':'Nguồn lực bền vững','Revolution':'Cải cách','The Cauldron':'Chuyển hóa','Thunder':'Chấn động','Stillness':'Tĩnh tại',
  'Gradual Progress':'Tiến dần','Marriage':'Kết hợp','Abundance':'Sung túc','Wandering':'Dịch chuyển','Gentleness':'Mềm dẻo','Joy':'Niềm vui',
  'Dispersion':'Phân tán','Limitation':'Giới hạn','Sincerity':'Thành tín','Small Excess':'Điều chỉnh nhỏ','Completion':'Hoàn tất','Incompletion':'Chưa hoàn thành'
};
function HexagramLines({hexagram,moving=[]}:{hexagram:Hexagram;moving?:number[]}) {
 return <div className="hex-symbols" aria-label={hexagram.name}>{[...hexagram.lines].reverse().map((line,index)=>{const n=5-index;return <div className={'hex-line '+(line?'yang':'yin')} key={n} title={'Hào '+(n+1)+(moving.includes(n)?' · hào động':'')}>{line?<i/>:null}</div>;})}</div>;
}
function HexagramCard({hexagram,label,moving=[],primary=false}:{hexagram:Hexagram;label:string;moving?:number[];primary?:boolean}) {
 return <article className={'hex-card '+(primary?'primary-hex':'')}>
  <span className="hex-number">{label} · QUẺ SỐ {hexagram.id}</span>
  <HexagramLines hexagram={hexagram} moving={moving}/>
  <h3>{hexagram.name}</h3>
  <div className="hex-meta">{hexagram.pinyin} · {KEYWORDS[hexagram.keyword]||hexagram.keyword}<br/>Thượng quái: {hexagram.upper} · Hạ quái: {hexagram.lower}</div>
  {moving.length>0?<div className="moving-list">{moving.map(n=><span className="moving-tag" key={n}>Hào {n+1} động</span>)}</div>:null}
 </article>;
}
export default function KinhDichPage() {
 const [question,setQuestion]=useState('');
 const [result,setResult]=useState<Cast|null>(null);
 const [coinFaces,setCoinFaces]=useState<Array<Array<number|null>>>(()=>Array.from({length:6},()=>[null,null,null]));
 const [search,setSearch]=useState('');
 const [selected,setSelected]=useState<Hexagram|null>(null);
 const reading=useMemo(()=>result?read(result):null,[result]);
 const vietnamese=useMemo(()=>result&&reading?buildVietnameseReading(result,reading,question):null,[result,reading,question]);
 const related=useMemo(()=>result?relations(result.primary):null,[result]);
 const filtered=useMemo(()=>HEXAGRAMS.filter(h=>(h.name+h.pinyin+KEYWORDS[h.keyword]).toLowerCase().includes(search.toLowerCase())),[search]);
 function setCoinFace(line:number,coin:number,value:number){setCoinFaces(previous=>previous.map((row,i)=>i===line?row.map((face,j)=>j===coin?value:face):row));setResult(null);}
 function resetCoins(){setCoinFaces(Array.from({length:6},()=>[null,null,null]));setResult(null);setSelected(null);}
 function completeCast(){if(coinFaces.some(row=>row.some(face=>face===null)))return;const values=coinFaces.map(row=>row.reduce<number>((sum,face)=>sum+(face??0),0));setResult(cast(values));setSelected(null);}
 return <main className="shell iching-page">
  <header className="topbar"><a className="brand" href="/"><span className="seal">易</span><span><b>TỬ VI 247</b><small>LẬP LÁ SỐ · TRA CỨU · KHÁM PHÁ</small></span></a><nav className="main-nav" aria-label="Điều hướng chính"><a className="nav-link" href="/">Tử Vi</a><a className="nav-link active" href="/kinh-dich/">Kinh Dịch</a></nav><span className="top-note">Công cụ Kinh Dịch tiếng Việt</span></header>
  <section className="iching-hero"><span className="kicker">CHU DỊCH · 64 QUẺ · 384 HÀO</span><h1>Gieo một quẻ,<br/><em>soi rõ điều đang băn khoăn</em></h1><p>Gieo quẻ bằng phương pháp ba đồng xu, lập đủ sáu hào từ dưới lên, xác định hào động và quẻ biến. Kết quả hiển thị căn cứ cổ văn cùng quy tắc đọc quẻ, không dùng AI để tự tạo số quẻ.</p></section>
  <section className="iching-panel">
   <div className="panel-title"><div><span className="kicker">BƯỚC 01 · KHỞI NIỆM</span><h2>Đặt câu hỏi trước khi gieo quẻ</h2></div><span className="step">01 / 03</span></div>
   <div className="iching-question"><label>Câu hỏi của bạn <small style={{fontWeight:400,color:'var(--muted)'}}>Chỉ nêu một việc cụ thể, không dùng câu hỏi để quyết định quẻ</small><input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ví dụ: Tôi có nên nhận lời công việc này không?"/></label></div>
   <div className="coin-actions"><strong>Gieo bằng 3 đồng xu thật · ghi nhận từng hào</strong><p>Giữ nguyên một câu hỏi trong suốt lần gieo. Mỗi lượt, tung đồng thời 3 đồng xu rồi chọn đúng mặt xuất hiện: ngửa = 3 điểm, sấp = 2 điểm. Ghi đủ 6 lượt theo thứ tự hào 1 (dưới cùng) đến hào 6 (trên cùng). Hệ thống không tự random và không chọn quẻ từ nội dung câu hỏi.</p>
    <div className="manual-cast">{coinFaces.map((row,line)=><div className="manual-line" key={line}><b>Hào {line+1} {line===0?'· dưới cùng':line===5?'· trên cùng':''}</b><div className="coin-picks">{row.map((face,coin)=><div className="coin-pick" key={coin}><small>Xu {coin+1}</small><div><button type="button" className={face===3?'selected':''} onClick={()=>setCoinFace(line,coin,3)}>Ngửa · 3</button><button type="button" className={face===2?'selected':''} onClick={()=>setCoinFace(line,coin,2)}>Sấp · 2</button></div></div>)}</div><span className="line-total">{row.every(face=>face!==null)?'Tổng '+row.reduce<number>((sum,face)=>sum+(face??0),0):'Chưa đủ 3 xu'}</span></div>)}</div>
    <div className="manual-actions"><button className="primary" type="button" disabled={coinFaces.some(row=>row.some(face=>face===null))} onClick={completeCast}>LẬP QUẺ TỪ 18 MẶT XU →</button><button className="outline" type="button" onClick={resetCoins}>Xóa lượt gieo</button></div>
   </div>
  </section>
  {result&&reading?<section className="iching-panel" id="ket-qua-que">
   <div className="panel-title"><div><span className="kicker">BƯỚC 02 · KẾT QUẢ LẬP QUẺ</span><h2>{question.trim()||'Quẻ vừa gieo'}</h2></div><button className="outline" onClick={resetCoins}>Gieo lượt mới</button></div>
   <div className="coin-values">{result.values.map((v,i)=><div className="coin-value" key={i}><b>{v}</b><span>Hào {i+1} · {v===6?'Lão âm':v===7?'Thiếu dương':v===8?'Thiếu âm':'Lão dương'}</span></div>)}</div>
   <div className="iching-results"><HexagramCard hexagram={result.primary} label="BẢN QUẺ" moving={result.moving} primary/><HexagramCard hexagram={result.changed} label="BIẾN QUẺ"/></div>
   <div className="reading-box"><h4>Quy tắc đọc quẻ theo Chu Hy</h4><p>{reading.guide}</p><p>Số hào động: <strong>{reading.movingCount}</strong>{reading.lineNumbers.length?' · Hào được chọn: '+reading.lineNumbers.join(', '):''}{reading.primaryWeight?' · Trọng số bản quẻ: 70%':''}</p>{reading.texts.map((t,i)=><p className="classical-text" key={i}><strong>{t.source==='primary'?'Bản quẻ':t.source==='changed'?'Biến quẻ':'Cả hai'}{t.type==='guaCi'?' · Quái từ':t.type==='yaoCi'?' · Hào '+t.line:' · Dụng từ'}:</strong> {t.text}</p>)}</div>
   {vietnamese?<section className="vi-reading" aria-label="Luận giải tiếng Việt">
    <div className="vi-reading-head"><span className="kicker">LUẬN GIẢI TIẾNG VIỆT · DỰA TRÊN BẢN QUẺ VÀ HÀO ĐỘNG</span><h3>Luận giải tập trung vào câu hỏi</h3><p>{vietnamese.questionNote}</p><span className="vi-topic">{vietnamese.topicLabel}</span></div>
    <div className="vi-answer"><small>TRẢ LỜI TRỌNG TÂM</small><p>{vietnamese.answer}</p></div>
    <div className="vi-reading-grid">
     <article><h4>Ý nghĩa tổng quát của bản quẻ</h4><p>{vietnamese.core}</p></article>
     <article><h4>Việc nên làm</h4><p>{vietnamese.action}</p></article>
     <article className="vi-caution"><h4>Điều cần thận trọng</h4><p>{vietnamese.caution}</p></article>
    </div>
    {vietnamese.movingInterpretations.length>0?<div className="vi-lines"><h4>Các hào được chọn theo quy tắc Chu Hy</h4>{vietnamese.movingInterpretations.map(item=><article key={item.source+item.hexagramName+item.line}>
      <b>{item.sourceLabel} · {item.hexagramName} · Hào {item.line}</b><p><strong>{item.position}</strong> — {item.lineNature}</p>
      <p>{item.interpretation}</p><p><strong>Áp dụng cho câu hỏi:</strong> {item.topicAdvice}</p>
      <p><strong>Hướng hành động:</strong> {item.action}</p><p><strong>Điều cần tránh:</strong> {item.caution}</p>
      <small>Nguyên văn: {item.classical}</small><small>Đối chiếu bản dịch James Legge (1882): {item.english}</small>
     </article>)}</div>:<div className="vi-lines"><h4>Đọc quái từ theo quy tắc Chu Hy</h4>{vietnamese.sourceTexts.map((item,i)=><article key={i}>
      <b>{item.sourceLabel} · {item.type==="yong"?"Dụng từ đặc biệt": "Quái từ"}</b><p>{item.text}</p>{item.english?<small>Đối chiếu bản dịch James Legge (1882): {item.english}</small>:null}
     </article>)}</div>}
    <div className="vi-transition"><h4>Đối chiếu biến quẻ và các quan hệ</h4><p>{vietnamese.changedNote}</p><p>{vietnamese.nuclearNote}</p></div>
    <p className="vi-method">{vietnamese.questionNote} {vietnamese.sourceNote}</p>
   </section>:null}
   {related?<><h3 style={{fontFamily:'Playfair Display,serif',color:'var(--wine-dark)',margin:'22px 0 10px'}}>Các quan hệ của bản quẻ</h3><div className="relations-grid">{[['Quẻ hỗ',related.nuclear],['Quẻ đối',related.opposite],['Quẻ đảo',related.inverse]].map(([label,h])=><div className="relation-item" key={String(label)}><b>{String(label)}</b><HexagramLines hexagram={h as Hexagram}/><span>{(h as Hexagram).name} · số {(h as Hexagram).id}</span></div>)}</div></>:null}
   <details className="classical-details"><summary>Xem toàn bộ quái từ và sáu hào của bản quẻ</summary><p className="line-text"><strong>Quái từ:</strong> {result.primary.guaCi}</p>{result.primary.yaoCi.map((line,i)=><p className="line-text" key={i}><strong>Hào {i+1}{result.moving.includes(i)?' · ĐANG ĐỘNG':''}:</strong> {line}</p>)}</details>
   <details className="classical-details"><summary>Xem toàn bộ quái từ và sáu hào của biến quẻ</summary><p className="line-text"><strong>Quái từ:</strong> {result.changed.guaCi}</p>{result.changed.yaoCi.map((line,i)=><p className="line-text" key={i}><strong>Hào {i+1}:</strong> {line}</p>)}</details>
  </section>:null}
  <section className="iching-panel"><div className="panel-title"><div><span className="kicker">BƯỚC 03 · TRA CỨU</span><h2>Thư viện 64 quẻ</h2></div><span className="step">64 QUẺ</span></div><input className="hex-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm theo tên quẻ, pinyin hoặc từ khóa..." aria-label="Tìm quẻ"/><div className="hex-library">{filtered.map(h=><button type="button" key={h.id} onClick={()=>setSelected(h)}><b>{h.id}. {h.name}</b><small>{KEYWORDS[h.keyword]||h.keyword}</small></button>)}</div>{selected?<div className="reading-box"><button className="outline" type="button" onClick={()=>setSelected(null)}>Đóng</button><HexagramCard hexagram={selected} label="TRA CỨU"/><p className="classical-text"><strong>Quái từ:</strong> {selected.guaCi}</p>{selected.yaoCi.map((line,i)=><p className="line-text" key={i}><strong>Hào {i+1}:</strong> {line}</p>)}</div>:null}</section>
  <p className="iching-note">Kinh Dịch là hệ thống văn bản cổ truyền. Cổ văn được giữ nguyên chữ Hán; bản dịch đối chiếu tiếng Anh của James Legge (1882) thuộc phạm vi công cộng; phần diễn giải tiếng Việt là nội dung ứng dụng biên soạn riêng, không thay thế khảo chứng học thuật. Kết quả dùng để tham khảo và tự suy xét, không phải dự báo chắc chắn hay căn cứ duy nhất cho quyết định quan trọng.</p>
  <footer className="iching-footer"><b>TỬ VI 247</b> · <a href="/">Tử Vi</a> · <a href="/kinh-dich/">Kinh Dịch</a><br/>Engine tính quẻ dựa trên iching-kit (MIT); cổ văn Chu Dịch thuộc phạm vi công cộng; bản dịch đối chiếu James Legge (1882) thuộc phạm vi công cộng.</footer>
 </main>;
}
