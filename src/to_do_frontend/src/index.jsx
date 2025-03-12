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

        },
        
        windowOpenerFeatures: `
                                left=${window.screen.width / 2 - 525 / 2},
                                top=${window.screen.height / 2 - 705 / 2},
                                toolbar=0,location=0,menubar=0,width=525,height=705
                              `,
      });
      
      return false;
      
  };

function index() {
  
  return (           

    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">TO-DO</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Controle suas tarefas 100% onchain na ICP!</p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                <button id="login" onClick={login} class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    ENTRAR 
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </button>
            </div>
        </div>
    </section>

  );
};

export default index; 