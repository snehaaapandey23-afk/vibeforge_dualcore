import React from 'react'

export type Role = 'candidate' | 'employee' | 'manager' | 'executive'

const initialRole: Role = 'candidate'

export const RoleContext = React.createContext<{
  role: Role
  setRole: (role: Role) => void
}>({
  role: initialRole,
  setRole: () => {}
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = React.useState<Role>(initialRole)
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRole() {
  return React.useContext(RoleContext)
}
