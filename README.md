## ❤️ MEVN Stack Boilerplate

### ✨ Mongodb, ExpressJS, Vue 3, Node

This is a `MEVN stack boilerplate` that contains `Mongodb`, `ExpressJS`, `Vue 3`, `NodeJS`. Additionally, you can find `Nuxt3` (not yet), `TipTap` (Headless WYSIWYG Text Editor), `Vuetify` (A Material Design Framework for Vue.js), and `Vuexy` (Admin dashboard with Vue 3) in this repo.

I have started to create this repo as an admin dashboard. I hope that I will probably publish the user interface with `Nuxt 3`.

###  ☝️ .end file in the `server` folder

You should create a .enf file in the server folder.

```
NODE_ENV = development
DB_URL = YourMongoDBURL
API_PREFIX = /api/v1.0.0/
AUTH_SECRET = YourSecretStringForAPILike-----KvKiA2mMjxGO25Diiibz
API_PORT = 3000
```

###  ☝️ .end file in the `admin` folder

You should create a .enf file in the admin folder.

```
VITE_API_ENDPOINT=http://localhost:3000/api/v1.0.0/
```

### 🛠️ How?

- `cd server`
- `yarn install`
- `nodemon server.js`

- `cd admin`
- `yarn install`
- `yarn dev`

### 📷 Screenshots
