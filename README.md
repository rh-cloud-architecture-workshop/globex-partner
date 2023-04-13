# GlobexPartner

# Run in local 
npm run dev:ssr

# Parameters needed

<!-- Signup on Developer portal to get the following 3 values -->
export API_CLIENT_ID="<client-id>" 
export API_CLIENT_SECRET="<API_CLIENT_SECRET>"
export API_TOKEN_URL="<<token_endpoint from  well-known/openid-configuration of the realm>>"
<!-- partner-gateway URL -->
export GLOBEX_PARTNER_GATEWAY="<3scale protected URL>"
<!-- needed to run docker image -->
NODE_ENV=prod
PORT=8080


# docker
docker built -t quay.io/cloud-architecture-workshop/globex-partner-web:<checkin-tag> .
docker push quay.io/cloud-architecture-workshop/globex-partner-web:<checkin-tag>
