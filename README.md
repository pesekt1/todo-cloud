[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/pesekt1/todo-cloud)

# Todo web application demo for IT Infrastructure course

Clone the repository - for example using VS Code.

The demo supports local development and deployment to Azure Kubernetes Service (AKS).

## Environment needed to run React.js and node.js express applications

- **Node.js 22** (for the frontend, API, and Azure Function)
- **npm** (comes with Node.js)
- **Azure Functions Core Tools v4** (to run the Function locally)
- Optionally, a code editor like **VS Code**

To check if Node.js and npm are installed, run:

```bash
node -v
npm -v
```

## Install the dependencies:

For `todo-app`, `todo-api`, and `todo-functions`, run:

```bash
npm install
```

## Set up environment variables

In the `todo-api` folder, create a `.env` file with the following content:

```
MONGO_URI=mongodb://localhost:27017/todos
```

In the `todo-app` folder, create a `.env` file with the following content:

```
VITE_API_URL=http://localhost:5000
VITE_STATISTICS_URL=http://localhost:7071
```

In `todo-functions`, copy `local.settings.json.example` to `local.settings.json`.
Set `MONGO_URI` to the **same database** used by `todo-api`. The file is local
and must not be committed. The example allows the frontend origin
`http://localhost:3000`; update `Host.CORS` if the frontend uses a different origin.

## Run the application

In the todo-api folder, run:

```bash
npm start
```

In the todo-app folder, run:

```bash
npm run dev
```

In the todo-functions folder, run:

```bash
npm start
```

The Function serves `GET http://localhost:7071/api/statistics`. It returns
`total`, `completed`, and `pending` from the `todos` collection; an empty
collection returns zeros. The frontend refreshes these counts after creating,
completing, or deleting a todo. If the Function is unavailable, the todo app
still runs and shows a statistics error.

Run `npm test` in `todo-functions` to test against a temporary MongoDB instance.
The first test run downloads a MongoDB binary.

**Note:** Starting `todo-api` runs its existing seed script, which deletes and
replaces todos in the configured database. Do not start it against data you
need to keep.

## Running MongoDB Server

locally:

- install MongoDB Community Server.
- install MongoDB Compass.

## Docker compose

run the multi-container setup:

```bash
docker-compose up -d
```

Run the Function separately as described above. For the default Compose
configuration, set its `MONGO_URI` to `mongodb://localhost:27018/todosDB`.
The browser uses `http://localhost:7071` for the Function by default; override
`VITE_STATISTICS_URL` when starting Compose if needed.

NOTE: If the api starts before MongoDB is ready, you might need to restart the todo-api container because it won't be able to connect to the database initially.

NOTE: If you don't install the dependencies for the todo-api, the container will not work because it needs some of the devDependencies to run properly but the dockerfile only installs production dependencies.

## Azure Kubernetes Service (AKS) deployment

Deploy the frontend and API to AKS alongside an Azure Function App and a shared
Cosmos DB database. See the [AKS deployment and CI/CD guide](docs/cicd-aks-acr.md)
for setup and deployment instructions. Azure deployment creates billable resources.
The deploy script configures the GitHub identity, service URLs, CORS, and workflows
automatically after the code is pushed to `main`.

## Local Kubernetes Setup

kubernetes folder contains the necessary manifests.

kubernetes.deployment.sh shell script automates the deployment process to the local Kubernetes cluster.

Run:

```bash
bash kubernetes.deployment.sh
```

All the services are port-forwarded to localhost, so we can access them via http://localhost:3000 for the todo-app and http://localhost:5000 for the todo-api. MongoDB is accessible at localhost:27018. Run the Function separately with `MONGO_URI=mongodb://localhost:27018/todosDB`, and use an updated todo-app image containing the statistics component.

NOTE: If the api starts before MongoDB is ready, you might need to restart the todo-api container because it won't be able to connect to the database initially.

To terminate all services:

```bash
kubectl delete -f kubernetes/
```
