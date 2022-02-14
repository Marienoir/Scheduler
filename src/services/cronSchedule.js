/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import cron from 'node-cron';
import dotenv from 'dotenv';
import { getAUserByEmail } from '.';
import nodemailer from 'nodemailer'

dotenv.config();
const dateToCron = (date) => {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours() - 1;
  const days = date.getDate();
  const months = date.getMonth() + 1;
  const dayOfWeek = date.getDay();

  return `${seconds} ${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};

const cronJobSchedule = async (req) => {
  const { time_of_schedule, name_of_schedule, place_of_schedule, purpose_of_schedule, email } = req.body;
  const user = await getAUserByEmail(email);
  const { first_name, last_name } = user;
  const date = new Date(time_of_schedule);
  const cronDate = dateToCron(date);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: 'SCHEDULER APP',
    to: `${email}`,
    subject: "Event Notification",
    html: `<p>Hello ${first_name} ${last_name},</p>
            <p> You have an event scheduled with details below: </p>
            <hr>
            <p><b>Name</b> : ${name_of_schedule}</p>
            <p><b>Venue</b> : ${place_of_schedule}</p>
            <p><b>Purpose</b> : ${purpose_of_schedule}</p>
            <hr>
            Kind regards, <br>
            <h4> Scheduler Support</h4>`
  };
  cron.schedule(cronDate, async () => {
    console.log(`${first_name} ${last_name} has been sent an email at ${time_of_schedule}`);
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("email error application", error.message);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

export default cronJobSchedule;
