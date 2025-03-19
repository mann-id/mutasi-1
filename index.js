import axios from 'axios';
import fs from 'fs';
import moment from 'moment-timezone';
import chalk from 'chalk';
import osu from 'node-os-utils';

async function fetch() {
  try {
    let anu = await axios.get('https://gateway.okeconnect.com/api/mutasi/qris/OK2307964/745596917413339762307964OKCT9434CA02A4A6BB20C21BF6E86FCEB569');
    let res = anu.data;
    fs.writeFileSync('mutasi.json', JSON.stringify(res, null, 2));
    let currentTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    console.log(chalk.green.bold('INFO ') + chalk.green.bold(`[`) + chalk.white.bold(`${currentTime}`) + chalk.green.bold(`]: `) + chalk.cyan('Data saved to mutasi.json'));
  } catch (error) {
    console.error(chalk.red('Error fetching or saving data:', error));
  }
}

async function fetch_cenny() {
  try {
    let anu = await axios.get('https://gateway.okeconnect.com/api/mutasi/qris/OK2302797/636099017404593512302797OKCT92E23EF79F155ACD5FCEF1F3407AE774');
    let res = anu.data;
    fs.writeFileSync('mutasi_cenny.json', JSON.stringify(res, null, 2));
    let currentTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    console.log(chalk.green.bold('INFO ') + chalk.green.bold(`[`) + chalk.white.bold(`${currentTime}`) + chalk.green.bold(`]: `) + chalk.cyan('Data saved to mutasi_cenny.json'));
  } catch (error) {
    console.error(chalk.red('Error fetching or saving data:', error));
  }
}

async function fetch_lau() {
  try {
    let anu = await axios.get('https://gateway.okeconnect.com/api/mutasi/qris/OK2320842/224598717422079872320842OKCT541A1B6BA772214292DAA7B103AC7AF6');
    let res = anu.data;
    fs.writeFileSync('mutasi_lau.json', JSON.stringify(res, null, 2));
    let currentTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
    console.log(chalk.green.bold('INFO ') + chalk.green.bold(`[`) + chalk.white.bold(`${currentTime}`) + chalk.green.bold(`]: `) + chalk.cyan('Data saved to mutasi_lau.json'));
  } catch (error) {
    console.error(chalk.red('Error fetching or saving data:', error));
  }
}

async function run() {
  await fetch();
  console.log(chalk.yellow('Waiting for 6 seconds before running fetch_cenny...'));

  setTimeout(async () => {
    await fetch_cenny();
    console.log(chalk.yellow('Waiting for 6 seconds before running fetch_lau...'));

    setTimeout(async () => {
      await fetch_lau();
      console.log(chalk.yellow('Waiting for 6 seconds before running fetch() again...'));

      setTimeout(run, 6000);
    }, 6000);
  }, 6000);
}

run();

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

app.get('/mutasi.json', (req, res) => {
  res.sendFile(process.cwd() + '/mutasi.json');
});

app.get('/mutasi_cenny.json', (req, res) => {
  res.sendFile(process.cwd() + '/mutasi_cenny.json');
});

app.get('/mutasi_lau.json', (req, res) => {
  res.sendFile(process.cwd() + '/mutasi_lau.json');
});

app.get('/info', async (req, res) => {
  const cpu = await osu.cpu.usage();
  const mem = await osu.mem.info();
  const uptime = osu.os.uptime();

  res.json({
    cpu_usage: `${cpu}%`,
    memory: `${mem.usedMemMb}MB / ${mem.totalMemMb}MB`,
    uptime: `${(uptime / 60).toFixed(2)} minutes`
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server berjalan di port ${port}`));
});
