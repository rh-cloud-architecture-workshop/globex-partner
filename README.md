# GlobexPartner

# Run in local 
npm run dev:ssr

# Parameters needed

## Signup on Developer portal to get the following 3 values

API_CLIENT_ID

API_CLIENT_SECRET

API_TOKEN_URL ->  token_endpoint from  well-known/openid-configuration of the realm

## partner-gateway URL 

GLOBEX_PARTNER_GATEWAY -> 3scale protected URL from 3scale develpper portal

## needed to run docker image 

NODE_ENV -> always "prod" on openshift

PORT -> always "8080" on openshift


## docker

docker build -t quay.io/cloud-architecture-workshop/globex-partner-web:<checkin-tag> .

docker push quay.io/cloud-architecture-workshop/globex-partner-web:<checkin-tag>
