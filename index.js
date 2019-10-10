const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.message('Hi', async ({ message, say }) => {
  say(`Hello there, <@${message.user}>`);
});

(async () => {
  await app.start(4390);

  console.log('Slack App is running');
})();
