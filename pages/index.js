import fs from "fs/promises"
import path from "path"

export default function HomePage(props) {
  const { products } = props
  return (
    <ul>
      {products.map((product) => (
        <li key={products.id}>
          <h1>{product.title}</h1>
        </li>
      ))}
    </ul>
  )
}
export async function getStaticProps() {
  console.log("Genereting")
  const dataPath = path.join(process.cwd(), "data", "dummy-data.json")
  const jsonData = await fs.readFile(dataPath)
  const data = JSON.parse(jsonData)

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}
