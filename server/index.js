const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const axios = require("axios");
const port = process.env.PORT || 1337;
const cors = require("@koa/cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    allowMethods: "GET",
  })
);

let cachedLocations;

router.get("/location/search", async (ctx) => {
  // if (!cachedLocations) {
  console.log(`Made a api request`);
  const params = ctx.request.query;
  console.log(`Params`, params);
  const url = `https://www.metaweather.com/api/location/search`;
  const response = await axios.get(url, { params });
  ctx.body = response.data;
  // cachedLocations = response.data;
  // } else {
  //   console.log(`From the cache`);
  //   ctx.body = cachedLocations;
  // }
});

router.get("/location/:id", async (ctx) => {
  const url = `https://www.metaweather.com/api/location/${ctx.params.id}`;
  try {
    const response = await axios.get(url);
    ctx.body = response.data;
  } catch (e) {
    console.log(`Error`, e.message);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
