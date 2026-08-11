export type TeamMember = {
  id: string
  name: string
  role: string
  skills: Record<string, number>
  availability: number
}

export function generateManagerData(){
  const skills = ['Planning','NLP','Vision','RL','Safety','Search','Scripting']
  const names = ['Astra','Bax','Cleo','Dimitri','Elio','Faye','Galen','Hana','Ivo','Juno']
  const roles = ['Agent','Agent','Agent','Agent','Specialist']
  const members: TeamMember[] = names.map((n,i)=>{
    const skillRecord: Record<string, number> = {}
    skills.forEach(s=> skillRecord[s] = Math.max(8, Math.round((Math.random()*0.9 + (i%3)/3) * 100)))
    return { id: `m-${i}`, name: n, role: roles[i % roles.length], skills: skillRecord, availability: Math.round(Math.random()*100) }
  })
  return { skills, members }
}
