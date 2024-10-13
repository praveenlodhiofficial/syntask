import Nylas from "nylas";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_SECRET_KEY!,    // ! is used to tell typescript that we are sure that the variable will be defined in the .env file
  apiUri: process.env.NYLAS_API_URI!
})                

export const nylasConfig = {
  clientId: process.env.NYLAS_CLIENT_ID!,
  redirectUri: process.env.NEXT_PUBLIC_URL + "/api/oauth/exchange",
  apiKey: process.env.NYLAS_API_SECRET_KEY!,
  apiUri: process.env.NYLAS_API_URI!
}

export default nylas; 