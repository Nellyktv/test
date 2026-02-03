export type StoreThing = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export type BasketThing = StoreThing & {
  amount: number
}


export type typeLinksData = {
id:number,
linkSrc:string,
nameLink:string,
}

export type typeRoutesData= {
  id: number,
  path: string,
  nameElement: React.ComponentType,
};


export type sortOption = {
  value: string;
  label: string;
};
