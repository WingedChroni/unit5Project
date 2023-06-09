import React from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LikesContext } from "../../context/LikesContext";
import { useContext, useEffect, useState } from "react";

function ProductDetails() {
	const { likes, setLikes, addItem, removeItem } = useContext(LikesContext);
	const [addOrRemove, setAddOrRemove] = useState(false);

	const [product, setProduct] = React.useState({});

	const { productId } = useParams();

	useEffect(() => {
		axios
			.get(`https://fakestoreapi.com/products/${productId}`)
			.then((res) => {
				//make sure my data is here
				const data = res.data;
				setProduct(data);

				setAddOrRemove(likes.find((item) => item.id === data?.id));
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		setAddOrRemove(likes.find((item) => item.id === product.id));
	}, [likes]);

	return (
		<div className="details-container">
			<div className="details-image-container">
				<img src={product?.image} alt="" />
			</div>
			<div className="product-info">
				<h2>{product?.title}</h2>
				<h2>{product?.price}€</h2>
				<h3>Description</h3>
				<p>{product?.description}</p>
				<div className="details-button-container">
					{addOrRemove ? (
						<button onClick={() => removeItem(product.id)}>
							Remove from Cart
						</button>
					) : (
						<button onClick={() => addItem(product)}>Add to Cart</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default ProductDetails;
