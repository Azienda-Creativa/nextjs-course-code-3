import fs from "fs/promises"
import Link from "next/link"
import path from "path"

export default function HomePage(props) {
  const { products } = props
  return (
    <ul>
      {products.map((product) => (
        <li key={products.id}>
          <Link href={`/${product.id}`}>
            <h1>{product.title}</h1>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export async function getStaticProps(context) {
  console.log("Genereting")
  const dataPath = path.join(process.cwd(), "data", "dummy-data.json")
  const jsonData = await fs.readFile(dataPath)
  const data = JSON.parse(jsonData)

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    }
  }

  if (data.products.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}
