import scheduleQueries from "../db/queries";
import * as utils from "../utils/index";
import db from '../db/index';

export const  createUser = async (body) => {
  const encryptedPassword = await utils.hashPassword(body.password);
  const payload = [
    body.first_name, body.last_name, body.email, encryptedPassword
  ];
  return db.one(scheduleQueries.createUser, payload);
};

export const  createSchedule = async (body) => {
  const payload = [
    body.email, body.name_of_schedule, body.time_of_schedule, body.place_of_schedule, body.purpose_of_schedule
  ];
  return db.one(scheduleQueries.createSchedule, payload);
};

export const getAUserByEmail = (email) => db.oneOrNone(scheduleQueries.getUserByEmail, email);