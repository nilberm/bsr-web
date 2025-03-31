import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  isDefault: boolean
}

const fetchCategories = async (type?: 'income' | 'expense'): Promise<Category[]> => {
  const response = await api.get('/categories', {
    params: type ? { type } : {},
  })
  return response.data
}

export const useCategories = (type?: 'income' | 'expense') => {
  return useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetchCategories(type),
  })
}
