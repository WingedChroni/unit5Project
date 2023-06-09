import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import Categories from "../../Components/Categories/Categories";
import ProductCard from "../../Components/ProductCard/ProductCard";

function Homepage() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("https://fakestoreapi.com/products/categories")
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => console.log(err));
		axios
			.get("https://fakestoreapi.com/products")
			.then((res) => {
				setProducts(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="Homepage-container">
			<div className="categories-container">
				<Categories category="All" setProducts={setProducts} />
				{categories.map((category, index) => (
					<Categories
						key={index}
						category={category}
						setProducts={setProducts}
					/>
				))}
			</div>
			<div className="products-container">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

export default Homepage;
