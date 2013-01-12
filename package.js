Package.describe({
  summary: "Login service for VKontakte accounts."
});

Package.on_use(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.use('accounts-oauth2-helper', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('templating', 'client');

  api.add_files(['vk_configure.html', 'vk_configure.js', 'vk_logo.css'], 'client');

  api.add_files('vk_common.js', ['client', 'server']);
  api.add_files('vk_server.js', 'server');
  api.add_files('vk_client.js', 'client');
});

