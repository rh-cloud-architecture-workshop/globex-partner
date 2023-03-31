# GlobexPartner

# Run in local 
npm run dev:ssr

# Parameters needed

# signup on Developer portal to get the following 3 value
export API_CLIENT_ID="<client-id>" 
export API_CLIENT_SECRET="<API_CLIENT_SECRET>"
export API_TOKEN_URL='https://URL/auth/realms/REALM_NAME/protocol/openid-connect/token'


# partner-gateway URL
export API_GET_PAGINATED_PRODUCTS="<3scale protected URL>"

# needed to run docker image
NODE_ENV=prod
PORT=8080
n
