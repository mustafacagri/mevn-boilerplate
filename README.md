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

#### How can run the server and UI together

`yarn start`

That's all. It will run these scripts => `(cd server; yarn dev;) & (cd admin; yarn dev)` parallelly.

### 📷 Screenshots

<img width="505" alt="Screen Shot 2022-12-31 at 17 05 12" src="https://user-images.githubusercontent.com/7488394/210179097-002b793f-91b7-46b5-ad6c-3a7f8705e09b.png">
<img width="1440" alt="Screen Shot 2022-12-31 at 17 08 30" src="https://user-images.githubusercontent.com/7488394/210179099-01601056-b337-47f1-a16f-0a33d904d594.png">
<img width="1434" alt="Screen Shot 2022-12-31 at 17 06 16" src="https://user-images.githubusercontent.com/7488394/210179100-84f6f8b1-fc51-45b0-b170-62030b0d5adc.png">
<img width="1440" alt="Screen Shot 2022-12-31 at 17 05 48" src="https://user-images.githubusercontent.com/7488394/210179107-b5d1082c-7c59-4f06-b2a7-ac68ec725148.png">
<img width="1440" alt="Screen Shot 2022-12-31 at 17 08 22" src="https://user-images.githubusercontent.com/7488394/210179108-596b3598-ab26-47b9-a507-3c0291b86d0f.png">
<img width="1440" alt="Screen Shot 2022-12-31 at 17 08 09" src="https://user-images.githubusercontent.com/7488394/210179111-7119db65-e120-432d-825a-f27ad1e72285.png">
<img width="1440" alt="Screen Shot 2022-12-31 at 17 07 38" src="https://user-images.githubusercontent.com/7488394/210179112-3d8ac314-38c0-4b8a-ab69-9dadba33f5dc.png">
