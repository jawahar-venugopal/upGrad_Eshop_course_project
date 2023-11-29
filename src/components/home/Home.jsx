import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Login from "../login/Login";
import Error from "../error/Error";
import SignUp from "../signup/SignUp";
import Footer from "../footer/Footer";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import ProductCategory from "../productCategory/ProductCategory";
import ProductDetails from "../productDetails/ProductDetails";
import ProductPage from "../productPage/ProductPage";
import ProductSorting from "../productSorting/ProductSorting";
import ProductListing from "../productListing/ProductListing";
import BroadcastAlert from "../broadcastAlert/BroadcastAlert";
import {createProduct, modifyProduct} from "../../api/productAPIs";
import NavBar from "../navBar/NavBar";
import PlaceOrder from "../placeOrder/PlaceOrder";

const Home = () => {
	return (
		<Router>
			<NavBar />
			<Container maxWidth={false} sx={{ marginBottom: "30px", marginTop: "85px" }}>
				<Grid container spacing={2} sx={{ paddingTop: "24px" }}>
					<Routes>
						<Route
							path="/"
							element={
								<Navigate to="/home" />
							}
						/>
						<Route
							path="/home"
							element={
								<ProtectedRoute>
									<Box sx={{ flexGrow: 1 }}>
										<Grid container spacing={1}>
											<Grid container item spacing={3}>
												<Grid item xs={12}>
													<div style={{ display: 'flex', justifyContent: 'center' }}>
														<ProductCategory />
													</div>
												</Grid>
												<Grid item xs={12}>
													<div style={{ display: 'flex', justifyContent: 'left', paddingLeft: "1%" }}>
														<ProductSorting />
													</div>
												</Grid>
												<ProductListing />
											</Grid>
										</Grid>
									</Box>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/login"
							element={
								<Login />
							}
						/>
						<Route
							path="/signup"
							element={
								<SignUp />
							}
						/>
						<Route
							path="/product/add"
							element={
								<ProtectedRoute role={["ADMIN"]}>
									<ProductPage
										mode={"CREATE"}
										buttonText="SAVE PRODUCT"
										headingText="Add Product"
										callbackFunction={createProduct}
									/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/product/modify"
							element={
								<ProtectedRoute role={["ADMIN"]}>
									<ProductPage
										mode={"MODIFY"}
										buttonText="MODIFY PRODUCT"
										headingText="Modify Product"
										callbackFunction={modifyProduct}
									/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="/product/view"
							element={
								<ProtectedRoute >
									<ProductDetails />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/product/order"
							element={
								<ProtectedRoute >
									<PlaceOrder	/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="*"
							element={
								<Error />
							}
						/>
					</Routes>
				</Grid>
			</Container>
			<Footer />
			<BroadcastAlert />
		</Router>
	);
};

export default Home;