import Card from "@/components/Card";

export type IProduct = {
  name: string;
  price: number;
};

export default function Home() {
  const products: IProduct[] = [
    {
      name: "Product 1",
      price: 300,
    },
    {
      name: "Product 2",
      price: 300,
    },
    {
      name: "Product 3",
      price: 300,
    },
    {
      name: "Product 4",
      price: 300,
    },
    {
      name: "Product 5",
      price: 300,
    },
    {
      name: "Product 6",
      price: 300,
    },
  ];

  return (
    <div className="my-12">
      <div className="text-center mb-8">
        <button className="btn btn-accent">Create New</button>
      </div>
      <div className="grid lg:grid-cols-3 justify-items-center gap-4">
        {products.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
