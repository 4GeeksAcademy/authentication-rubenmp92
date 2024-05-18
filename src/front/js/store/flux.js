const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			signupSuccesful: null,
			authentication:false, //Tiene que estar falso para que no esté logado nada más entrar en la web
		},
		actions: {

			login: (email,password) => {
				// console.log("login desde flux", email, password)
				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						"email": email,
						"password": password
					  })
				  };
				  
				  fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
				  .then((response) => {
					console.log(response.status)
					if (response.status==200){
						setStore({ authentication: true });
					}
					return response.json()
				  })
				  .then((data) => {
					localStorage.setItem("token", data.token)
					localStorage.setItem("email", data.user.email)
					sessionStorage.setItem("token", data.token)
					sessionStorage.setItem("email", data.user.email)
					// console.log("DATA Login-->", data)
					// console.log("TOKEN", data.token)
				  })
				  .catch((error) => {console.error(error)
				 });
			},

			addUser: async (email, password) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
			
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", requestOptions);
					const data = await response.json();
			
					if (response.ok) {
					 
						setStore({ signupSuccesful: "Successful registration! Now you can log in." });
						return true;
					} else if (response.status === 400 && data.msg === "User already exists") {
					 
						return false;
					} else {
					 
						throw new Error(data.msg || "There was a problem processing your request. Please try again later.");
					}

					
				} catch (error) {
 
					console.error("Error registering user:", error);
					throw new Error("There was a problem processing your request. Please try again later.");
				}
			},
			 
			
			privateZone: async () => {
					try {
						const token = localStorage.getItem('token');
						
						const requestOptions = {
							method: 'GET',
							headers: { 
								"Content-Type": "application/json",
								'Authorization': 'Bearer ' + token
							} 
						};
	
						const resp = await fetch(process.env.BACKEND_URL + "/api/protected", requestOptions);
	
						if (!resp.ok) {
							throw new Error("There was a problem in the login request");
						} else if (resp.status === 403) {
							throw new Error("Missing or invalid token");
						}
	
						const data = await resp.json();
						console.log("This is the data you requested", data);
						return data;
					} catch (error) {
						console.error(error);
					
					}
				
			},

			logout: ()=>{
				setStore({ authentication: false });
				localStorage.removeItem("token");
				localStorage.removeItem("email");
				sessionStorage.removeItem("email");
				localStorage.removeItem("token");
			}
		}
	};
};

export default getState;
