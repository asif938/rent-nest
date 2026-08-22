import { getCategories } from "../_actions/getCategories";
import CategoryCard from "./CategoryCard";


export default async function CategorySection() {
  const categories = await getCategories();

  return (
    <section className="py-20">
      <div className="container">

        <div className="mb-12 text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Categories
          </span>

          <h2 className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
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