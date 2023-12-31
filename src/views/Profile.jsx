import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";


export const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [cantidadPlataAgregar, setCantidadPlataAgregar] = useState(0);
  const [plataBilletera, setPlataBilletera] = useState(0);

  const accessToken = getAccessTokenSilently();


  useEffect(() => {
    const datosPlata = {
      user_id: user.sub,
      plata: 0,
		};

    const accessToken = getAccessTokenSilently({
      authorizationParams: {
        audience: 'grupo11.me/api',
      },
    });
  
    accessToken.then(result => {axios.post(`https://7opxtzovvg.execute-api.us-east-1.amazonaws.com/testStage/add_money`, datosPlata, {

    console.log("accessToken.__raw", accessToken.__raw);
		axios.post(`https://7opxtzovvg.execute-api.us-east-1.amazonaws.com/testStage/add_money`, datosPlata, {
			headers: {
				'Authorization': 'Bearer ' + result,
			}})
		.then((response) => {
      setPlataBilletera(response.data);
		})
		.catch((error) => {
			console.log("\nError en archivo Profile.jsx en la consulta axios.post a /add_money/");
			console.log(error);
		});})
		
  }, []);


  const agregar_plata = (user) => {
		const datosPlata = {
      user_id: user.sub,
      plata: parseFloat(cantidadPlataAgregar),
		};

    const accessToken = getAccessTokenSilently({
      authorizationParams: {
        audience: 'grupo11.me/api',
      },
    });
  
    accessToken.then(result => {axios.post(`https://7opxtzovvg.execute-api.us-east-1.amazonaws.com/testStage/add_money`, datosPlata, {

		axios.post(`https://7opxtzovvg.execute-api.us-east-1.amazonaws.com/testStage/add_money`, datosPlata, {
			headers: {
				'Authorization': 'Bearer ' + result,
			}})
		.then((response) => {
      setPlataBilletera(response.data);
		})
		.catch((error) => {
			console.log("\nError en archivo Profile.jsx en la consulta axios.post a /add_money/");
			console.log(error);
		});})
	  };

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
          <h2>Bienvenid@, {user.name}</h2>
        </Col>
        <Col md>
          <p>Actualmente tienes en tu billtera virtual</p>
          <p>{plataBilletera.toFixed(2)}</p>
        </Col>
        <Col md>
          <p>Agrega un monto a tu billetera virtual</p>
          <input
          type="number"
          placeholder="Cantidad de plata"
          value={cantidadPlataAgregar}
          onChange={(e) => setCantidadPlataAgregar(e.target.value)}
          className="input"
          />
        </Col>
        <button className="boton" onClick={() => agregar_plata(user)}>Agregar plata</button>
      </Row>
      <Link to="/empresas"><button className="boton">Ver empresas</button></Link>
      <LogoutButton/>
    </Container>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
