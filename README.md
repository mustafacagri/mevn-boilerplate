## ❤️ MEVN Stack Boilerplate

### ✨ Mongodb, ExpressJS, Vue 3, Node

This is a `MEVN stack boilerplate` that contains `Mongodb`, `ExpressJS`, `Vue 3`, `NodeJS`. Additionally, you can find `Nuxt3`, `TipTap` (Headless WYSIWYG Text Editor), `Vuetify` (A Material Design Framework for Vue.js), and `Vuexy` (Admin dashboard with Vue 3) in this repo. This repo aims to be most comprehensive mevn stack boilerplate. Thus, please do not hesitate to contribute to this repo with comments or PRs.

I have started to create this repo as an admin dashboard. Now, there is a client side for this repo with `Nuxt 3`.

Open Source ❤

###  ☝️ .env file in the `server` folder

You should create a .env file in the server folder.

```
NODE_ENV = development
DB_URL = YourMongoDBURL
API_PREFIX = /api/v1.0.0/
AUTH_SECRET = YourSecretStringForAPILike-----KvKiA2mMjxGO25Diiibz
API_PORT = 3000

CLIENT_URL = http://localhost:3001/

NODEMAILER_HOST = YourMailServer
NODEMAILER_PORT = 465
NODEMAILER_SECURE = true
NODEMAILER_SENDERNAME = YourName
NODEMAILER_USER = YourMailAddress
NODEMAILER_PASS = YourPassword
```

###  ☝️ .env file in the `admin` folder

You should create a .env file in the admin folder.

```
VITE_API_ENDPOINT=http://localhost:3000/api/v1.0.0/
VITE_API_DOMAIN=http://localhost:3000/
```

###  ☝️ .env file in the `client` folder

You should create a .env file in the `client` folder.

```
VITE_API_ENDPOINT=http://localhost:3000/api/v1.0.0/
VITE_API_ENDPOINTHOST=http://localhost:3000/
```

### 🛠️ How?

- `cd server`
- `yarn install`
- `nodemon server.js`

- `cd admin`
- `yarn install`
- `yarn dev`

- `cd client`
- `yarn install`
- `yarn dev`

#### How can run the server and UI together

`yarn start`

That's all. It will run these scripts => `(cd server; yarn dev;) & (cd admin; yarn dev) & (cd client; yarn dev)` parallelly.

### How can I support?

⭐ Star my GitHub repo

🛠 Create pull requests, submit bugs, suggest new features or updates

### 📰 Blog Post

- https://mustafacagri.medium.com/mevn-stack-boilerplate-vue-3-nuxt-3-express-js-node-js-vuetify-pinia-ad6849ba4ee5

### 📷 Screenshots

https://github.com/mustafacagri/mevn-boilerplate/assets/7488394/aca14f0a-af96-4019-8be2-ad9d13f3e9d7

`The video has been added on September 24, 2023`

<img width="505" alt="MEVN Stack Boilerplate Admin Dashboard Vuetify Vuexy" src="https://user-images.githubusercontent.com/7488394/210179097-002b793f-91b7-46b5-ad6c-3a7f8705e09b.png">
<img width="1440" alt="MEVN Boilerplate Create Post" src="https://user-images.githubusercontent.com/7488394/210179099-01601056-b337-47f1-a16f-0a33d904d594.png">
<img width="1434" alt="MEVN Stack Boilerplate Data Table" src="https://user-images.githubusercontent.com/7488394/210179100-84f6f8b1-fc51-45b0-b170-62030b0d5adc.png">
<img width="1440" alt="MEVN Stack Boilerplate Fetch Data From Express.js" src="https://user-images.githubusercontent.com/7488394/210179107-b5d1082c-7c59-4f06-b2a7-ac68ec725148.png">
<img width="1440" alt="MEVN Boilerplate MongoDB Express Vuetify Vue 3 Nuxt 3 Vuexy" src="https://user-images.githubusercontent.com/7488394/210179108-596b3598-ab26-47b9-a507-3c0291b86d0f.png">
<img width="1440" alt="MEVN Boilerplate TipTap Text Editor Vue 3" src="https://user-images.githubusercontent.com/7488394/210179111-7119db65-e120-432d-825a-f27ad1e72285.png">
<img width="1440" alt="MEVN Stack Boilerplate Vue 3 Nuxt 3 Admin Dashboard" src="https://user-images.githubusercontent.com/7488394/210179112-3d8ac314-38c0-4b8a-ab69-9dadba33f5dc.png">

#### 📷 Screenshots - Client

<img width="1440" alt="MEVN Stack Boilerplate - Client Nuxt 3" src="https://user-images.githubusercontent.com/7488394/215284742-27f43a47-a5fe-4fc1-9610-cc315c204ed7.png">


![mevn client nuxt3 membership & support ticket](https://github.com/mustafacagri/mevn-boilerplate/assets/7488394/0eac8ddb-d692-48de-8ab9-b31f57a30e68)

- Sign in / up functionality has been added to the client!
- A support ticket system has been added to the client!

