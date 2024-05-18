import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/signup.css";
import "../../styles/login.css";
import "../../styles/private.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	 

	return (
		<div className="text-center mt-5">
			
			<h1>Rigo says:</h1>
			<p className="display-6">{store.authentication === true ? "You are already logged in, you can access the private area" : "You are not logged in, access your account or register"}</p>
			{store.signupSuccesful && <div className="alert alert-success">{store.signupSuccesful}</div>}
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
};
