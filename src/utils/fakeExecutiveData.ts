export function generateExecutiveData(){
  const departments = ['Engineering','Product','Design','Data','Ops']
  const days = 30
  const orgHealthHistory = Array.from({length: days}).map((_,i)=> Math.round(72 + Math.sin(i/6)*6 + (Math.random()*6-3)))
  const retentionByDept = departments.reduce((acc, d)=> { acc[d] = Math.round(5 + Math.random()*18); return acc }, {} as Record<string, number>)
  const skillNames = ['ML Ops','NLP','RL','Systems','Research','Safety']
  const skillReadiness = skillNames.reduce((acc,s)=> { acc[s] = Math.round(40 + Math.random()*50); return acc }, {} as Record<string, number>)
  const leadershipLevels = ['IC','Team Lead','Director','VP']
  const leadership = { levels: leadershipLevels.map(l=> ({ level: l, count: Math.max(1, Math.round(Math.random()*8)) })), pipelineScore: Math.round(50 + Math.random()*45), delta: (Math.random()*6-3).toFixed(1) }
  return {
    departments,
    orgHealth: { score: orgHealthHistory[orgHealthHistory.length-1], delta: Math.round((orgHealthHistory[orgHealthHistory.length-1] - orgHealthHistory[orgHealthHistory.length-8])||0), history: orgHealthHistory },
    retention: { overall: Math.round(Object.values(retentionByDept).reduce((a,b)=>a+b,0)/departments.length), delta: Math.round((Math.random()*6-3)), byDept: retentionByDept },
    skillReadiness: { avg: Math.round(Object.values(skillReadiness).reduce((a,b)=>a+b,0)/skillNames.length), delta: Math.round((Math.random()*6-3)), bySkill: skillReadiness },
    leadership,
    leadershipLevels,
    skills: skillNames
  }
}
