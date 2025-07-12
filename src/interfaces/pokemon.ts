export interface IPokemon {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  sprites: {
    front_default: string
    front_shiny: string
    other: {
      'official-artwork': {
        front_default: string
        front_shiny: string
      }
      home: {
        front_default: string
        front_shiny: string
      }
    }
  }
  stats: {
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }[]
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  abilities: {
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }[]
  moves: {
    move: {
      name: string
      url: string
    }
    version_group_details: {
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      version_group: {
        name: string
        url: string
      }
    }[]
  }[]
}