import './CategoryDropdown.css'

function CategoryDropdown({
  categories,
  selectedCategory,
  setSelectedCategory
}) {
  return (
    <div className="category-dropdown">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >

        <option value="">
          All Categories
        </option>

        {
          categories.map((category) => (

            <option
              key={category.CategoryId}
              value={category.CategoryId}
            >
              {category.CategoryName}
            </option>

          ))
        }

      </select>
    </div>
  )
}

export default CategoryDropdown