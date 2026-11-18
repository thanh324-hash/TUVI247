import test from 'node:test';
import assert from 'node:assert/strict';
import { lunarToSolar, isValidLunarDate, lunarMonthDayCount } from '../lib/ziwei/lunar-solar';
import { clockToStandardDelta, shiftClock, formatClock } from '../lib/ziwei/clock-adjust';
import { analyzePalace, interpretStar } from '../lib/ziwei/interpretation';
import type { Palace, Star, ZiweiChart } from '../lib/ziwei/types';
import {
  jiangQianShenByBranch, suiQianShenByBranch, boshiShenByStem,
  boshiReverse, jiangQianShenName, suiQianShenName, boshiShenName,
} from '../lib/ziwei/shier-shen';

test('the three twelve-deity systems form complete, non-duplicated palace cycles', () => {
  for (let anchor = 0; anchor < 12; anchor++) {
    const jiang = jiangQianShenByBranch(anchor);
    const sui = suiQianShenByBranch(anchor);
    assert.equal(jiang.length, 12);
    assert.equal(sui.length, 12);
    assert.deepEqual([...jiang].sort((a,b)=>a-b), Array.from({length:12},(_,i)=>i));
    assert.deepEqual([...sui].sort((a,b)=>a-b), Array.from({length:12},(_,i)=>i));
    assert.equal(jiangQianShenName(anchor, anchor), '将星');
    assert.equal(suiQianShenName(anchor, anchor), '岁建');
  }
});

test('Bo Shi twelve-deity direction follows yang/ying stem and gender rule', () => {
  for (let stem = 0; stem < 10; stem++) {
    for (const gender of ['male','female'] as const) {
      const cycle = boshiShenByStem(stem, gender);
      assert.equal(cycle.length, 12);
      assert.deepEqual([...cycle].sort((a,b)=>a-b), Array.from({length:12},(_,i)=>i));
      const yang = stem % 2 === 0;
      assert.equal(boshiReverse(stem, gender), yang !== (gender === 'male'));
      assert.equal(boshiShenName(stem, gender, cycle.indexOf(0)), '博士');
    }
  }
});


const palaceNames = ['命宫','兄弟','夫妻','子女','财帛','疾厄','迁移','仆役','官禄','田宅','福德','父母'];
function makeChart(): ZiweiChart {
  const palaces: Palace[] = palaceNames.map((name, branch) => ({
    name, branch, stem: branch % 10, stars: [], oppositeBranch: (branch + 6) % 12,
  }));
  palaces[0].isMingGong = true;
  palaces[0].stars = [
    {name:'紫微',type:'major',brightness:'bright',brightnessRaw:'旺'},
    {name:'左辅',type:'lucky'},
    {name:'擎羊',type:'sha'},
    {name:'武曲',type:'major',siHua:'禄'},
  ];
  palaces[4].stars = [{name:'天府',type:'major'}];
  palaces[6].stars = [{name:'太阳',type:'major',siHua:'忌'}];
  palaces[8].stars = [{name:'天梁',type:'major'}];
  palaces[0].selfSihua = [{starName:'紫微',siHua:'权'}];
  return {
    birthInfo:{year:1995,month:10,day:25,hour:6,gender:'male'},
    lunarInfo:{lunarYear:1995,lunarMonth:9,lunarDay:1,yearStem:1,yearBranch:11,isLeapMonth:false},
    mingGongBranch:0,shenGongBranch:4,wuxingJu:2,wuxingJuName:'水二局',ziweiPos:0,
    palaces,daXians:[{startAge:24,endAge:33,palaceBranch:0,palaceName:'命宫',siHua:{stemIndex:0,stemName:'甲',lu:'廉贞',quan:'破军',ke:'武曲',ji:'太阳'}}],
    currentAge:31,currentDaXianIndex:0,mingZhu:'贪狼',shenZhu:'天相',
  };
}

test('solar/lunar conversion preserves known new-year and leap-month dates', () => {
  assert.deepEqual(lunarToSolar(2024,1,1),{year:2024,month:2,day:10});
  assert.deepEqual(lunarToSolar(2023,2,1,true),{year:2023,month:3,day:22});
  assert.equal(isValidLunarDate(2024,2,1,true),false);
  assert.equal(lunarToSolar(2024,2,1,true),null);
  assert.equal(lunarMonthDayCount(2024,13),0);
  assert.equal(lunarToSolar(1899,1,1),null);
});

test('clock correction is reversible in direction and never silently crosses midnight', () => {
  assert.equal(clockToStandardDelta(480,420),-60);
  assert.deepEqual(shiftClock({clockHour:'12',clockMinute:'30'},-60),{clockHour:'11',clockMinute:'30'});
  assert.equal(shiftClock({clockHour:'00',clockMinute:'20'},-60),null);
  assert.equal(shiftClock({clockHour:'23',clockMinute:'50'},20),null);
  assert.equal(shiftClock({clockHour:'24',clockMinute:'00'},-30),null);
  assert.equal(formatClock({clockHour:'3',clockMinute:'5'}),'03:05');
});

test('star interpretation includes palace-specific context and avoids deterministic claims', () => {
  const text = interpretStar({name:'紫微',type:'major'},'夫妻');
  assert.match(text,/Trong cung 夫妻/);
  assert.match(text,/quan hệ lâu dài|người đồng hành|giao tiếp/i);
});

test('palace analysis keeps natal stars, self-transformations, opposite and major-period layers distinct', () => {
  const chart = makeChart();
  const ming = chart.palaces[0];
  const result = analyzePalace(chart,ming);
  assert.match(result.overview,/紫微/);
  assert.match(result.evidence.join('\n'),/Chính tinh tọa thủ/);
  assert.ok(result.interactions.some(x=>x.includes('Tự Hóa')));
  assert.ok(result.interactions.some(x=>x.includes('xung chiếu')));
  assert.match(result.currentPeriod,/Đại hạn hiện tại: 24–33 tuổi/);
  assert.match(result.currentPeriod,/Tứ Hóa đại hạn/);
  assert.ok(result.practical.length >= 3);
});

test('empty palace borrows only as reference and does not relabel borrowed stars as resident', () => {
  const chart = makeChart();
  const empty = chart.palaces[2];
  empty.isEmpty = true;
  empty.borrowedStars = ['天梁'];
  empty.borrowedFromName = '官禄';
  const result = analyzePalace(chart,empty);
  assert.match(result.starSynthesis,/vô chính diệu/);
  assert.match(result.starSynthesis,/không phải sao tọa thủ/);
  assert.ok(result.cautions.some(x=>x.includes('Không coi vô chính diệu')));
});

test('all twelve palace lenses return context instead of a generic star paragraph', () => {
  const chart = makeChart();
  for (const palace of chart.palaces) {
    const text = interpretStar({name:'紫微',type:'major'},palace.name);
    assert.ok(text.includes('Trong cung ' + palace.name), 'missing palace lens: ' + palace.name);
    assert.ok(text.length > 180, 'interpretation too short for ' + palace.name);
  }
});
