//estilização
import { useState } from "react";
import "./style.css";
import api from "../../utils/api";
import secureLocalStorage from 'react-secure-storage'
import { useNavigate } from "react-router-dom"; // força uma navegaçao programatica


function Login() {
    

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')

function fazerLogin (event:any) {
    event.preventDefault()

    const usuario: object = {
        email: email,
        password: senha
    }
// post envia 
// response resposta da api
// promisse um dos tipos de funçao assincrona nao fica esperando a resposta
    api.post('login', usuario).then((response) => {
        console.log(response)


        // salvar no local storage
        // localStorage.setItem('user', response.data) 

        //npm i react-secure-storage extensao para salvar no localstorage
        secureLocalStorage.setItem('user', response.data)
        navigate('/perfil/' + response.data.user.id)
        
        // Recarrega a pagina e resgate no local storage o usuario logado
        navigate(0)
    })
    
}
    return (
      <div className="container">
  <div className="content first-content">
    <div className="first-column">
      <h2 className="title title-primary">Olá, amigo!</h2>
      <p className="description description-primary">Insira seus dados</p>
      <p className="description description-primary">
        e comece sua jornada conosco
      </p>
      <button id="signup" className="btn btn-primary">
        Registrar
      </button>
    </div>
    <div className="second-column">
      <h2 className="title title-second">SASC</h2>
      <div className="social-media"></div>
      <p className="description description-second">Preencha as informações:</p>
      <form onSubmit={ fazerLogin } className="form" method="POST">
        <label className="label-input" htmlFor="">
          {/* <i className="far fa-envelope icon-modify" /> */}
          <input type="email"
          onChange={ (event) => { setEmail(event.target.value) } } // pega o valor digitado e coloca como um valor
          placeholder="Email"
          required
           />
        </label>
        <label className="label-input" htmlFor="">
          {/* <i className="fas fa-lock icon-modify" /> */}
          <input type="password" 
          onChange={ (event) => { setSenha(event.target.value) } } // pega o valor digitado e coloca como um valor                   
          placeholder="Senha" 
          required
          />
        </label>
        <a className="password" href="#">
          esqueceu a senha?
        </a>
        <button className="btn btn-second">Entrar</button>
      </form>
    </div>
  </div>
</div>
    );
}

export default Login;