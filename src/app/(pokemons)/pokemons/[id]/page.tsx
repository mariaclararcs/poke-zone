import PokemonInfo from "@/components/pokemons/pokemon-info"
import Layout from "@/app/_layouts/root"

export default function PokemonDetailPage({
  params
}: {
  params: { id: string }
}) {
  return (
    <Layout>
      <PokemonInfo params={params} />
    </Layout>
  )
}