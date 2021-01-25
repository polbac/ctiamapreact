import express from 'express';
import multer from 'multer';
import axios from 'axios';
import querystring from 'querystring';

import config from '../../config';
import { resolveUrl, catchErrors, logError } from './utils';

const customEndpoint = config('wordpressCustomApiUrl');

function resolve(input, filter = {}, base = customEndpoint) {
  return resolveUrl(input, filter, base);
}

const app = express();

async function contactRoute(req, res) {
  const data = querystring.stringify(req.body);

  // try and make it work at least a little bit if user doesn't have javascript
  const isXhr = req.xhr;

  let response;

  const url = resolve('contact');

  try {
    response = await axios.post(url, data);
  } catch (e) {
    logError('Error posting to contact form', e, { url, data });
    return res.status(500).end();
  }

  const result = response.data;

  if (result.ok) {
    if (isXhr) {
      return res.status(200).end();
    }

    return res.redirect('/');
  }

  if (!isXhr) {
    const referrer = req.get('Referrer');

    if (referrer) {
      return res.redirect(referrer);
    }
  }

  return res.status(400).send(result);
}

async function joinRoute(req, res) {
  const data = querystring.stringify(req.body);

  // try and make it work at least a little bit if user doesn't have javascript
  const isXhr = req.xhr;

  let response;

  const url = resolve('join');

  try {
    response = await axios.post(url, data);
  } catch (e) {
    logError('Error posting to contact form', e, { url, data });
    return res.status(500).end();
  }

  const result = response.data;

  if (result.ok) {
    if (isXhr) {
      return res.status(200).end();
    }

    return res.redirect('/');
  }

  if (!isXhr) {
    const referrer = req.get('Referrer');

    if (referrer) {
      return res.redirect(referrer);
    }
  }

  return res.status(400).send(result);
}

async function membersOnlyRoute(req, res) {
  const data = querystring.stringify(req.body);

  // try and make it work at least a little bit if user doesn't have javascript
  const isXhr = req.xhr;

  let response;

  const url = resolve('members');

  try {
    response = await axios.post(url, data);
  } catch (e) {
    logError('Error posting to members form', e, { url, data });
    return res.status(500).end();
  }

  const result = response.data;

  if (result.ok) {
    if (isXhr) {
      return res.status(200).end();
    }

    return res.redirect('/');
  }

  if (!isXhr) {
    const referrer = req.get('Referrer');

    if (referrer) {
      return res.redirect(referrer);
    }
  }

  return res.status(400).send(result);
}

async function subscribeRoute(req, res) {
  const isXhr = req.xhr;

  const body = req.body;
  const data = querystring.stringify(body);
  const name = `${body['first_name']} ${body['last_name']}`;

  const postData = {
    EmailAddress: body.email,
    Name: name,
    CustomFields: [
      {
        Key: 'First Name',
        Value: body['first_name'],
      },
      {
        Key: 'Last Name',
        Value: body['last_name'],
      },
      {
        Key: 'Source',
        Value: 'CTIA.Org',
      },
    ],
    Resubscribe: true,
    RestartSubscriptionBasedAutoresponders: true,
    ConsentToTrack: 'Yes',
  };

  const baseUrl = config('createSendBaseUrl');
  const apiKey = config('crateSendApiKey');
  const listId = config('createSendListId');
  const auth = "Basic " + new Buffer(apiKey + ":magic").toString("base64");
  const createSendAxios = axios.create({
    headers: {
      Authorization: auth,
    },
  });
  const url = `${baseUrl}/subscribers/${listId}.json`;
  let response;

  try {
    response = await createSendAxios.post(url, postData);
  } catch (e) {
    logError('Error posting to CreateSend Form', e, { url, data });
    return res.status(500).end();
  }

  const result = response.data;

  if (result === body.email) {
    if (isXhr) {
      return res.status(200).send({ success: true }).end();
    }
    return res.redirect('/');
  }

  if (!isXhr) {
    const referrer = req.get('Referrer');

    if (referrer) {
      return res.redirect(referrer);
    }
  }

  return res.status(400).send(result);
}

async function covidRoute(req, res) {
  const data = querystring.stringify(req.body);

  // try and make it work at least a little bit if user doesn't have javascript
  const isXhr = req.xhr;

  let response;

  const url = resolve('covid');

  try {
    response = await axios.post(url, data);
  } catch (e) {
    logError('Error posting to COVID-19 Remote Learning Need Assessment form', e, { url, data });
    return res.status(500).end();
  }

  const result = response.data;

  if (result.ok) {
    if (isXhr) {
      return res.status(200).end();
    }

    return res.redirect('/');
  }

  if (!isXhr) {
    const referrer = req.get('Referrer');

    if (referrer) {
      return res.redirect(referrer);
    }
  }

  return res.status(400).send(result);
}

app.post('/contact', multer().array(), catchErrors(contactRoute));
app.post('/join', multer().array(), catchErrors(joinRoute));
app.post('/members', multer().array(), catchErrors(membersOnlyRoute));
app.post('/subscribe', multer().array(), catchErrors(subscribeRoute));
app.post('/covid', multer().array(), catchErrors(covidRoute));

export default app;
