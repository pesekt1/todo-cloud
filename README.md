# Todo web application demo for IT Infrastructure course

Clone the repository - for example using VS Code.

## Environment needed to run React.js and node.js express applications

- **Node.js** (recommended version 18.x or later)
- **npm** (comes with Node.js)
- Optionally, a code editor like **VS Code**

To check if Node.js and npm are installed, run:

```bash
node -v
npm -v
```

## Install the dependencies:

for both todo-app and todo-api folders, run:

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
```

## Run the application

In the todo-api folder, run:

```bash
npm start
```

In the todo-app folder, run:

```bash
npm run dev
```

## Running MongoDB Server

locally:

- install MongoDB Community Server.
- install MongoDB Compass.

## Docker compose

run the multi-container setup:

```bash
docker-compose up -d
```

NOTE: If you don't install the dependencies for the todo-api, the container will not work because it needs some of the devDependencies to run properly but the dockerfile only installs production dependencies.

## Local Kubernetes Setup

kubernetes folder contains the necessary manifests.

kubernetes.deployment.sh shell script automates the deployment process to the local Kubernetes cluster.

Run:

```bash
bash kubernetes.deployment.sh
```

All the services are port-forwarded to localhost, so we can access them via http://localhost:3000 for the todo-app and http://localhost:5000 for the todo-api. MongoDB is accessible at localhost:27017, for example using MongoDB Compass or any other MongoDB client.

To terminate all services:

```bash
kubectl delete -f kubernetes/
```
