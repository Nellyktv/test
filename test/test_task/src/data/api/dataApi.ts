import axios from "axios"
import type { StoreThing } from "../../types/model"

const ROOT = "https://fakestoreapi.com"

export const loadAllStuff = async (): Promise<StoreThing[]> => {
  const res = await axios.get(ROOT + "/products")
  return res.data
}

export const loadGroups = async (): Promise<string[]> => {
  const res = await axios.get(ROOT + "/products/categories")
  return res.data
}