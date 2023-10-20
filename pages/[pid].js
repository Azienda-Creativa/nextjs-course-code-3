import React, { Fragment } from "react"
import fs from "fs/promises"
import path from "path"

export default function ProductDetailPage() {
  const { loadedProduct } = props
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const productId = params.pid

  const dataPath = path.join(process.cwd(), "data", "dummy-data.json")
  const jsonData = await fs.readFile(dataPath)
  const data = JSON.parse(jsonData)

  const product = data.product.find((product) => product.id === productId)
}
