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
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/utilities.sizes.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/blaze.colors.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/components.headings.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/components.inputs.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/components.input-groups.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/components.progress.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/objects.grid.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/objects.grid.responsive.min.css">
    <link rel="stylesheet" href="https://unpkg.com/blaze@3.2.2/dist/objects.containers.min.css">
    <script defer=true src=${bundlePath}></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
  </html>
`
}

export default renderApp