import { getCategories } from "../_actions/getCategories";
import CategoryCard from "./CategoryCard";


export default async function CategorySection() {
  const categories = await getCategories();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Browse by Category
          </h2>

          <p className="mt-3 text-muted-foreground">
            Find the perfect property that suits your lifestyle.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </div>
    </section>
  );
}