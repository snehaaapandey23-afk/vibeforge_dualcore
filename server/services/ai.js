// Mock AI services returning plausible responses for frontend integration

async function parseResume(text){
  // very naive extraction
  const lines = (text||'').split(/\n+/).slice(0,50)
  const skills = []
  const re = /\b(JavaScript|TypeScript|React|Node|Python|SQL|Mongo|AWS|Docker|Kubernetes)\b/gi
  lines.forEach(l=>{
    let m
    while((m = re.exec(l))){
      skills.push({ name: m[1] || m[0], confidence: Math.round(60 + Math.random()*40) })
    }
  })
  if (skills.length===0){
    skills.push({ name: 'Communication', confidence: 80 })
  }
  return { skills, summary: lines.slice(0,5).join(' ') }
}

function scoreSkills(skills){
  return skills.map(s=> ({ name: s.name, score: Math.round((s.level||50) * (0.8 + Math.random()*0.4)) }))
}

function teamCompatibility(team){
  // team: [{id, skills:[{name,level}]}]
  const score = Math.round(50 + Math.random()*50)
  return { score, breakdown: team.map((m,i)=>({ memberId: m.id||i, fit: Math.round(40+Math.random()*60) })) }
}

function predictRisk(payload){
  return { riskScore: Math.round(10+Math.random()*80), reasons: ['low engagement','skill-mismatch'] }
}

function recommendCareer(payload){
  return { recommendations: [ { title: 'Senior Frontend Engineer', match: 0.87 }, { title: 'Product Engineer', match: 0.66 } ] }
}

function matchMentor(payload){
  return { mentors: [ { id: 'm1', name: 'A. Mentor', specialty: 'Leadership', score: 0.9 } ] }
}

function simulateWorkforce(payload){
  return { projection: { headcount: 120 + Math.round(Math.random()*30), cost: 1200000 } }
}

module.exports = { parseResume, scoreSkills, teamCompatibility, predictRisk, recommendCareer, matchMentor, simulateWorkforce }
