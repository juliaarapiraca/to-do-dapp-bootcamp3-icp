import { useState } from 'react';
import {createActor, to_do_backend} from 'declarations/to_do_backend';
import {AuthClient} from "@dfinity/auth-client"
import {HttpAgent} from "@dfinity/agent";

let actorLoginBackend = to_do_backend;

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
          
          return window.location.href = "/tarefas/"; 

        },
        
        windowOpenerFeatures: `
                                left=${window.screen.width / 2 - 525 / 2},
                                top=${window.screen.height / 2 - 705 / 2},
                                toolbar=0,location=0,menubar=0,width=525,height=705
                              `,
      });
      
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

export default login;