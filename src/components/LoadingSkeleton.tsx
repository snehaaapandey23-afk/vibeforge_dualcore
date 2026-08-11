import React from 'react'

export default function LoadingSkeleton({ lines = 3 }: { lines?: number }){
  return (
    <div className="space-y-3">
      {Array.from({length: lines}).map((_,i)=> (
        <div key={i} className="h-4 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded w-full animate-pulse" />
      ))}
    </div>
  )
}
