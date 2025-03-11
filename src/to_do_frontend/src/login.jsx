import { useState } from 'react';
import {createActor, to_do_backend} from 'declarations/to_do_backend';
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";

let actorLoginBackend = to_do_backend;

function Login() {  

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  async function login() {

      
      let authClient = await AuthClient.create();

      
      await authClient.login({
        
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {   
          
          const identity = authClient.getIdentity();
          console.log(identity.getPrincipal().toText());       
          
          
          const agent = new HttpAgent({identity});
          
          actorLoginBackend = createActor(process.env.CANISTER_ID_LOGIN_BACKEND, {
              agent,
          });
          
          const principalText = await actorLoginBackend.get_principal_client();          
          setIsLoggedIn(true);
          document.getElementById("principalText").innerText = principalText;   

        },
        
        windowOpenerFeatures: `
                                left=${window.screen.width / 2 - 525 / 2},
                                top=${window.screen.height / 2 - 705 / 2},
                                toolbar=0,location=0,menubar=0,width=525,height=705
                              `,
      })
      
      return false;
      
  };

  async function logout() {
      const authClient = await AuthClient.create();        
      await authClient.logout();     
      document.getElementById("principalText").innerText = "";
      setIsLoggedIn(false);
  };  

  document.addEventListener("DOMContentLoaded", function() {    
     document.getElementById("logout").style.display = "none";
  });

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />      
      <div class="panel"> 
        {!isLoggedIn && <button id="login" onClick={login}>Login</button>}
        {isLoggedIn && <button id="logout" onClick={logout}>Logout</button>}
        <br/>
        <label id="principalText"></label>                  
      </div>
    </main>
  );
}

export default Login;