import express, { Router } from "express";
import serverless from "serverless-http";
import cors from 'cors';
import { refreshToken } from '../../routes/refresh.ts';
import { verifyOTP } from '../../routes/verifyOTP.ts';
import { getFeed } from "../../routes/feed.ts";
import { getData } from "../../routes/fof.ts";
import { getSelf } from "../../routes/me.ts";

const api = express();
const router = Router();

api.use(cors({
 origin: 'https://bereal-fhdev.vercel.app',
 methods: ['GET'],
//  allowedHeaders: ['Content-Type', 'Authorization'],
}));

router.get("/refresh", refreshToken, (req, res) => {
 res.json({
      token: res.locals.token,
      refresh_token: res.locals.refresh_token,
      token_expiration: res.locals.token_expiration
 });
});

router.get("/verify-otp", verifyOTP, (req, res) => {
 res.json({
    refresh_data: {
      token: res.locals.access_token,
      refresh_token: res.locals.access_refresh_token,
      token_expiration: res.locals.access_expiration
    }
 });
});

router.get("/feed", getFeed, (req, res) => {
  res.json(res.locals.response);
});

router.get("/fof", getData, (req, res) => {
  res.json(res.locals.response);
});

router.get("/me", getSelf, (req, res) => {
  res.json(res.locals.response);
});

api.use("/api/", router);

export const handler = serverless(api);