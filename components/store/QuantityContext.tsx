'use client'

import { createContext, useContext, useState } from 'react'

interface QuantityContextValue {
  quantity: number
  setQuantity: (n: number) => void
}

const QuantityContext = createContext<QuantityContextValue>({ quantity: 1, setQuantity: () => {} })

export function QuantityProvider({ children }: { children: React.ReactNode }) {
  const [quantity, setQuantity] = useState(1)
  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </QuantityContext.Provider>
  )
}

export function useQuantity() {
  return useContext(QuantityContext)
}
