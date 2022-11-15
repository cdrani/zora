# zora
> [express](https://expressjs.com) app connected to [zora](https://docs.zora.co/docs/zora-api/intro) api &amp; [nextjs](https://nextjs.org) 
app to display data retrieved from express api

![image](https://user-images.githubusercontent.com/18746599/201979188-9fae8701-b74d-40f9-bf86-415be34b44a2.png)

## Usage
### Installation
Install the dependencies for the **api** && **app** via `yarn` (preferable) or `npm`:
```sh
cd api && yarn && cd ..

cd app && yarn && cd ..
```

### Dev
Start the servers for both **api** and **app** to run at the same time
#### API
```sh
cd api
cp .env.example .env
yarn start
```
This will start a server on `http://localhost:3001`. The **PORT** and other env variables can be be configured in the **.env** file. 

#### App
```sh
cd app
yarn dev
```

## Architecture

#### Express App
Simple express app with 2 routes:
1. **/** is simply for a test and displays a message as such
2. **/api/nft/:address** is the one used to send the following query to the Zora api based on the provided **address**:

```ts
const query = `
    query($ownerAddresses: [String!]) {
        tokens(networks: [{ network: ETHEREUM, chain: MAINNET }],
        where: { ownerAddresses: $ownerAddresses }) {
            nodes {
                token {
                    tokenId
                    metadata
                }
            }
        }
    }
`
```

The shape of the successResponse & failResponse is defined in the [methods](/api/helpers/methods.js) file.
Additionally, logs are captured within the [logs](/api/logs/) folder.

#### Nextjs App
This is a Nextjs generated typescript SPA with a single page :sweat_smile:.

### Directories of Interest

**[components](/app/components/)**: distinct piecemeal ui

**[commands](/app/commands/)**: Executes user actions. For example, the SearchCommand is executed on user form submission (SearchBar).

**[services](/app/services/)**: Currently limited to just data fetching functions.

**[api](/app/api/)**: Defines interfaces for APIResponse and handling of responses.  

**[stores](/app/stores/)**: Notably the ZoraStore is used to request data from the api route with the given address if cache is invalid, 
otherwise it retrieves cached data from localStorage
