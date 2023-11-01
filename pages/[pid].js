import React, { Fragment } from "react"
import fs from "fs/promises"
import path from "path"

export default function ProductDetailPage(props) {
  const { loadedProduct } = props
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  )
}

export async function getStaticProps(context) {
  // get id for pre-rendering page on server
  const { params } = context
  const productId = params.pid
  //parse json data
  const dataPath = path.join(process.cwd(), "data", "dummy-data.json")
  const jsonData = await fs.readFile(dataPath)
  const data = JSON.parse(jsonData)
  // find product by id
  const product = data.products.find((product) => product.id === productId)

  return {
    props: {
      loadedProduct: product,
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }, { params: { pid: "p2" } }, { params: { pid: "p3" } }],
    fallback: false,
  }
}
