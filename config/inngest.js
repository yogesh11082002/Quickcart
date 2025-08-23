import { Inngest } from "inngest";

export const inngest = new Inngest({id:'quickcart-next'})

// inngest  function to save user data

export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event:"clerk/user.created"
    }
)