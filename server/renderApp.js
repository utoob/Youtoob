import { isProd } from './config'

const renderApp = () => {
  const bundlePath = isProd ? `/js/bundle.js` : `http://localhost:7000/js/bundle.js`

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Youtoob</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/components.buttons.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/utilities.sizes.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/blaze.colors.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/components.headings.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/components.inputs.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/components.input-groups.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/components.progress.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/objects.grid.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/objects.grid.responsive.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze/dist/objects.containers.min.css">
    <script defer=true src=${bundlePath}></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
  </html>
`
}

export default renderApp